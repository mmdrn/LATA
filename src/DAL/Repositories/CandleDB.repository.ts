import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Interval } from "../../BLL/Enums/Interval.enum";
import { FindManyOptions, FindOneOptions, LessThan, Repository } from "typeorm";
import { MapCandleEntitiesToCandles, MapCandleEntityToCandle, MapCreateCandlesToCandleEntities } from "../Mappers/Candle.mapper";
import ICandleDBRepository from "../../BLL/Interfaces/DBRepositories/ICandleDBRepository.interface";
import CandleModel from "../../BLL/Models/Candle.model";
import OneHourCandle from "../Entities/OneHourCandle.entity";
import CreateCandle from "../../BLL/Models/CreateCandle.model";
import OneMinuteCandle from "../Entities/OneMinuteCandle.entity";
import ThreeMinutesCandle from "../Entities/ThreeMinutesCandle.entity";
import FiveMinutesCandle from "../Entities/FiveMinutesCandle.entity";
import FifteenMinutesCandle from "../Entities/FifteenMinutesCandle.entity";
import ThirtyMinutesCandle from "../Entities/ThirtyMinutesCandle.entity";
import TwoHoursCandle from "../Entities/TwoHoursCandle.entity";
import FourHoursCandle from "../Entities/FourHoursCandle.entity";
import SixHoursCandle from "../Entities/SixHoursCandle.entity";
import EightHoursCandle from "../Entities/EightHoursCandle.entity";
import OneDayCandle from "../Entities/OneDayCandle.entity";
import TwelveHoursCandle from "../Entities/TwelveHoursCandle.entity";
import ThreeDaysCandle from "../Entities/ThreeDaysCandle.entity";
import OneWeekCandle from "../Entities/OneWeekCandle.entity";
import OneMonthCandle from "../Entities/OneMonthCandle.entity";

@Injectable()
export default class CandleDBRepository implements ICandleDBRepository {
    constructor(
        @InjectRepository(OneMinuteCandle)
        private oneMinuteCandlesRepository: Repository<OneMinuteCandle>,

        @InjectRepository(ThreeMinutesCandle)
        private threeMinutesCandlesRepository: Repository<ThreeMinutesCandle>,

        @InjectRepository(FiveMinutesCandle)
        private fiveMinutesCandlesRepository: Repository<FiveMinutesCandle>,

        @InjectRepository(FifteenMinutesCandle)
        private fifteenMinutesCandlesRepository: Repository<FifteenMinutesCandle>,

        @InjectRepository(ThirtyMinutesCandle)
        private thirtyMinutesCandlesRepository: Repository<ThirtyMinutesCandle>,

        @InjectRepository(OneHourCandle)
        private oneHourCandlesRepository: Repository<OneHourCandle>,

        @InjectRepository(TwoHoursCandle)
        private twoHoursCandlesRepository: Repository<TwoHoursCandle>,

        @InjectRepository(FourHoursCandle)
        private fourHoursCandlesRepository: Repository<FourHoursCandle>,

        @InjectRepository(SixHoursCandle)
        private sixHoursCandlesRepository: Repository<SixHoursCandle>,

        @InjectRepository(EightHoursCandle)
        private eightHoursCandlesRepository: Repository<EightHoursCandle>,

        @InjectRepository(TwelveHoursCandle)
        private twelveHoursCandlesRepository: Repository<TwelveHoursCandle>,

        @InjectRepository(OneDayCandle)
        private oneDayCandlesRepository: Repository<OneDayCandle>,

        @InjectRepository(ThreeDaysCandle)
        private threeDaysCandlesRepository: Repository<ThreeDaysCandle>,

        @InjectRepository(OneWeekCandle)
        private oneWeekCandlesRepository: Repository<OneWeekCandle>,

        @InjectRepository(OneMonthCandle)
        private oneMonthCandlesRepository: Repository<OneMonthCandle>,
    ) { }

    async getCandles(symbol: string, interval: Interval, take: number, sortBy: keyof CandleModel, sortMethod: "ASC" | "DESC"): Promise<CandleModel[]> {
        const query: FindManyOptions = {
            where: {
                symbol: symbol
            },
            order: {},
        }
        query["order"][sortBy] = sortMethod;
        if (take) query["take"] = take;

        let candles;
        switch (interval) {
            case Interval.OneMinute: {
                candles = await this.oneMinuteCandlesRepository.find(query)
                break;
            }
            case Interval.ThreeMinutes: {
                candles = await this.threeMinutesCandlesRepository.find(query)
                break;
            }
            case Interval.FiveMinutes: {
                candles = await this.fiveMinutesCandlesRepository.find(query)
                break;
            }
            case Interval.FifteenMinutes: {
                candles = await this.fifteenMinutesCandlesRepository.find(query)
                break;
            }
            case Interval.ThirtyMinutes: {
                candles = await this.thirtyMinutesCandlesRepository.find(query)
                break;
            }
            case Interval.OneHour: {
                candles = await this.oneHourCandlesRepository.find(query)
                break;
            }
            case Interval.TwoHour: {
                candles = await this.twoHoursCandlesRepository.find(query)
                break;
            }
            case Interval.FourHour: {
                candles = await this.fourHoursCandlesRepository.find(query)
                break;
            }
            case Interval.SixHour: {
                candles = await this.sixHoursCandlesRepository.find(query)
                break;
            }
            case Interval.EightHour: {
                candles = await this.eightHoursCandlesRepository.find(query)
                break;
            }
            case Interval.TwelveHour: {
                candles = await this.twelveHoursCandlesRepository.find(query)
                break;
            }
            case Interval.OneDay: {
                candles = await this.oneDayCandlesRepository.find(query)
                break;
            }
            case Interval.ThreeDay: {
                candles = await this.threeDaysCandlesRepository.find(query)
                break;
            }
            case Interval.OneWeek: {
                candles = await this.oneWeekCandlesRepository.find(query)
                break;
            }
            case Interval.OneMonth: {
                candles = await this.oneMonthCandlesRepository.find(query)
                break;
            }
        }

        return MapCandleEntitiesToCandles(candles);
    }

    async getPreviousCandle(symbol: string, interval: Interval, closeTime: number): Promise<CandleModel> {
        let candle = null;
        const query: FindOneOptions = {
            where: {
                symbol: symbol,
                closeTime: LessThan(closeTime)
            },
            order: {
                closeTime: "DESC"
            },
        }

        switch (interval) {
            case Interval.OneMinute: {
                candle = await this.oneMinuteCandlesRepository.findOne(query)
                break;
            }
            case Interval.ThreeMinutes: {
                candle = await this.threeMinutesCandlesRepository.findOne(query)
                break;
            }
            case Interval.FiveMinutes: {
                candle = await this.fiveMinutesCandlesRepository.findOne(query)
                break;
            }
            case Interval.FifteenMinutes: {
                candle = await this.fifteenMinutesCandlesRepository.findOne(query)
                break;
            }
            case Interval.ThirtyMinutes: {
                candle = await this.thirtyMinutesCandlesRepository.findOne(query)
                break;
            }
            case Interval.OneHour: {
                candle = await this.oneHourCandlesRepository.findOne(query)
                break;
            }
            case Interval.TwoHour: {
                candle = await this.twoHoursCandlesRepository.findOne(query)
                break;
            }
            case Interval.FourHour: {
                candle = await this.fourHoursCandlesRepository.findOne(query)
                break;
            }
            case Interval.SixHour: {
                candle = await this.sixHoursCandlesRepository.findOne(query)
                break;
            }
            case Interval.EightHour: {
                candle = await this.eightHoursCandlesRepository.findOne(query)
                break;
            }
            case Interval.TwelveHour: {
                candle = await this.twelveHoursCandlesRepository.findOne(query)
                break;
            }
            case Interval.OneDay: {
                candle = await this.oneDayCandlesRepository.findOne(query)
                break;
            }
            case Interval.ThreeDay: {
                candle = await this.threeDaysCandlesRepository.findOne(query)
                break;
            }
            case Interval.OneWeek: {
                candle = await this.oneWeekCandlesRepository.findOne(query)
                break;
            }
            case Interval.OneMonth: {
                candle = await this.oneMonthCandlesRepository.findOne(query)
                break;
            }
        }

        return candle;
    }

    async storeCandle(candles: CreateCandle[], interval: Interval): Promise<CandleModel[]> {
        let storedCandles;
        const mappedCandles = MapCreateCandlesToCandleEntities(candles, interval);

        switch (interval) {
            case Interval.OneMinute: {
                storedCandles = await this.oneMinuteCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.ThreeMinutes: {
                storedCandles = await this.threeMinutesCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.FiveMinutes: {
                storedCandles = await this.fiveMinutesCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.FifteenMinutes: {
                storedCandles = await this.fifteenMinutesCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.ThirtyMinutes: {
                storedCandles = await this.thirtyMinutesCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.OneHour: {
                storedCandles = await this.oneHourCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.TwoHour: {
                storedCandles = await this.twoHoursCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.FourHour: {
                storedCandles = await this.fourHoursCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.SixHour: {
                storedCandles = await this.sixHoursCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.EightHour: {
                storedCandles = await this.eightHoursCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.TwelveHour: {
                storedCandles = await this.twelveHoursCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.OneDay: {
                storedCandles = await this.oneDayCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.ThreeDay: {
                storedCandles = await this.threeDaysCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.OneWeek: {
                storedCandles = await this.oneWeekCandlesRepository.save(mappedCandles);
                break;
            }
            case Interval.OneMonth: {
                storedCandles = await this.oneMonthCandlesRepository.save(mappedCandles);
                break;
            }
        }

        return storedCandles;
    }

    async getLatestCandleCloseTime(symbol: string, interval: Interval): Promise<number> {
        let candles;
        const query: FindManyOptions = {
            where: {
                symbol: symbol
            },
            order: {
                closeTime: "DESC"
            },
            select: {
                id: true,
                closeTime: true
            }
        }

        switch (interval) {
            case Interval.OneMinute: {
                candles = await this.oneMinuteCandlesRepository.find(query);
                break;
            }
            case Interval.ThreeMinutes: {
                candles = await this.threeMinutesCandlesRepository.find(query);
                break;
            }
            case Interval.FiveMinutes: {
                candles = await this.fiveMinutesCandlesRepository.find(query);
                break;
            }
            case Interval.FifteenMinutes: {
                candles = await this.fifteenMinutesCandlesRepository.find(query);
                break;
            }
            case Interval.ThirtyMinutes: {
                candles = await this.thirtyMinutesCandlesRepository.find(query);
                break;
            }
            case Interval.OneHour: {
                candles = await this.oneHourCandlesRepository.find(query);
                break;
            }
            case Interval.TwoHour: {
                candles = await this.twoHoursCandlesRepository.find(query);
                break;
            }
            case Interval.FourHour: {
                candles = await this.fourHoursCandlesRepository.find(query);
                break;
            }
            case Interval.SixHour: {
                candles = await this.sixHoursCandlesRepository.find(query);
                break;
            }
            case Interval.EightHour: {
                candles = await this.eightHoursCandlesRepository.find(query);
                break;
            }
            case Interval.TwelveHour: {
                candles = await this.twelveHoursCandlesRepository.find(query);
                break;
            }
            case Interval.OneDay: {
                candles = await this.oneDayCandlesRepository.find(query);
                break;
            }
            case Interval.ThreeDay: {
                candles = await this.threeDaysCandlesRepository.find(query);
                break;
            }
            case Interval.OneWeek: {
                candles = await this.oneWeekCandlesRepository.find(query);
                break;
            }
            case Interval.OneMonth: {
                candles = await this.oneMonthCandlesRepository.find(query);
                break;
            }
        }

        if (candles.length > 0) return candles[0].closeTime;

        return null;
    }
}