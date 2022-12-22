import { BullModule } from "@nestjs/bull";
import { BullMonitorService } from "./Bull/bull-monitor.service";
import { EightHoursCandle_FetchesProcessor, EightHoursCandle_CalculationsProcessor, EightHoursCandle_PreprocessingsProcessor } from "./Processors/EightHoursCandle.processor";
import { FifteenMinutesCandle_FetchesProcessor, FifteenMinutesCandle_CalculationsProcessor, FifteenMinutesCandle_PreprocessingsProcessor } from "./Processors/FifteenMinutesCandle.processor";
import { FiveMinutesCandle_FetchesProcessor, FiveMinutesCandle_CalculationsProcessor, FiveMinutesCandle_PreprocessingsProcessor } from "./Processors/FiveMinutesCandle.processor";
import { FourHoursCandle_FetchesProcessor, FourHoursCandle_CalculationsProcessor, FourHoursCandle_PreprocessingsProcessor } from "./Processors/FourHoursCandle.processor";
import { OneDayCandle_FetchesProcessor, OneDayCandle_CalculationsProcessor, OneDayCandle_PreprocessingsProcessor } from "./Processors/OneDayCandle.processor";
import { OneHourCandle_FetchesProcessor, OneHourCandle_CalculationsProcessor, OneHourCandle_PreprocessingsProcessor } from "./Processors/OneHourCandle.processor";
import { OneMinuteCandle_FetchesProcessor, OneMinuteCandle_CalculationsProcessor, OneMinuteCandle_PreprocessingsProcessor } from "./Processors/OneMinuteCandle.processor";
import { OneMonthCandle_FetchesProcessor, OneMonthCandle_CalculationsProcessor, OneMonthCandle_PreprocessingsProcessor } from "./Processors/OneMonthCandle.processor";
import { OneWeekCandle_FetchesProcessor, OneWeekCandle_CalculationsProcessor, OneWeekCandle_PreprocessingsProcessor } from "./Processors/OneWeekCandle.processor";
import { SixHoursCandle_FetchesProcessor, SixHoursCandle_CalculationsProcessor, SixHoursCandle_PreprocessingsProcessor } from "./Processors/SixHoursCandle.processor";
import { ThirtyMinutesCandle_FetchesProcessor, ThirtyMinutesCandle_CalculationsProcessor, ThirtyMinutesCandle_PreprocessingsProcessor } from "./Processors/ThirtyMinutesCandle.processor";
import { ThreeDaysCandle_FetchesProcessor, ThreeDaysCandle_CalculationsProcessor, ThreeDaysCandle_PreprocessingsProcessor } from "./Processors/ThreeDayCandle.processor";
import { ThreeMinutesCandle_FetchesProcessor, ThreeMinutesCandle_CalculationsProcessor, ThreeMinutesCandle_PreprocessingsProcessor } from "./Processors/ThreeMinutesCandle.processor";
import { TwelveHoursCandle_FetchesProcessor, TwelveHoursCandle_CalculationsProcessor, TwelveHoursCandle_PreprocessingsProcessor } from "./Processors/TwelveHoursCandle.processor";
import { TwoHoursCandle_FetchesProcessor, TwoHoursCandle_CalculationsProcessor, TwoHoursCandle_PreprocessingsProcessor } from "./Processors/TwoHoursCandle.processor";
import { CandleTasksService } from "./Tasks/Candle.task";


const bullRegisters = [
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
]

const bullProviders = [
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

    BullMonitorService
]

export { bullRegisters, bullProviders }