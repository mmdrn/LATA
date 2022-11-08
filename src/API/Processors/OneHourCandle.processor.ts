import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('OneHourCandle_Fetches')
@Injectable()
export class OneHourCandle_FetchesProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(OneHourCandle_FetchesProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`processing a OneHour job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.OneHour;
        const storedCandles = await this.candleService.fetchAndStore(symbol, _interval)

        return
    }
}

@Processor('OneHourCandle_Calculations')
@Injectable()
export class OneHourCandle_CalculationsProcessor {
    private readonly logger = new Logger(OneHourCandle_CalculationsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}

@Processor('OneHourCandle_Preprocessings')
@Injectable()
export class OneHourCandle_PreprocessingsProcessor {
    private readonly logger = new Logger(OneHourCandle_PreprocessingsProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async jobProcessor(job: Job) {
        this.logger.log(`${job.id}`)
    }
}