import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SymbolsController } from './Controllers/Symbols.controller';
import CandleService from '../BLL/Services/Candle.service';
import SymbolService from '../BLL/Services/Symbol.service';
import Binance_SymbolService from '../BLL/Services/Binance/Symbol.binance.service';
import Binance_CandleService from '../BLL/Services/Binance/Candle.binance.service';
import Binance_CandleMetaService from '../BLL/Services/Binance/CandleMetas.binance.service';
import CandleMetaService from '../BLL/Services/CandleMeta.service';
import CandleDBRepository from '../DAL/Repositories/CandleDB.repository';
import CandleMetaDBRepository from '../DAL/Repositories/CandleMetaDB.repository';
import SymbolDBRepository from '../DAL/Repositories/SymbolDB.repository';
import Symbol from '../DAL/Entities/Symbol.entity';
import ExchangeAPIRepository from '../BLL/APIRepositories/ExchangeAPI.repository';
import Binance_ExchangeAPIRepository from '../BLL/APIRepositories/Binance/ExchangeAPI.binance.repository';
import OneHourCandle from './../DAL/Entities/OneHourCandle.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CandleTasksService } from './Tasks/Candle.task';
import { BullModule } from '@nestjs/bull';
import OneMinuteCandle from './../DAL/Entities/OneMinuteCandle.entity';
import ThreeMinutesCandle from './../DAL/Entities/ThreeMinutesCandle.entity';
import FiveMinutesCandle from './../DAL/Entities/FiveMinutesCandle.entity';
import FifteenMinutesCandle from './../DAL/Entities/FifteenMinutesCandle.entity';
import ThirtyMinutesCandle from './../DAL/Entities/ThirtyMinutesCandle.entity';
import TwoHoursCandle from './../DAL/Entities/TwoHoursCandle.entity';
import FourHoursCandle from './../DAL/Entities/FourHoursCandle.entity';
import SixHoursCandle from './../DAL/Entities/SixHoursCandle.entity';
import EightHoursCandle from './../DAL/Entities/EightHoursCandle.entity';
import TwelveHoursCandle from './../DAL/Entities/TwelveHoursCandle.entity';
import OneDayCandle from './../DAL/Entities/OneDayCandle.entity';
import ThreeDaysCandle from './../DAL/Entities/ThreeDaysCandle.entity';
import OneWeekCandle from './../DAL/Entities/OneWeekCandle.entity';
import OneMonthCandle from './../DAL/Entities/OneMonthCandle.entity';
import { LittleShitController } from './Controllers/LittleShit.controller';
import { BullMonitorService } from './Bull/bull-monitor.service';
import { OneMonthCandleProcessor } from './Processors/OneMonthCandle.processor';
import { EightHoursCandleProcessor } from './Processors/EightHoursCandle.processor';
import { FifteenMinutesCandleProcessor } from './Processors/FifteenMinutesCandle.processor';
import { FiveMinutesCandleProcessor } from './Processors/FiveMinutesCandle.processor';
import { FourHoursCandleProcessor } from './Processors/FourHoursCandle.processor';
import { OneDayCandleProcessor } from './Processors/OneDayCandle.processor';
import { OneHourCandleProcessor } from './Processors/OneHourCandle.processor';
import { OneMinuteCandleProcessor } from './Processors/OneMinuteCandle.processor';
import { OneWeekCandleProcessor } from './Processors/OneWeekCandle.processor';
import { SixHoursCandleProcessor } from './Processors/SixHoursCandle.processor';
import { ThirtyMinutesCandleProcessor } from './Processors/ThirtyMinutesCandle.processor';
import { ThreeDaysCandleProcessor } from './Processors/ThreeDayCandle.processor';
import { ThreeMinutesCandleProcessor } from './Processors/ThreeMinutesCandle.processor';
import { TwelveHoursCandleProcessor } from './Processors/TwelveHoursCandle.processor';
import { TwoHoursCandleProcessor } from './Processors/TwoHoursCandle.processor';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "lata",
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, "**/**.entity{.ts}")]
    }),
    TypeOrmModule.forFeature([
      Symbol,
      OneMinuteCandle,
      ThreeMinutesCandle,
      FiveMinutesCandle,
      FifteenMinutesCandle,
      ThirtyMinutesCandle,
      OneHourCandle,
      TwoHoursCandle,
      FourHoursCandle,
      SixHoursCandle,
      EightHoursCandle,
      TwelveHoursCandle,
      OneDayCandle,
      ThreeDaysCandle,
      OneWeekCandle,
      OneMonthCandle
    ]),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'OneMinuteCandle' }),
    BullModule.registerQueue({ name: 'ThreeMinutesCandle' }),
    BullModule.registerQueue({ name: 'FiveMinutesCandle' }),
    BullModule.registerQueue({ name: 'FifteenMinutesCandle' }),
    BullModule.registerQueue({ name: 'ThirtyMinutesCandle' }),
    BullModule.registerQueue({ name: 'OneHourCandle' }),
    BullModule.registerQueue({ name: 'TwoHoursCandle' }),
    BullModule.registerQueue({ name: 'FourHoursCandle' }),
    BullModule.registerQueue({ name: 'SixHoursCandle' }),
    BullModule.registerQueue({ name: 'EightHoursCandle' }),
    BullModule.registerQueue({ name: 'TwelveHoursCandle' }),
    BullModule.registerQueue({ name: 'OneDayCandle' }),
    BullModule.registerQueue({ name: 'ThreeDaysCandle' }),
    BullModule.registerQueue({ name: 'OneWeekCandle' }),
    BullModule.registerQueue({ name: 'OneMonthCandle' }),
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController,
    SymbolsController,
    LittleShitController
  ],
  providers: [
    // strategy services
    SymbolService,
    CandleService,
    CandleMetaService,

    // binance services
    Binance_SymbolService,
    Binance_CandleService,
    Binance_CandleMetaService,

    // db repositories
    SymbolDBRepository,
    CandleMetaDBRepository,
    CandleDBRepository,

    // strategy api repositories
    ExchangeAPIRepository,

    // binance api repositories
    Binance_ExchangeAPIRepository,

    // jobs, tasks and queues
    CandleTasksService,
    OneMinuteCandleProcessor,
    ThreeMinutesCandleProcessor,
    FiveMinutesCandleProcessor,
    FifteenMinutesCandleProcessor,
    ThirtyMinutesCandleProcessor,
    OneHourCandleProcessor,
    TwoHoursCandleProcessor,
    FourHoursCandleProcessor,
    SixHoursCandleProcessor,
    EightHoursCandleProcessor,
    TwelveHoursCandleProcessor,
    OneDayCandleProcessor,
    ThreeDaysCandleProcessor,
    OneWeekCandleProcessor,
    OneMonthCandleProcessor,

    // other
    BullMonitorService
  ]
})
export class AppModule implements NestModule {
  constructor(private monitor: BullMonitorService) { }
  async configure(consumer: MiddlewareConsumer) {
    await this.monitor.init();
    consumer.apply(this.monitor.router).forRoutes('/queue-monitoring');
  }
}
