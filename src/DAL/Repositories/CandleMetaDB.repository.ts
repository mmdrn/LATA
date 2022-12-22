import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Interval } from "src/BLL/Enums/Interval.enum";
import ICandleMetaDBRepository from "src/BLL/Interfaces/DBRepositories/ICandleMetaDBRepository.interface";
import CandleMetaModel from "src/BLL/Models/CandleMeta.model";
import { MongoRepository } from "typeorm";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";
import { MongoFindOneOptions } from "typeorm/find-options/mongodb/MongoFindOneOptions";
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
import { MapCandleMetaEntitiesToCandleMetas, MapCreateCandleMetasToCandleMetasEntities } from "../Mappers/CandleMeta.mapper";

@Injectable()
export default class CandleMetaDBRepository implements ICandleMetaDBRepository {
    constructor(
        // @InjectRepository(CandleMetaEntity)
        // private candleMetasRepository: MongoRepository<CandleMetaEntity>


        @InjectRepository(OneMinuteCandleMeta)
        private oneMinuteCandleMetasRepository: MongoRepository<OneMinuteCandleMeta>,

        @InjectRepository(ThreeMinutesCandleMeta)
        private threeMinutesCandleMetasRepository: MongoRepository<ThreeMinutesCandleMeta>,

        @InjectRepository(FiveMinutesCandleMeta)
        private fiveMinutesCandleMetasRepository: MongoRepository<FiveMinutesCandleMeta>,

        @InjectRepository(FifteenMinutesCandleMeta)
        private fifteenMinutesCandleMetasRepository: MongoRepository<FifteenMinutesCandleMeta>,

        @InjectRepository(ThirtyMinutesCandleMeta)
        private thirtyMinutesCandleMetasRepository: MongoRepository<ThirtyMinutesCandleMeta>,

        @InjectRepository(OneHourCandleMeta)
        private oneHourCandleMetasRepository: MongoRepository<OneHourCandleMeta>,

        @InjectRepository(TwoHoursCandleMeta)
        private twoHoursCandleMetasRepository: MongoRepository<TwoHoursCandleMeta>,

        @InjectRepository(FourHoursCandleMeta)
        private fourHoursCandleMetasRepository: MongoRepository<FourHoursCandleMeta>,

        @InjectRepository(SixHoursCandleMeta)
        private sixHoursCandleMetasRepository: MongoRepository<SixHoursCandleMeta>,

        @InjectRepository(EightHoursCandleMeta)
        private eightHoursCandleMetasRepository: MongoRepository<EightHoursCandleMeta>,

        @InjectRepository(TwelveHoursCandleMeta)
        private twelveHoursCandleMetasRepository: MongoRepository<TwelveHoursCandleMeta>,

        @InjectRepository(OneDayCandleMeta)
        private oneDayCandleMetasRepository: MongoRepository<OneDayCandleMeta>,

        @InjectRepository(ThreeDaysCandleMeta)
        private threeDaysCandleMetasRepository: MongoRepository<ThreeDaysCandleMeta>,

        @InjectRepository(OneWeekCandleMeta)
        private oneWeekCandleMetasRepository: MongoRepository<OneWeekCandleMeta>,

        @InjectRepository(OneMonthCandleMeta)
        private oneMonthCandleMetasRepository: MongoRepository<OneMonthCandleMeta>,
    ) { }

    async getCorrections(symbol: string, closeTime: number, interval: Interval): Promise<CandleMetaModel[]> {
        const query: MongoFindManyOptions = {
            where: {
                symbol: symbol,
                isCorrection: true

            },
            order: {
                closeTime: "DESC"
            }
        }

        if (closeTime) query.where.closeTime = { $gte: closeTime }

        let candleMetas;
        switch (interval) {
            case Interval.OneMinute: {
                candleMetas = await this.oneMinuteCandleMetasRepository.find(query as MongoFindManyOptions<OneMinuteCandleMeta>)
                break;
            }
            case Interval.ThreeMinutes: {
                candleMetas = await this.threeMinutesCandleMetasRepository.find(query as MongoFindManyOptions<ThreeMinutesCandleMeta>)
                break;
            }
            case Interval.FiveMinutes: {
                candleMetas = await this.fiveMinutesCandleMetasRepository.find(query as MongoFindManyOptions<FiveMinutesCandleMeta>)
                break;
            }
            case Interval.FifteenMinutes: {
                candleMetas = await this.fifteenMinutesCandleMetasRepository.find(query as MongoFindManyOptions<FifteenMinutesCandleMeta>)
                break;
            }
            case Interval.ThirtyMinutes: {
                candleMetas = await this.thirtyMinutesCandleMetasRepository.find(query as MongoFindManyOptions<ThirtyMinutesCandleMeta>)
                break;
            }
            case Interval.OneHour: {
                candleMetas = await this.oneHourCandleMetasRepository.find(query as MongoFindManyOptions<OneHourCandleMeta>)
                break;
            }
            case Interval.TwoHour: {
                candleMetas = await this.twoHoursCandleMetasRepository.find(query as MongoFindManyOptions<TwoHoursCandleMeta>)
                break;
            }
            case Interval.FourHour: {
                candleMetas = await this.fourHoursCandleMetasRepository.find(query as MongoFindManyOptions<FourHoursCandleMeta>)
                break;
            }
            case Interval.SixHour: {
                candleMetas = await this.sixHoursCandleMetasRepository.find(query as MongoFindManyOptions<SixHoursCandleMeta>)
                break;
            }
            case Interval.EightHour: {
                candleMetas = await this.eightHoursCandleMetasRepository.find(query as MongoFindManyOptions<EightHoursCandleMeta>)
                break;
            }
            case Interval.TwelveHour: {
                candleMetas = await this.twelveHoursCandleMetasRepository.find(query as MongoFindManyOptions<TwelveHoursCandleMeta>)
                break;
            }
            case Interval.OneDay: {
                candleMetas = await this.oneDayCandleMetasRepository.find(query as MongoFindManyOptions<OneDayCandleMeta>)
                break;
            }
            case Interval.ThreeDay: {
                candleMetas = await this.threeDaysCandleMetasRepository.find(query as MongoFindManyOptions<ThreeDaysCandleMeta>)
                break;
            }
            case Interval.OneWeek: {
                candleMetas = await this.oneWeekCandleMetasRepository.find(query as MongoFindManyOptions<OneWeekCandleMeta>)
                break;
            }
            case Interval.OneMonth: {
                candleMetas = await this.oneMonthCandleMetasRepository.find(query as MongoFindManyOptions<OneMonthCandleMeta>)
                break;
            }
        }

        return MapCandleMetaEntitiesToCandleMetas(candleMetas);
    }

    async storeOrUpdate(candleMetas: CandleMetaModel[], interval: Interval): Promise<CandleMetaModel[]> {
        const returnItems = [];

        switch (interval) {
            case Interval.OneMinute: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.oneMinuteCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.oneMinuteCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.ThreeMinutes: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.threeMinutesCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.threeMinutesCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.FiveMinutes: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.fiveMinutesCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.fiveMinutesCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.FifteenMinutes: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.fifteenMinutesCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.fifteenMinutesCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.ThirtyMinutes: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.thirtyMinutesCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.thirtyMinutesCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.OneHour: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.oneHourCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.oneHourCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.TwoHour: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.twoHoursCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.twoHoursCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.FourHour: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.fourHoursCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.fourHoursCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.SixHour: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.sixHoursCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.sixHoursCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.EightHour: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.eightHoursCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.eightHoursCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.TwelveHour: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.twelveHoursCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.twelveHoursCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.OneDay: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.oneDayCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.oneDayCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.ThreeDay: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.threeDaysCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.threeDaysCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.OneWeek: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.oneWeekCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.oneWeekCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
            case Interval.OneMonth: {
                for (const item of candleMetas) {
                    if (item.id) {
                        const result = await this.oneMonthCandleMetasRepository.update(item.id, {
                            candleId: item.candleId,
                            difference: item.difference,
                            rsi14: item.rsi14,
                            previous14Gains: item.previous14Gains,
                            previous14Losses: item.previous14Losses,
                            isImpulse: item.isImpulse,
                            isCorrection: item.isCorrection,
                            closePrice: item.closePrice,
                            openPrice: item.openPrice,
                            closeTime: item.closeTime,
                            openTime: item.openTime,
                            symbol: item.symbol
                        });

                        if (result.affected > 0) returnItems.push(item);
                    } else {
                        const mappedCandleMeta = MapCreateCandleMetasToCandleMetasEntities([item], interval);

                        await this.oneMonthCandleMetasRepository.insert(mappedCandleMeta);
                        returnItems.push(mappedCandleMeta);
                    }
                }
                break;
            }
        }

        return returnItems;
    }

    async getCandleMetaByCandleId(id: string, interval: Interval): Promise<CandleMetaModel | null> {
        const query: MongoFindOneOptions = {
            where: {
                candleId: id
            }
        }

        let candleMeta;
        switch (interval) {
            case Interval.OneMinute: {
                candleMeta = await this.oneMinuteCandleMetasRepository.findOne(query as MongoFindOneOptions<OneMinuteCandleMeta>)
                break;
            }
            case Interval.ThreeMinutes: {
                candleMeta = await this.threeMinutesCandleMetasRepository.findOne(query as MongoFindOneOptions<ThreeMinutesCandleMeta>)
                break;
            }
            case Interval.FiveMinutes: {
                candleMeta = await this.fiveMinutesCandleMetasRepository.findOne(query as MongoFindOneOptions<FiveMinutesCandleMeta>)
                break;
            }
            case Interval.FifteenMinutes: {
                candleMeta = await this.fifteenMinutesCandleMetasRepository.findOne(query as MongoFindOneOptions<FifteenMinutesCandleMeta>)
                break;
            }
            case Interval.ThirtyMinutes: {
                candleMeta = await this.thirtyMinutesCandleMetasRepository.findOne(query as MongoFindOneOptions<ThirtyMinutesCandleMeta>)
                break;
            }
            case Interval.OneHour: {
                candleMeta = await this.oneHourCandleMetasRepository.findOne(query as MongoFindOneOptions<OneHourCandleMeta>)
                break;
            }
            case Interval.TwoHour: {
                candleMeta = await this.twoHoursCandleMetasRepository.findOne(query as MongoFindOneOptions<TwoHoursCandleMeta>)
                break;
            }
            case Interval.FourHour: {
                candleMeta = await this.fourHoursCandleMetasRepository.findOne(query as MongoFindOneOptions<FourHoursCandleMeta>)
                break;
            }
            case Interval.SixHour: {
                candleMeta = await this.sixHoursCandleMetasRepository.findOne(query as MongoFindOneOptions<SixHoursCandleMeta>)
                break;
            }
            case Interval.EightHour: {
                candleMeta = await this.eightHoursCandleMetasRepository.findOne(query as MongoFindOneOptions<EightHoursCandleMeta>)
                break;
            }
            case Interval.TwelveHour: {
                candleMeta = await this.twelveHoursCandleMetasRepository.findOne(query as MongoFindOneOptions<TwelveHoursCandleMeta>)
                break;
            }
            case Interval.OneDay: {
                candleMeta = await this.oneDayCandleMetasRepository.findOne(query as MongoFindOneOptions<OneDayCandleMeta>)
                break;
            }
            case Interval.ThreeDay: {
                candleMeta = await this.threeDaysCandleMetasRepository.findOne(query as MongoFindOneOptions<ThreeDaysCandleMeta>)
                break;
            }
            case Interval.OneWeek: {
                candleMeta = await this.oneWeekCandleMetasRepository.findOne(query as MongoFindOneOptions<OneWeekCandleMeta>)
                break;
            }
            case Interval.OneMonth: {
                candleMeta = await this.oneMonthCandleMetasRepository.findOne(query as MongoFindOneOptions<OneMonthCandleMeta>)
                break;
            }
        }

        if (!candleMeta) return null;

        return MapCandleMetaEntitiesToCandleMetas([candleMeta])[0];
    }
}