import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('TwelveHoursCandle_Fetches')
@Injectable()
export class TwelveHoursCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(TwelveHoursCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a TwelveHour job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.TwelveHour;
        return await this.candleService.fetchAndStore(symbol, _interval)
    }
}

@Processor('TwelveHoursCandle_Calculations')
@Injectable()
export class TwelveHoursCandle_CalculationsProcessor {
    private readonly logger = new Logger(TwelveHoursCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}
