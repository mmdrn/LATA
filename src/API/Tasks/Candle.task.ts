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
        @InjectQueue("OneMinuteCandle") private readonly oneMinuteCandleQueue: Queue,
        @InjectQueue("ThreeMinutesCandle") private readonly threeMinutesCandleQueue: Queue,
        @InjectQueue("FiveMinutesCandle") private readonly fiveMinutesCandleQueue: Queue,
        @InjectQueue("FifteenMinutesCandle") private readonly fifteenMinutesCandleQueue: Queue,
        @InjectQueue("ThirtyMinutesCandle") private readonly thirtyMinutesCandleQueue: Queue,
        @InjectQueue("OneHourCandle") private readonly oneHourCandleQueue: Queue,
        @InjectQueue("TwoHoursCandle") private readonly twoHoursCandleQueue: Queue,
        @InjectQueue("FourHoursCandle") private readonly fourHoursCandleQueue: Queue,
        @InjectQueue("SixHoursCandle") private readonly sixHoursCandleQueue: Queue,
        @InjectQueue("EightHoursCandle") private readonly eightHoursCandleQueue: Queue,
        @InjectQueue("TwelveHoursCandle") private readonly twelveHoursCandleQueue: Queue,
        @InjectQueue("OneDayCandle") private readonly oneDayCandleQueue: Queue,
        @InjectQueue("ThreeDaysCandle") private readonly threeDaysCandleQueue: Queue,
        @InjectQueue("OneWeekCandle") private readonly oneWeekCandleQueue: Queue,
        @InjectQueue("OneMonthCandle") private readonly oneMonthCandleQueue: Queue,
    ) { }

    private readonly logger = new Logger(CandleTasksService.name);

    // @Cron('10 */1 * * * *', {
    //     timeZone: "UTC"
    // })
    // async fetchOneMinuteCandles() {
    //     this.symbolService.setExchange(Exchanges.Binance);
    //     this.candleService.setExchange(Exchanges.Binance);

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.oneMinuteCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.threeMinutesCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.fiveMinutesCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.fifteenMinutesCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.thirtyMinutesCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.oneHourCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.twoHoursCandleQueue.add("default_queue", {
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

        const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

        for (const symbol of symbols) {
            this.fourHoursCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.sixHoursCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.eightHoursCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.twelveHoursCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.oneDayCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.threeDaysCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.oneWeekCandleQueue.add("default_queue", {
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

    //     const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");

    //     for (const symbol of symbols) {
    //         this.oneMonthCandleQueue.add("default_queue", {
    //             symbol: symbol,
    //         })
    //     }
    // }
}
