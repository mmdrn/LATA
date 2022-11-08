import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ICandleMetaDBRepository from "src/BLL/Interfaces/DBRepositories/ICandleMetaDBRepository.interface";
import CandleMetaModel from "src/BLL/Models/CandleMeta.model";
import CreateCandleMetaModel from "src/BLL/Models/CreateCandleMeta.model";
import { MongoRepository, ObjectID, Repository } from "typeorm";
import CandleMetaEntity from "../Entities/CandleMeta.entity";
import { MapCandleMetaEntitiesToCandleMetas } from "../Mappers/CandleMeta.mapper";

@Injectable()
export default class CandleMetaDBRepository implements ICandleMetaDBRepository {
    constructor(
        @InjectRepository(CandleMetaEntity)
        private candleMetasRepository: MongoRepository<CandleMetaEntity>
    ) { }

    async storeOrUpdate(candleMetas: CandleMetaModel[]): Promise<CandleMetaModel[]> {
        const returnItems = [];
        for (const item of candleMetas) {
            let candleMeta: CandleMetaEntity = new CandleMetaEntity();

            if (item.id) {
                const result = await this.candleMetasRepository.update(item.id, {
                    candleId: item.candleId,
                    difference: item.difference,
                    rsi14: item.rsi14
                });

                if (result.affected > 0) returnItems.push(item);
            } else {
                candleMeta = new CandleMetaEntity();
                candleMeta.rsi14 = item.rsi14;
                candleMeta.difference = item.difference;
                candleMeta.candleId = item.candleId;

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