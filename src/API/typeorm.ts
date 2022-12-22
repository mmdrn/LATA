import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import Symbol from '../DAL/Entities/Symbol.entity';
import SymbolMeta from '../DAL/Entities/SymbolMeta.entity';

import OneHourCandle from '../DAL/Entities/Candles/OneHourCandle.entity';
import OneMinuteCandle from '../DAL/Entities/Candles/OneMinuteCandle.entity';
import ThreeMinutesCandle from '../DAL/Entities/Candles/ThreeMinutesCandle.entity';
import FiveMinutesCandle from '../DAL/Entities/Candles/FiveMinutesCandle.entity';
import FifteenMinutesCandle from '../DAL/Entities/Candles/FifteenMinutesCandle.entity';
import ThirtyMinutesCandle from '../DAL/Entities/Candles/ThirtyMinutesCandle.entity';
import TwoHoursCandle from '../DAL/Entities/Candles/TwoHoursCandle.entity';
import FourHoursCandle from '../DAL/Entities/Candles/FourHoursCandle.entity';
import SixHoursCandle from '../DAL/Entities/Candles/SixHoursCandle.entity';
import EightHoursCandle from '../DAL/Entities/Candles/EightHoursCandle.entity';
import TwelveHoursCandle from '../DAL/Entities/Candles/TwelveHoursCandle.entity';
import OneDayCandle from '../DAL/Entities/Candles/OneDayCandle.entity';
import ThreeDaysCandle from '../DAL/Entities/Candles/ThreeDaysCandle.entity';
import OneWeekCandle from '../DAL/Entities/Candles/OneWeekCandle.entity';
import OneMonthCandle from '../DAL/Entities/Candles/OneMonthCandle.entity';

import CandleMeta from '../DAL/Entities/CandleMeta.entity';
import OneMinuteCandleMeta from '../DAL/Entities/CandleMetas/OneMinuteCandleMeta.entity';
import ThreeMinutesCandleMeta from '../DAL/Entities/CandleMetas/ThreeMinutesCandleMeta.entity';
import FiveMinutesCandleMeta from '../DAL/Entities/CandleMetas/FiveMinutesCandleMeta.entity';
import FifteenMinutesCandleMeta from '../DAL/Entities/CandleMetas/FifteenMinutesCandleMeta.entity';
import ThirtyMinutesCandleMeta from '../DAL/Entities/CandleMetas/ThirtyMinutesCandleMeta.entity';
import OneHourCandleMeta from '../DAL/Entities/CandleMetas/OneHourCandleMeta.entity';
import TwoHoursCandleMeta from '../DAL/Entities/CandleMetas/TwoHoursCandleMeta.entity';
import FourHoursCandleMeta from '../DAL/Entities/CandleMetas/FourHoursCandleMeta.entity';
import SixHoursCandleMeta from '../DAL/Entities/CandleMetas/SixHoursCandleMeta.entity';
import EightHoursCandleMeta from '../DAL/Entities/CandleMetas/EightHoursCandleMeta.entity';
import TwelveHoursCandleMeta from '../DAL/Entities/CandleMetas/TwelveHoursCandleMeta.entity';
import OneDayCandleMeta from '../DAL/Entities/CandleMetas/OneDayCandleMeta.entity';
import ThreeDaysCandleMeta from '../DAL/Entities/CandleMetas/ThreeDaysCandleMeta.entity';
import OneWeekCandleMeta from '../DAL/Entities/CandleMetas/OneWeekCandleMeta.entity';
import OneMonthCandleMeta from '../DAL/Entities/CandleMetas/OneMonthCandleMeta.entity';

const TypeORMImports = [
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

    OneMinuteCandleMeta,
    ThreeMinutesCandleMeta,
    FiveMinutesCandleMeta,
    FifteenMinutesCandleMeta,
    ThirtyMinutesCandleMeta,
    OneHourCandleMeta,
    TwoHoursCandleMeta,
    FourHoursCandleMeta,
    SixHoursCandleMeta,
    EightHoursCandleMeta,
    TwelveHoursCandleMeta,
    OneDayCandleMeta,
    ThreeDaysCandleMeta,
    OneWeekCandleMeta,
    OneMonthCandleMeta,
]

export default [
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
    TypeOrmModule.forFeature(TypeORMImports),
]