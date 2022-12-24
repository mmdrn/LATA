import { Interval } from "../../BLL/Enums/Interval.enum";
import CandleMeta from "../../BLL/Models/CandleMeta.model";
import CreateCandleMeta from "../../BLL/Models/CreateCandleMeta.model";
import { ObjectID } from "typeorm";
import EightHoursCandleMeta from "../Entities/CandleMetas/EightHoursCandleMeta.entity";
import FifteenMinutesCandleMeta from "../Entities/CandleMetas/FifteenMinutesCandleMeta.entity";
import FiveMinutesCandleMeta from "../Entities/CandleMetas/FiveMinutesCandleMeta.entity";
import FourHoursCandleMeta from "../Entities/CandleMetas/FourHoursCandleMeta.entity";
import OneDayCandleMeta from "../Entities/CandleMetas/OneDayCandleMeta.entity";
import OneHourCandleMeta from "../Entities/CandleMetas/OneHourCandleMeta.entity";
import OneMinuteCandleMeta from "../Entities/CandleMetas/OneMinuteCandleMeta.entity";
import OneMonthCandleMeta from "../Entities/CandleMetas/OneMonthCandleMeta.entity";
import OneWeekCandleMeta from "../Entities/CandleMetas/OneWeekCandleMeta.entity";
import SixHoursCandleMeta from "../Entities/CandleMetas/SixHoursCandleMeta.entity";
import ThirtyMinutesCandleMeta from "../Entities/CandleMetas/ThirtyMinutesCandleMeta.entity";
import ThreeDaysCandleMeta from "../Entities/CandleMetas/ThreeDaysCandleMeta.entity";
import ThreeMinutesCandleMeta from "../Entities/CandleMetas/ThreeMinutesCandleMeta.entity";
import TwelveHoursCandleMeta from "../Entities/CandleMetas/TwelveHoursCandleMeta.entity";
import TwoHoursCandleMeta from "../Entities/CandleMetas/TwoHoursCandleMeta.entity";

export function MapCreateCandleMetasToCandleMetasEntities(candleMetas: CreateCandleMeta[], interval: Interval):
    OneMinuteCandleMeta[] |
    ThreeMinutesCandleMeta[] |
    FiveMinutesCandleMeta[] |
    FifteenMinutesCandleMeta[] |
    ThirtyMinutesCandleMeta[] |
    OneHourCandleMeta[] |
    TwoHoursCandleMeta[] |
    FourHoursCandleMeta[] |
    SixHoursCandleMeta[] |
    EightHoursCandleMeta[] |
    TwelveHoursCandleMeta[] |
    OneDayCandleMeta[] |
    ThreeDaysCandleMeta[] |
    OneWeekCandleMeta[] |
    OneMonthCandleMeta[] {
    let mappedCandles = [];

    switch (interval) {
        case Interval.OneMinute: {
            for (const candleMeta of candleMetas) {
                const _candle = new OneMinuteCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.ThreeMinutes: {
            for (const candleMeta of candleMetas) {
                const _candle = new ThreeMinutesCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.FiveMinutes: {
            for (const candleMeta of candleMetas) {
                const _candle = new FiveMinutesCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.FifteenMinutes: {
            for (const candleMeta of candleMetas) {
                const _candle = new FifteenMinutesCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.ThirtyMinutes: {
            for (const candleMeta of candleMetas) {
                const _candle = new ThirtyMinutesCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneHour: {
            for (const candleMeta of candleMetas) {
                const _candle = new OneHourCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.TwoHour: {
            for (const candleMeta of candleMetas) {
                const _candle = new TwoHoursCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.FourHour: {
            for (const candleMeta of candleMetas) {
                const _candle = new FourHoursCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.SixHour: {
            for (const candleMeta of candleMetas) {
                const _candle = new SixHoursCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.EightHour: {
            for (const candleMeta of candleMetas) {
                const _candle = new EightHoursCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.TwelveHour: {
            for (const candleMeta of candleMetas) {
                const _candle = new TwelveHoursCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneDay: {
            for (const candleMeta of candleMetas) {
                const _candle = new OneDayCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.ThreeDay: {
            for (const candleMeta of candleMetas) {
                const _candle = new ThreeDaysCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneWeek: {
            for (const candleMeta of candleMetas) {
                const _candle = new OneWeekCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
        case Interval.OneMonth: {
            for (const candleMeta of candleMetas) {
                const _candle = new OneMonthCandleMeta();
                _candle.candleId = candleMeta.candleId;
                _candle.difference = candleMeta.difference;
                _candle.rsi14 = candleMeta.rsi14;
                _candle.previous14Gains = candleMeta.previous14Gains;
                _candle.previous14Losses = candleMeta.previous14Losses;
                _candle.isImpulse = candleMeta.isImpulse;
                _candle.isCorrection = candleMeta.isCorrection;
                _candle.openPrice = candleMeta.openPrice;
                _candle.openTime = candleMeta.openTime;
                _candle.closePrice = candleMeta.closePrice;
                _candle.closeTime = candleMeta.closeTime;
                _candle.symbol = candleMeta.symbol;

                mappedCandles.push(_candle)
            }
            break;
        }
    }

    return mappedCandles;
}

export function MapCandleMetaEntityToCandleMeta(candleMeta:
    OneMinuteCandleMeta |
    ThreeMinutesCandleMeta |
    FiveMinutesCandleMeta |
    FifteenMinutesCandleMeta |
    ThirtyMinutesCandleMeta |
    OneHourCandleMeta |
    TwoHoursCandleMeta |
    FourHoursCandleMeta |
    SixHoursCandleMeta |
    EightHoursCandleMeta |
    TwelveHoursCandleMeta |
    OneDayCandleMeta |
    ThreeDaysCandleMeta |
    OneWeekCandleMeta |
    OneMonthCandleMeta): CandleMeta {

    return {
        id: candleMeta.id.toString(),
        candleId: candleMeta.candleId,
        difference: candleMeta.difference,
        rsi14: candleMeta.rsi14,
        previous14Gains: candleMeta.previous14Gains,
        previous14Losses: candleMeta.previous14Losses,
        isImpulse: candleMeta.isImpulse,
        isCorrection: candleMeta.isCorrection,
        openPrice: candleMeta.openPrice,
        openTime: candleMeta.openTime,
        closePrice: candleMeta.closePrice,
        closeTime: candleMeta.closeTime,
        symbol: candleMeta.symbol
    }
}

export function MapCandleMetaEntitiesToCandleMetas(candleMetas:
    OneMinuteCandleMeta[] |
    ThreeMinutesCandleMeta[] |
    FiveMinutesCandleMeta[] |
    FifteenMinutesCandleMeta[] |
    ThirtyMinutesCandleMeta[] |
    OneHourCandleMeta[] |
    TwoHoursCandleMeta[] |
    FourHoursCandleMeta[] |
    SixHoursCandleMeta[] |
    EightHoursCandleMeta[] |
    TwelveHoursCandleMeta[] |
    OneDayCandleMeta[] |
    ThreeDaysCandleMeta[] |
    OneWeekCandleMeta[] |
    OneMonthCandleMeta[]): CandleMeta[] {
    const mappedCandleMetas: CandleMeta[] = []

    for (const candleMeta of candleMetas) {
        mappedCandleMetas.push(MapCandleMetaEntityToCandleMeta(candleMeta));
    }

    return mappedCandleMetas;
}