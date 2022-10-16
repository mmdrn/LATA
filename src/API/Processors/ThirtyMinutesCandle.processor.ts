import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('ThirtyMinutesCandle')
@Injectable()
export class ThirtyMinutesCandleProcessor {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
    ) {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);
    }

    private readonly logger = new Logger(ThirtyMinutesCandleProcessor.name);

    @Process({
        name: "default_queue",
        concurrency: 3
    })
    async OneMinute(job: Job) {
        this.logger.log(`processing a ThirtyMinutes job. jobId: ${job.id}`)
        const symbol = job.data.symbol;
        const _interval: Interval = Interval.ThirtyMinutes;
        return await this.candleService.fetchAndStore(symbol, _interval)
    }
}
