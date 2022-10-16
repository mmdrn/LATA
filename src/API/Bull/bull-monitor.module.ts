// import { BullModule } from '@nestjs/bull';
// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import CandleService from 'src/BLL/Services/Candle.service';
// import SymbolService from 'src/BLL/Services/Symbol.service';
// import { FetchCandlesProcessor } from '../Processors/Candle.processor';
// import { BullMonitorService } from './bull-monitor.service';

// @Module({
//     imports: [
//         BullModule.registerQueue({
//             name: 'fetch-candles-queue',
//         }),
//     ],
//     providers: [
//         BullMonitorService,
//         FetchCandlesProcessor,
//         SymbolService,
//         CandleService,
//     ],
// })
// export class BullMonitorModule implements NestModule {
//     constructor(private monitor: BullMonitorService) { }
//     async configure(consumer: MiddlewareConsumer) {
//         await this.monitor.init();
//         consumer.apply(this.monitor.router).forRoutes('/queue-monitoring');
//     }
// }