import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { Exchanges } from '../../BLL/Enums/Exchanges.enum';
import { Interval } from '../../BLL/Enums/Interval.enum';
import CandleService from '../../BLL/Services/Candle.service';
import SymbolService from '../../BLL/Services/Symbol.service';

@Injectable()
export class CandleTasksService {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
        @InjectQueue("fetch-candles-queue") private readonly fetchCandlesQueue: Queue
    ) { }

    private readonly logger = new Logger(CandleTasksService.name);

    // @Cron('10 */1 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchOneMinuteCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.OneMinute.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('10 */3 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchThreeMinutesCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.ThreeMinutes.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('10 */5 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchFiveMinutesCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.FiveMinutes.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('10 */15 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchFifteenMinutesCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.FifteenMinutes.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('10 */30 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchThirtyMinutesCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.ThirtyMinutes.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchOneHourCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.OneHour.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 */2 * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchTwoHourCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.TwoHour.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    @Cron('0 01 */4 * * *', {
        timeZone: "UTC"
    })
    async fetchFourHourCandles() {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);

        const symbols = await this.symbolService.findAllSymbols(undefined);

        for (const symbol of symbols) {
            this.fetchCandlesQueue.add(Interval.FourHour.toString(), {
                symbol: symbol,
            })
        }
    }

    // @Cron('0 01 */6 * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchSixHourCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.SixHour.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 */8 * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchEightHourCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.EightHour.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 */12 * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchTwelveHourCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.TwelveHour.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 0 * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchOneDayCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.OneDay.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 0 */3 * *', {
    //     timeZone: "UTC"
    // })
    // async fetchThreeDaysCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.ThreeDay.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 0 * * 0', {
    //     timeZone: "UTC"
    // })
    // async fetchOneWeekCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.OneWeek.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }

    // @Cron('0 01 1 * * 0', {
    //     timeZone: "UTC"
    // })
    // async fetchOneMonthCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined);

    //     for (const symbol of symbols) {
    //         this.fetchCandlesQueue.add(Interval.OneMonth.toString(), {
    //             symbol: symbol,
    //         })
    //     }
    // }
}
