import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Interval } from "../../BLL/Enums/Interval.enum";
import { FindManyOptions, Repository } from "typeorm";
import { MapCreateCandlesToCandleEntities } from "../Mappers/Candle.mapper";
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

    async storeCandle(candles: CreateCandle[], interval: Interval): Promise<CandleModel[]> {
        let storedCandles;
        const mappedCandles = MapCreateCandlesToCandleEntities(candles);

        switch (interval) {
            case Interval.OneMinute: {
                storedCandles = await this.oneMinuteCandlesRepository.save(mappedCandles);
            }
            case Interval.ThreeMinutes: {
                storedCandles = await this.threeMinutesCandlesRepository.save(mappedCandles);
            }
            case Interval.FiveMinutes: {
                storedCandles = await this.fiveMinutesCandlesRepository.save(mappedCandles);
            }
            case Interval.FifteenMinutes: {
                storedCandles = await this.fifteenMinutesCandlesRepository.save(mappedCandles);
            }
            case Interval.ThirtyMinutes: {
                storedCandles = await this.thirtyMinutesCandlesRepository.save(mappedCandles);
            }
            case Interval.OneHour: {
                storedCandles = await this.oneHourCandlesRepository.save(mappedCandles);
            }
            case Interval.TwoHour: {
                storedCandles = await this.twoHoursCandlesRepository.save(mappedCandles);
            }
            case Interval.FourHour: {
                storedCandles = await this.fourHoursCandlesRepository.save(mappedCandles);
            }
            case Interval.SixHour: {
                storedCandles = await this.sixHoursCandlesRepository.save(mappedCandles);
            }
            case Interval.EightHour: {
                storedCandles = await this.eightHoursCandlesRepository.save(mappedCandles);
            }
            case Interval.TwelveHour: {
                storedCandles = await this.twelveHoursCandlesRepository.save(mappedCandles);
            }
            case Interval.OneDay: {
                storedCandles = await this.oneDayCandlesRepository.save(mappedCandles);
            }
            case Interval.ThreeDay: {
                storedCandles = await this.threeDaysCandlesRepository.save(mappedCandles);
            }
            case Interval.OneWeek: {
                storedCandles = await this.oneWeekCandlesRepository.save(mappedCandles);
            }
            case Interval.OneMonth: {
                storedCandles = await this.oneMonthCandlesRepository.save(mappedCandles);
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
            }
            case Interval.ThreeMinutes: {
                candles = await this.threeMinutesCandlesRepository.find(query);
            }
            case Interval.FiveMinutes: {
                candles = await this.fiveMinutesCandlesRepository.find(query);
            }
            case Interval.FifteenMinutes: {
                candles = await this.fifteenMinutesCandlesRepository.find(query);
            }
            case Interval.ThirtyMinutes: {
                candles = await this.thirtyMinutesCandlesRepository.find(query);
            }
            case Interval.OneHour: {
                candles = await this.oneHourCandlesRepository.find(query);
            }
            case Interval.TwoHour: {
                candles = await this.twoHoursCandlesRepository.find(query);
            }
            case Interval.FourHour: {
                candles = await this.fourHoursCandlesRepository.find(query);
            }
            case Interval.SixHour: {
                candles = await this.sixHoursCandlesRepository.find(query);
            }
            case Interval.EightHour: {
                candles = await this.eightHoursCandlesRepository.find(query);
            }
            case Interval.TwelveHour: {
                candles = await this.twelveHoursCandlesRepository.find(query);
            }
            case Interval.OneDay: {
                candles = await this.oneDayCandlesRepository.find(query);
            }
            case Interval.ThreeDay: {
                candles = await this.threeDaysCandlesRepository.find(query);
            }
            case Interval.OneWeek: {
                candles = await this.oneWeekCandlesRepository.find(query);
            }
            case Interval.OneMonth: {
                candles = await this.oneMonthCandlesRepository.find(query);
            }
        }

        if (candles.length > 0) return candles[0].closeTime;
        
        return null;
    }
}