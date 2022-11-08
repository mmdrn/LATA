import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('TwoHoursCandle_Fetches')
@Injectable()
export class TwoHoursCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(TwoHoursCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a TwoHour job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.TwoHour;
        return await this.candleService.fetchAndStore(symbol, _interval)
    }
}

@Processor('TwoHoursCandle_Calculations')
@Injectable()
export class TwoHoursCandle_CalculationsProcessor {
    private readonly logger = new Logger(TwoHoursCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}

@Processor('TwoHoursCandle_Preprocessings')
@Injectable()
export class TwoHoursCandle_PreprocessingsProcessor {
    private readonly logger = new Logger(TwoHoursCandle_PreprocessingsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}