import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MapCandlesToCreateCandles } from '../../BLL/Mappers/Candle.mapper';
import CreateCandle from '../../BLL/Models/CreateCandle.model';
import Symbol from '../../BLL/Models/Symbol.model';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import Candle from './../../BLL/Models/Candle.model';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('OneHourCandle')
@Injectable()
export class OneHourCandleProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(OneHourCandleProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a OneHour job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.OneHour;
        return await this.fetch(symbol, _interval);
    }

    private async fetch(symbol: Symbol, interval: Interval) {
        this.logger.log(`fetching candles. symbol: ${symbol.symbol}, interval: ${interval}`);
        let addedCandleCount: number = 0;
        let fetchedCandles: Candle[];
        let storedCandles: Candle[];
        let startTime: number;
        let mappedCandles: CreateCandle[];

        startTime = await this.candleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, interval);
        fetchedCandles = await this.candleService.fetchCandles(symbol.symbol, interval, startTime, 1000);
        this.logger.log(`fetched candles report. symbol: ${symbol.symbol}, interval: ${interval}, count: ${fetchedCandles.length}`);

        if (fetchedCandles.length < 1) {
            return false;
        }

        mappedCandles = MapCandlesToCreateCandles(fetchedCandles);
        storedCandles = await this.candleService.storeCandles(mappedCandles, interval);
        addedCandleCount += storedCandles.length;

        while (fetchedCandles.length === 1000) {
            startTime = await this.candleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, interval);
            fetchedCandles = await this.candleService.fetchCandles(symbol.symbol, interval, startTime, 1000);
            this.logger.log(`fetched candles report. symbol: ${symbol.symbol}, interval: ${interval}, count: ${fetchedCandles.length}`);
            mappedCandles = MapCandlesToCreateCandles(fetchedCandles);
            storedCandles = storedCandles.concat(await this.candleService.storeCandles(mappedCandles, interval));
            addedCandleCount += storedCandles.length;
        }

        this.logger.log(`finished storing candle. symbol: ${symbol.symbol}, interval: ${interval}, count: ${addedCandleCount}`);

        return true;
    }
}
