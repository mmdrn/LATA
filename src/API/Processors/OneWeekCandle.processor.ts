import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('OneWeekCandle_Fetches')
@Injectable()
export class OneWeekCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(OneWeekCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a OneWeek job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.OneWeek;
        return await this.candleService.fetchAndStore(symbol, _interval)
    }
}

@Processor('OneWeekCandle_Calculations')
@Injectable()
export class OneWeekCandle_CalculationsProcessor {
    private readonly logger = new Logger(OneWeekCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}

@Processor('OneWeekCandle_Preprocessings')
@Injectable()
export class OneWeekCandle_PreprocessingsProcessor {
    private readonly logger = new Logger(OneWeekCandle_PreprocessingsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}
