import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('ThreeMinutesCandle_Fetches')
@Injectable()
export class ThreeMinutesCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(ThreeMinutesCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a ThreeMinutes job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.ThreeMinutes
        return await this.candleService.fetchAndStore(symbol, _interval)
    }
}

@Processor('ThreeMinutesCandle_Calculations')
@Injectable()
export class ThreeMinutesCandle_CalculationsProcessor {
    private readonly logger = new Logger(ThreeMinutesCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}

@Processor('ThreeMinutesCandle_Preprocessings')
@Injectable()
export class ThreeMinutesCandle_PreprocessingsProcessor {
    private readonly logger = new Logger(ThreeMinutesCandle_PreprocessingsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}