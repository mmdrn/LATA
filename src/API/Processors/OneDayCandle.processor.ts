import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import Candle from 'src/BLL/Models/Candle.model';
import CandleMeta from '../../BLL/Models/CandleMeta.model';
import Symbol from '../../BLL/Models/Symbol.model';
import SymbolMeta from '../../BLL/Models/SymbolMeta.model';
import CandleMetaService from '../../BLL/Services/CandleMeta.service';
import SymbolMetaService from '../../BLL/Services/SymbolMeta.service';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('OneDayCandle_Fetches')
@Injectable()
export class OneDayCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
        @InjectQueue("OneDayCandle_Calculations") private readonly calculcationsQueue: Queue,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(OneDayCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a OneDay job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const interval: Interval = Interval.OneDay;
        const storedCandles = await this.candleService.fetchAndStore(symbol, interval);

        if (storedCandles) {
            await job.log(`${storedCandles.length} new candles stored.`);

            for (const candle of storedCandles) {
                await this.calculcationsQueue.add("default_queue", { candle: candle })
            }
        }
        else {
            await job.log(`currently there are not any new candles to store.`);
        }
    }
}

@Processor('OneDayCandle_Calculations')
@Injectable()
export class OneDayCandle_CalculationsProcessor {
    constructor(
        private readonly candleMetaService: CandleMetaService,
        private readonly candleService: CandleService,
        private readonly symbolService: SymbolService,
        private readonly symbolMetaService: SymbolMetaService
    ) {
        this.candleMetaService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
        this.symbolService.setExchange(Exchanges.Binance);
        this.symbolMetaService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(OneDayCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 1
    })
    async jobProcessor(job: Job) {
        const interval = Interval.OneDay;
        const candle: Candle = job.data.candle;

        const symbol: Symbol = await this.symbolService.getSymbolBySymbol(candle.symbol);
        if (!symbol) {
            const message = `symbol not found. symbol: ${candle.symbol}`;
            this.logger.error(message);
            await job.log(message);
            return false;
        }

        let symbolMeta: SymbolMeta = await this.symbolMetaService.getSymbolMetaBySymbolId(symbol.id);
        if (!symbolMeta) {
            symbolMeta = new SymbolMeta();
            symbolMeta.symbolId = symbol.id;
        }

        let candleMeta: CandleMeta = await this.candleMetaService.getCandleMetaByCandleId(candle.id, interval);
        if (!candleMeta) {
            candleMeta = new CandleMeta();
            candleMeta.candleId = candle.id;
            candleMeta.symbol = candle.symbol;
            candleMeta.openTime = candle.openTime;
            candleMeta.openPrice = candle.openPrice;
            candleMeta.closeTime = candle.closeTime;
            candleMeta.closePrice = candle.closePrice;
        }

        // difference
        if (!candleMeta.difference) {
            const difference = await this.candleMetaService.calculateDifference(candle, interval);
            if (difference || difference === 0) {
                candleMeta.difference = difference;
            } else {
                const message = `can't calculate difference due to not have any previous candle. candleId: ${candle.id}, interval: ${interval}, symbol: ${candle.symbol}`;
                this.logger.error(message);
                await job.log(message);
            }
        }

        if (Number.isFinite(candleMeta.difference)) {
            // rsi14 prerequisites
            if (!symbolMeta.rsi14PrerequisitesCalculated) {
                const result = await this.calculateRSI14Prerequisites(symbol, candle, interval, symbolMeta);
                if (!result) {
                    const message = `can't calculate RSI14 prerequisites. candleId: ${candle.id}, interval: ${interval}, symbol: ${candle.symbol}`;
                    this.logger.error(message);
                    await job.log(message);
                    return false
                } else {
                    candleMeta = await this.candleMetaService.getCandleMetaByCandleId(candle.id, interval);
                }
            }

            // rsi14
            if (symbolMeta.rsi14PrerequisitesCalculated) {
                if (!(candleMeta.rsi14 || candleMeta.rsi14 === 0)) {
                    const previousCandle = await this.candleService.getPreviousCandle(candle.symbol, interval, candle.closeTime);
                    if (previousCandle) {
                        const previousCandleMeta = await this.candleMetaService.getCandleMetaByCandleId(previousCandle.id.toString(), interval);
                        if (previousCandleMeta) {
                            let gains = 0;
                            let losses = 0;
                            let dividedGainsAndLosses = 0;
                            let rsi14 = 0;

                            // is gain
                            if (candleMeta.difference > 0) {
                                gains = (previousCandleMeta.previous14Gains * 13 + candleMeta.difference) / 14;
                                losses = (previousCandleMeta.previous14Losses * 13 + 0) / 14;
                            }
                            // is loss
                            else if (candleMeta.difference < 0) {
                                gains = (previousCandleMeta.previous14Gains * 13 + 0) / 14;
                                losses = (previousCandleMeta.previous14Losses * 13 + candleMeta.difference * -1) / 14;
                            }

                            dividedGainsAndLosses = gains === 0 || losses === 0 ? 0 : gains / losses;
                            rsi14 = 100 - 100 / (1 + dividedGainsAndLosses)

                            candleMeta.previous14Gains = gains;
                            candleMeta.previous14Losses = losses;
                            candleMeta.rsi14 = rsi14;
                        } else {
                            const message = `no previews candle meta found. candleId: ${candle.id}, interval: ${interval}, symbol: ${candle.symbol}`;
                            this.logger.error(message);
                            await job.log(message);
                        }
                    }
                }
            }

            // impulse/correction
            const previousCandle = await this.candleService.getPreviousCandle(candle.symbol, interval, candle.closeTime);
            if (previousCandle && candle.direction !== previousCandle.direction) {
                // calculating prev candle percentage
                let prevCandlePercentage: number = 0;
                if (previousCandle.direction === "asc") {
                    prevCandlePercentage = parseFloat(((previousCandle.closePrice - previousCandle.openPrice) / previousCandle.openPrice * 100).toFixed(2));
                }
                else {
                    prevCandlePercentage = parseFloat(((previousCandle.openPrice - previousCandle.closePrice) / previousCandle.openPrice * 100).toFixed(2));
                }

                // minimum and maximum percentage to remove noises
                if (prevCandlePercentage > 2.50 && prevCandlePercentage < 10) {
                    // calculating candle percentage
                    let candlePercentage: number = 0;
                    if (candle.direction === "asc") {
                        candlePercentage = parseFloat(((candle.closePrice - candle.openPrice) / candle.openPrice * 100).toFixed(2));
                    }
                    else {
                        candlePercentage = parseFloat(((candle.openPrice - candle.closePrice) / candle.openPrice * 100).toFixed(2));
                    }

                    const previousCandleMeta = await this.candleMetaService.getCandleMetaByCandleId(previousCandle.id.toString(), interval);
                    if (previousCandleMeta) {
                        // candle percentage according to the prev candle.
                        const _percentage = candlePercentage / prevCandlePercentage * 100;
                        // according to the Fibonacci golden ratios and 2 percent tolerance
                        // 0.38 >>> 0.36
                        // 0.78 >>> 0.80
                        if (_percentage > 36 && _percentage < 80) {
                            previousCandleMeta.isImpulse = true;
                            candleMeta.isCorrection = true;
                        } else {
                            previousCandleMeta.isImpulse = false;
                            candleMeta.isCorrection = false;
                        }
                        await this.candleMetaService.storeOrUpdate([previousCandleMeta], interval);
                    }
                    else {
                        const message = `no previews candle meta found. candleId: ${candle.id}, interval: ${interval}, symbol: ${candle.symbol}`;
                        this.logger.error(message);
                        await job.log(message);
                    }
                }
            }
        }

        await this.candleMetaService.storeOrUpdate([candleMeta], interval);
    }

    private async calculateRSI14Prerequisites(symbol: Symbol, candle: Candle, interval: Interval, symbolMeta: SymbolMeta) {
        try {
            let candles = await this.candleService.getCandles(symbol.symbol, interval, 14, "closeTime", "ASC");
            if (!candles) return null;

            if (!candles || candles.length < 14) {
                this.logger.error(`symbol haven't enough stored candles to calculate RSI14 prerequisites and must fetch new candles. interval: ${interval}, symbol: ${candle.symbol}`);
                return false;
            }

            let gains: number = 0;
            let losses: number = 0;
            const candleMetas: CandleMeta[] = [];
            for await (const candle of candles) {
                let candleMeta: CandleMeta = await this.candleMetaService.getCandleMetaByCandleId(candle.id, interval);
                if (!candleMeta) {
                    candleMeta = new CandleMeta()
                    candleMeta.candleId = candle.id;
                    candleMeta.symbol = candle.symbol;
                    candleMeta.openTime = candle.openTime;
                    candleMeta.openPrice = candle.openPrice;
                    candleMeta.closeTime = candle.closeTime;
                    candleMeta.closePrice = candle.closePrice;
                }

                if (!candleMeta.difference) {
                    const difference = await this.candleMetaService.calculateDifference(candle, interval);
                    if (difference === 0 || difference) candleMeta.difference = difference;
                }

                // is gain
                if (candleMeta.difference > 0) {
                    gains += candleMeta.difference
                }
                // is loss
                else if (candleMeta.difference < 0) {
                    losses += candleMeta.difference * -1
                }

                candleMetas.push(candleMeta);
            }

            await this.candleMetaService.storeOrUpdate(candleMetas, interval);

            gains = gains != 0 ? gains / 14 : gains;
            losses = losses != 0 ? losses / 14 : losses;
            const dividedGainsAndLosses: number = gains == 0 || losses == 0 ? 0 : gains / losses;
            const rsi14 = 100 - 100 / (1 + dividedGainsAndLosses);

            const the14thCandleMeta: CandleMeta = await this.candleMetaService.getCandleMetaByCandleId(candles[13].id, interval);
            if (!the14thCandleMeta) return null;

            the14thCandleMeta.previous14Gains = gains;
            the14thCandleMeta.previous14Losses = losses;
            the14thCandleMeta.rsi14 = rsi14;
            await this.candleMetaService.storeOrUpdate([the14thCandleMeta], interval);

            symbolMeta.rsi14PrerequisitesCalculated = true;
            await this.symbolMetaService.storeOrUpdate([symbolMeta]);

            return true;

        } catch (error) {
            console.log(error);
        }
    }
}

@Processor('OneDayCandle_Preprocessings')
@Injectable()
export class OneDayCandle_PreprocessingsProcessor {
    private readonly logger = new Logger(OneDayCandle_PreprocessingsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}
