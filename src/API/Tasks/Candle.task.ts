import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import Candle from 'src/BLL/Models/Candle.model';
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

    @Cron('00 01 * * * *', {
        timeZone: "UTC"
    })
    async fetchCandles() {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);

        const symbols = await this.symbolService.findAllSymbols(undefined);

        for (const symbol of symbols) {
            this.fetchCandlesQueue.add(Interval.OneMinute.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.ThreeMinutes.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.FiveMinutes.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.FifteenMinutes.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.ThirtyMinutes.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.OneHour.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.TwoHour.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.FourHour.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.SixHour.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.EightHour.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.TwelveHour.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.OneDay.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.ThreeDay.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.OneWeek.toString(), {
                symbol: symbol,
            })
            this.fetchCandlesQueue.add(Interval.OneMonth.toString(), {
                symbol: symbol,
            })
        }
    }
}
