import Candle from "src/BLL/Models/Candle.model";
import { Interval } from "../../BLL/Enums/Interval.enum";
import CreateCandle from "../../BLL/Models/CreateCandle.model";
import EightHoursCandle from "../Entities/EightHoursCandle.entity";
import FifteenMinutesCandle from "../Entities/FifteenMinutesCandle.entity";
import FiveMinutesCandle from "../Entities/FiveMinutesCandle.entity";
import FourHoursCandle from "../Entities/FourHoursCandle.entity";
import OneDayCandle from "../Entities/OneDayCandle.entity";
import OneHourCandle from "../Entities/OneHourCandle.entity";
// import Candle from "../Entities/OneHourCandle.entity";
import OneMinuteCandle from "../Entities/OneMinuteCandle.entity";
import OneMonthCandle from "../Entities/OneMonthCandle.entity";
import OneWeekCandle from "../Entities/OneWeekCandle.entity";
import SixHoursCandle from "../Entities/SixHoursCandle.entity";
import ThirtyMinutesCandle from "../Entities/ThirtyMinutesCandle.entity";
import ThreeDaysCandle from "../Entities/ThreeDaysCandle.entity";
import ThreeMinutesCandle from "../Entities/ThreeMinutesCandle.entity";
import TwelveHoursCandle from "../Entities/TwelveHoursCandle.entity";
import TwoHoursCandle from "../Entities/TwoHoursCandle.entity";

export function MapCreateCandlesToCandleEntities(candles: CreateCandle[], interval: Interval):
    OneMinuteCandle[] |
    ThreeMinutesCandle[] |
    FiveMinutesCandle[] |
    FifteenMinutesCandle[] |
    ThirtyMinutesCandle[] |
    OneHourCandle[] |
    TwoHoursCandle[] |
    FourHoursCandle[] |
    SixHoursCandle[] |
    EightHoursCandle[] |
    TwelveHoursCandle[] |
    OneDayCandle[] |
    ThreeDaysCandle[] |
    OneWeekCandle[] |
    OneMonthCandle[] {
    let mappedCandles = [];

    switch (interval) {
        case Interval.OneMinute: {
            for (const candle of candles) {
                const _candle = new OneMinuteCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.ThreeMinutes: {

            for (const candle of candles) {
                const _candle = new ThreeMinutesCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.FiveMinutes: {
            for (const candle of candles) {
                const _candle = new FiveMinutesCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.FifteenMinutes: {
            for (const candle of candles) {
                const _candle = new FifteenMinutesCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.ThirtyMinutes: {
            for (const candle of candles) {
                const _candle = new ThirtyMinutesCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneHour: {
            for (const candle of candles) {
                const _candle = new OneHourCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.TwoHour: {
            for (const candle of candles) {
                const _candle = new TwoHoursCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.FourHour: {
            for (const candle of candles) {
                const _candle = new FourHoursCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.SixHour: {
            for (const candle of candles) {
                const _candle = new SixHoursCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.EightHour: {
            for (const candle of candles) {
                const _candle = new EightHoursCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.TwelveHour: {
            for (const candle of candles) {
                const _candle = new TwelveHoursCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneDay: {
            for (const candle of candles) {
                const _candle = new OneDayCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.ThreeDay: {
            for (const candle of candles) {
                const _candle = new ThreeDaysCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneWeek: {
            for (const candle of candles) {
                const _candle = new OneWeekCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneMonth: {
            for (const candle of candles) {
                const _candle = new OneMonthCandle();
                _candle.symbol = candle.symbol;
                _candle.openTime = candle.openTime;
                _candle.openPrice = candle.openPrice;
                _candle.highPrice = candle.highPrice;
                _candle.lowPrice = candle.lowPrice;
                _candle.closePrice = candle.closePrice;
                _candle.volume = candle.volume;
                _candle.closeTime = candle.closeTime;
                _candle.quoteAssetVolume = candle.quoteAssetVolume;
                _candle.numberOfTrades = candle.numberOfTrades;
                _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
                _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
                _candle.usedField = candle.usedField;

                mappedCandles.push(_candle)
            }
            break;
        }
    }

    return mappedCandles;
}

export function MapCandleEntityToCandle(candle:
    OneMinuteCandle |
    ThreeMinutesCandle |
    FiveMinutesCandle |
    FifteenMinutesCandle |
    ThirtyMinutesCandle |
    OneHourCandle |
    TwoHoursCandle |
    FourHoursCandle |
    SixHoursCandle |
    EightHoursCandle |
    TwelveHoursCandle |
    OneDayCandle |
    ThreeDaysCandle |
    OneWeekCandle |
    OneMonthCandle): Candle {

    return {
        id: candle.id.toString(),
        closePrice: candle.closePrice,
        closeTime: candle.closeTime,
        highPrice: candle.highPrice,
        lowPrice: candle.lowPrice,
        numberOfTrades: candle.numberOfTrades,
        openPrice: candle.openPrice,
        openTime: candle.openPrice,
        quoteAssetVolume: candle.quoteAssetVolume,
        symbol: candle.symbol,
        takerBuyBaseAssetVolume: candle.takerBuyBaseAssetVolume,
        takerBuyQuoteAssetVolume: candle.takerBuyQuoteAssetVolume,
        usedField: candle.usedField,
        volume: candle.volume
    }
}

export function MapCandleEntitiesToCandles(candles:
    OneMinuteCandle[] |
    ThreeMinutesCandle[] |
    FiveMinutesCandle[] |
    FifteenMinutesCandle[] |
    ThirtyMinutesCandle[] |
    OneHourCandle[] |
    TwoHoursCandle[] |
    FourHoursCandle[] |
    SixHoursCandle[] |
    EightHoursCandle[] |
    TwelveHoursCandle[] |
    OneDayCandle[] |
    ThreeDaysCandle[] |
    OneWeekCandle[] |
    OneMonthCandle[]): Candle[] {
    const mappedCandles: Candle[] = []

    for (const candle of candles) {
        mappedCandles.push(MapCandleEntityToCandle(candle));
    }

    return mappedCandles;
}