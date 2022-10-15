import { Module } from '@nestjs/common';
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
import { FetchCandlesProcessor } from './Processors/Candle.processor';
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
import { OnTheFlyController } from './Controllers/Candles.controller';
import { BullMonitorModule } from './BullMonitor/bull-monitor-module';


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
    BullModule.forRoot({
      // limiter: {
      //   max: 3,
      //   duration: 60000,
      //   bounceBack: false,
      // },
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'fetch-candles-queue',
    }),
    BullMonitorModule,
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
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController,
    SymbolsController,
    OnTheFlyController
  ],
  providers: [
    Binance_SymbolService,
    Binance_CandleService,
    Binance_CandleMetaService,
    SymbolService,
    CandleService,
    CandleMetaService,
    SymbolDBRepository,
    CandleMetaDBRepository,
    CandleDBRepository,
    ExchangeAPIRepository,
    Binance_ExchangeAPIRepository,
    CandleTasksService,
    FetchCandlesProcessor
  ]
})
export class AppModule { }
