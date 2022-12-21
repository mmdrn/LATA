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
import { OneMinuteCandle_CalculationsProcessor, OneMinuteCandle_FetchesProcessor, OneMinuteCandle_PreprocessingsProcessor } from './Processors/OneMinuteCandle.processor';
import { ThreeMinutesCandle_CalculationsProcessor, ThreeMinutesCandle_FetchesProcessor, ThreeMinutesCandle_PreprocessingsProcessor } from './Processors/ThreeMinutesCandle.processor';
import { FiveMinutesCandle_CalculationsProcessor, FiveMinutesCandle_FetchesProcessor, FiveMinutesCandle_PreprocessingsProcessor } from './Processors/FiveMinutesCandle.processor';
import { FifteenMinutesCandle_CalculationsProcessor, FifteenMinutesCandle_FetchesProcessor, FifteenMinutesCandle_PreprocessingsProcessor } from './Processors/FifteenMinutesCandle.processor';
import { ThirtyMinutesCandle_CalculationsProcessor, ThirtyMinutesCandle_FetchesProcessor, ThirtyMinutesCandle_PreprocessingsProcessor } from './Processors/ThirtyMinutesCandle.processor';
import { OneHourCandle_CalculationsProcessor, OneHourCandle_FetchesProcessor, OneHourCandle_PreprocessingsProcessor } from './Processors/OneHourCandle.processor';
import { TwoHoursCandle_CalculationsProcessor, TwoHoursCandle_FetchesProcessor, TwoHoursCandle_PreprocessingsProcessor } from './Processors/TwoHoursCandle.processor';
import { FourHoursCandle_CalculationsProcessor, FourHoursCandle_FetchesProcessor, FourHoursCandle_PreprocessingsProcessor } from './Processors/FourHoursCandle.processor';
import { SixHoursCandle_CalculationsProcessor, SixHoursCandle_FetchesProcessor, SixHoursCandle_PreprocessingsProcessor } from './Processors/SixHoursCandle.processor';
import { EightHoursCandle_CalculationsProcessor, EightHoursCandle_FetchesProcessor, EightHoursCandle_PreprocessingsProcessor } from './Processors/EightHoursCandle.processor';
import { TwelveHoursCandle_CalculationsProcessor, TwelveHoursCandle_FetchesProcessor, TwelveHoursCandle_PreprocessingsProcessor } from './Processors/TwelveHoursCandle.processor';
import { OneDayCandle_CalculationsProcessor, OneDayCandle_FetchesProcessor, OneDayCandle_PreprocessingsProcessor } from './Processors/OneDayCandle.processor';
import { ThreeDaysCandle_CalculationsProcessor, ThreeDaysCandle_FetchesProcessor, ThreeDaysCandle_PreprocessingsProcessor } from './Processors/ThreeDayCandle.processor';
import { OneWeekCandle_CalculationsProcessor, OneWeekCandle_FetchesProcessor, OneWeekCandle_PreprocessingsProcessor } from './Processors/OneWeekCandle.processor';
import { OneMonthCandle_CalculationsProcessor, OneMonthCandle_FetchesProcessor, OneMonthCandle_PreprocessingsProcessor } from './Processors/OneMonthCandle.processor';
import SymbolMetaService from '../BLL/Services/SymbolMeta.service';
import Binance_SymbolMetaService from '../BLL/Services/Binance/SymbolMeta.binance.service';
import SymbolMetaDBRepository from '../DAL/Repositories/SymbolMetaDB.repository';
import SymbolMeta from '../DAL/Entities/SymbolMeta.entity';
import CandleMeta from '../DAL/Entities/CandleMeta.entity';
import { StrategiesController } from './Controllers/Strategies.controller';


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
      SymbolMeta,
      CandleMeta,
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
      OneMonthCandle,
    ]),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'OneMinuteCandle_Fetches' }),
    BullModule.registerQueue({ name: 'ThreeMinutesCandle_Fetches' }),
    BullModule.registerQueue({ name: 'FiveMinutesCandle_Fetches' }),
    BullModule.registerQueue({ name: 'FifteenMinutesCandle_Fetches' }),
    BullModule.registerQueue({ name: 'ThirtyMinutesCandle_Fetches' }),
    BullModule.registerQueue({ name: 'OneHourCandle_Fetches' }),
    BullModule.registerQueue({ name: 'TwoHoursCandle_Fetches' }),
    BullModule.registerQueue({ name: 'FourHoursCandle_Fetches' }),
    BullModule.registerQueue({ name: 'SixHoursCandle_Fetches' }),
    BullModule.registerQueue({ name: 'EightHoursCandle_Fetches' }),
    BullModule.registerQueue({ name: 'TwelveHoursCandle_Fetches' }),
    BullModule.registerQueue({ name: 'OneDayCandle_Fetches' }),
    BullModule.registerQueue({ name: 'ThreeDaysCandle_Fetches' }),
    BullModule.registerQueue({ name: 'OneWeekCandle_Fetches' }),
    BullModule.registerQueue({ name: 'OneMonthCandle_Fetches' }),

    BullModule.registerQueue({ name: 'OneMinuteCandle_Calculations' }),
    BullModule.registerQueue({ name: 'ThreeMinutesCandle_Calculations' }),
    BullModule.registerQueue({ name: 'FiveMinutesCandle_Calculations' }),
    BullModule.registerQueue({ name: 'FifteenMinutesCandle_Calculations' }),
    BullModule.registerQueue({ name: 'ThirtyMinutesCandle_Calculations' }),
    BullModule.registerQueue({ name: 'OneHourCandle_Calculations' }),
    BullModule.registerQueue({ name: 'TwoHoursCandle_Calculations' }),
    BullModule.registerQueue({ name: 'FourHoursCandle_Calculations' }),
    BullModule.registerQueue({ name: 'SixHoursCandle_Calculations' }),
    BullModule.registerQueue({ name: 'EightHoursCandle_Calculations' }),
    BullModule.registerQueue({ name: 'TwelveHoursCandle_Calculations' }),
    BullModule.registerQueue({ name: 'OneDayCandle_Calculations' }),
    BullModule.registerQueue({ name: 'ThreeDaysCandle_Calculations' }),
    BullModule.registerQueue({ name: 'OneWeekCandle_Calculations' }),
    BullModule.registerQueue({ name: 'OneMonthCandle_Calculations' }),

    BullModule.registerQueue({ name: 'OneMinuteCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'ThreeMinutesCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'FiveMinutesCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'FifteenMinutesCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'ThirtyMinutesCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'OneHourCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'TwoHoursCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'FourHoursCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'SixHoursCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'EightHoursCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'TwelveHoursCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'OneDayCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'ThreeDaysCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'OneWeekCandle_Preprocessings' }),
    BullModule.registerQueue({ name: 'OneMonthCandle_Preprocessings' }),

    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController,
    SymbolsController,
    StrategiesController,
    LittleShitController
  ],
  providers: [
    // strategy services
    SymbolService,
    SymbolMetaService,
    CandleService,
    CandleMetaService,

    // binance services
    Binance_SymbolService,
    Binance_SymbolMetaService,
    Binance_CandleService,
    Binance_CandleMetaService,

    // db repositories
    SymbolDBRepository,
    SymbolMetaDBRepository,
    CandleDBRepository,
    CandleMetaDBRepository,

    // strategy api repositories
    ExchangeAPIRepository,

    // binance api repositories
    Binance_ExchangeAPIRepository,

    // jobs, tasks and queues
    CandleTasksService,
    OneMinuteCandle_FetchesProcessor,
    ThreeMinutesCandle_FetchesProcessor,
    FiveMinutesCandle_FetchesProcessor,
    FifteenMinutesCandle_FetchesProcessor,
    ThirtyMinutesCandle_FetchesProcessor,
    OneHourCandle_FetchesProcessor,
    TwoHoursCandle_FetchesProcessor,
    FourHoursCandle_FetchesProcessor,
    SixHoursCandle_FetchesProcessor,
    EightHoursCandle_FetchesProcessor,
    TwelveHoursCandle_FetchesProcessor,
    OneDayCandle_FetchesProcessor,
    ThreeDaysCandle_FetchesProcessor,
    OneWeekCandle_FetchesProcessor,
    OneMonthCandle_FetchesProcessor,

    OneMinuteCandle_CalculationsProcessor,
    ThreeMinutesCandle_CalculationsProcessor,
    FiveMinutesCandle_CalculationsProcessor,
    FifteenMinutesCandle_CalculationsProcessor,
    ThirtyMinutesCandle_CalculationsProcessor,
    OneHourCandle_CalculationsProcessor,
    TwoHoursCandle_CalculationsProcessor,
    FourHoursCandle_CalculationsProcessor,
    SixHoursCandle_CalculationsProcessor,
    EightHoursCandle_CalculationsProcessor,
    TwelveHoursCandle_CalculationsProcessor,
    OneDayCandle_CalculationsProcessor,
    ThreeDaysCandle_CalculationsProcessor,
    OneWeekCandle_CalculationsProcessor,
    OneMonthCandle_CalculationsProcessor,

    OneMinuteCandle_PreprocessingsProcessor,
    ThreeMinutesCandle_PreprocessingsProcessor,
    FiveMinutesCandle_PreprocessingsProcessor,
    FifteenMinutesCandle_PreprocessingsProcessor,
    ThirtyMinutesCandle_PreprocessingsProcessor,
    OneHourCandle_PreprocessingsProcessor,
    TwoHoursCandle_PreprocessingsProcessor,
    FourHoursCandle_PreprocessingsProcessor,
    SixHoursCandle_PreprocessingsProcessor,
    EightHoursCandle_PreprocessingsProcessor,
    TwelveHoursCandle_PreprocessingsProcessor,
    OneDayCandle_PreprocessingsProcessor,
    ThreeDaysCandle_PreprocessingsProcessor,
    OneWeekCandle_PreprocessingsProcessor,
    OneMonthCandle_PreprocessingsProcessor,

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
