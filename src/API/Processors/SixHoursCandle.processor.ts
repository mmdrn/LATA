import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import Candle from 'src/BLL/Models/Candle.model';
import CreateCandleMeta from 'src/BLL/Models/CreateCandleMeta.model';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('SixHoursCandle_Fetches')
@Injectable()
export class SixHoursCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
        @InjectQueue("SixHoursCandle_Calculations") private readonly sixHoursCandle_CalculationsQueue: Queue
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(SixHoursCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a SixHour job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.SixHour;

        const storedCandles = await this.candleService.fetchAndStore(symbol, _interval)
        job.log(`${storedCandles.length} new candles stored.`)
        const jobs = [];
        for (const candle of storedCandles) {
            jobs.push({
                name: "default_queue",
                candle: candle
            })
        }
        await this.sixHoursCandle_CalculationsQueue.addBulk(jobs);
        return true;
    }
}

@Processor('SixHoursCandle_Calculations')
@Injectable()
export class SixHoursCandle_CalculationsProcessor {
    private readonly logger = new Logger(SixHoursCandle_CalculationsProcessor.name);
    constructor(
        private readonly candleService: CandleService,
    ) {
        this.candleService.setExchange(Exchanges.Binance);
    }

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        const candle: Candle = job.data.candle;
        const candleMeta: CreateCandleMeta = null;
        const previousCandle: Candle = await this.candleService.getPreviousCandle(candle.symbol, Interval.SixHour, candle.closeTime);
        
        if (previousCandle) candleMeta.difference = candle.closePrice - previousCandle.closePrice;

        this.logger.log(`${job.id}`)
    }
}
