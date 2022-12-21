import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ICandleMetaDBRepository from "src/BLL/Interfaces/DBRepositories/ICandleMetaDBRepository.interface";
import CandleMetaModel from "src/BLL/Models/CandleMeta.model";
import { MongoRepository } from "typeorm";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";
import CandleMetaEntity from "../Entities/CandleMeta.entity";
import { MapCandleMetaEntitiesToCandleMetas } from "../Mappers/CandleMeta.mapper";

@Injectable()
export default class CandleMetaDBRepository implements ICandleMetaDBRepository {
    constructor(
        @InjectRepository(CandleMetaEntity)
        private candleMetasRepository: MongoRepository<CandleMetaEntity>
    ) { }

    async getCorrections(symbol: string, closeTime: number): Promise<CandleMetaModel[]> {
        const query: MongoFindManyOptions<CandleMetaEntity> = {
            where: {
                symbol: symbol,
                isCorrection: true

            },
            order: {
                closeTime: "DESC"
            }
        }

        if (closeTime) query.where.closeTime = { $gte: closeTime }

        const candleMetas = await this.candleMetasRepository.find(query)

        return MapCandleMetaEntitiesToCandleMetas(candleMetas);
    }

    async storeOrUpdate(candleMetas: CandleMetaModel[]): Promise<CandleMetaModel[]> {
        const returnItems = [];
        for (const item of candleMetas) {
            let candleMeta: CandleMetaEntity = new CandleMetaEntity();

            if (item.id) {
                const result = await this.candleMetasRepository.update(item.id, {
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
                candleMeta = new CandleMetaEntity();
                candleMeta.rsi14 = item.rsi14;
                candleMeta.difference = item.difference;
                candleMeta.candleId = item.candleId;
                candleMeta.previous14Gains = item.previous14Gains;
                candleMeta.previous14Losses = item.previous14Losses;
                candleMeta.isImpulse = item.isImpulse;
                candleMeta.isCorrection = item.isCorrection;
                candleMeta.closePrice = item.closePrice;
                candleMeta.openPrice = item.openPrice;
                candleMeta.closeTime = item.closeTime;
                candleMeta.openTime = item.openTime;
                candleMeta.symbol = item.symbol;

                await this.candleMetasRepository.insert(candleMeta);
                returnItems.push(candleMeta);
            }
        }

        return returnItems;
    }

    async getCandleMetaByCandleId(id: string): Promise<CandleMetaModel | null> {
        const candleMeta = await this.candleMetasRepository.findOne({
            where: {
                candleId: id
            },
        });

        if (!candleMeta) return null;

        return MapCandleMetaEntitiesToCandleMetas([candleMeta])[0];
    }
}