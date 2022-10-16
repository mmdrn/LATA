import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('FourHoursCandle_Fetches')
@Injectable()
export class FourHoursCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(FourHoursCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 5
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a FourHour job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.FourHour;
        return await this.candleService.fetchAndStore(symbol, _interval)
    }
}

@Processor('FourHoursCandle_Calculations')
@Injectable()
export class FourHoursCandle_CalculationsProcessor {
    private readonly logger = new Logger(FourHoursCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}
