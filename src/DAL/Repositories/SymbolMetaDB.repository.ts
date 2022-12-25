import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ISymbolMetaDBRepository from "../../BLL/Interfaces/DBRepositories/ISymbolMetaDBRepository.interface";
import SymbolMetaModel from "../../BLL/Models/SymbolMeta.model";
import { ObjectID, Repository } from "typeorm";
import SymbolMetaEntity from "../Entities/SymbolMeta.entity";
import { MapSymbolMetaEntitiesToSymbolMetas } from "../Mappers/SymbolMeta.mapper";

@Injectable()
export default class SymbolMetaDBRepository implements ISymbolMetaDBRepository {
    constructor(
        @InjectRepository(SymbolMetaEntity)
        private symbolMetasRepository: Repository<SymbolMetaEntity>
    ) { }

    async storeOrUpdate(symbolMetas: SymbolMetaModel[]): Promise<SymbolMetaModel[]> {
        const returnItems = [];
        for (const item of symbolMetas) {
            let symbolMeta: SymbolMetaEntity = null;

            if (item.id) {
                symbolMeta.t1mRsi14PrerequisitesCalculated = item.t1mRsi14PrerequisitesCalculated;
                symbolMeta.t3mRsi14PrerequisitesCalculated = item.t3mRsi14PrerequisitesCalculated;
                symbolMeta.t5mRsi14PrerequisitesCalculated = item.t5mRsi14PrerequisitesCalculated;
                symbolMeta.t15mRsi14PrerequisitesCalculated = item.t15mRsi14PrerequisitesCalculated;
                symbolMeta.t30mRsi14PrerequisitesCalculated = item.t30mRsi14PrerequisitesCalculated;
                symbolMeta.t1hRsi14PrerequisitesCalculated = item.t1hRsi14PrerequisitesCalculated;
                symbolMeta.t2hRsi14PrerequisitesCalculated = item.t2hRsi14PrerequisitesCalculated;
                symbolMeta.t4hRsi14PrerequisitesCalculated = item.t4hRsi14PrerequisitesCalculated;
                symbolMeta.t6hRsi14PrerequisitesCalculated = item.t6hRsi14PrerequisitesCalculated;
                symbolMeta.t8hRsi14PrerequisitesCalculated = item.t8hRsi14PrerequisitesCalculated;
                symbolMeta.t12hRsi14PrerequisitesCalculated = item.t12hRsi14PrerequisitesCalculated;
                symbolMeta.t1dRsi14PrerequisitesCalculated = item.t1dRsi14PrerequisitesCalculated;
                symbolMeta.t3dRsi14PrerequisitesCalculated = item.t3dRsi14PrerequisitesCalculated;
                symbolMeta.t1wRsi14PrerequisitesCalculated = item.t1wRsi14PrerequisitesCalculated;
                symbolMeta.t1MRsi14PrerequisitesCalculated = item.t1MRsi14PrerequisitesCalculated;
                symbolMeta.symbolId = item.symbolId;

                const result = await this.symbolMetasRepository.update(item.id, {
                    symbolId: item.symbolId,
                    t1mRsi14PrerequisitesCalculated: item.t1mRsi14PrerequisitesCalculated,
                    t3mRsi14PrerequisitesCalculated: item.t3mRsi14PrerequisitesCalculated,
                    t5mRsi14PrerequisitesCalculated: item.t5mRsi14PrerequisitesCalculated,
                    t15mRsi14PrerequisitesCalculated: item.t15mRsi14PrerequisitesCalculated,
                    t30mRsi14PrerequisitesCalculated: item.t30mRsi14PrerequisitesCalculated,
                    t1hRsi14PrerequisitesCalculated: item.t1hRsi14PrerequisitesCalculated,
                    t2hRsi14PrerequisitesCalculated: item.t2hRsi14PrerequisitesCalculated,
                    t4hRsi14PrerequisitesCalculated: item.t4hRsi14PrerequisitesCalculated,
                    t6hRsi14PrerequisitesCalculated: item.t6hRsi14PrerequisitesCalculated,
                    t8hRsi14PrerequisitesCalculated: item.t8hRsi14PrerequisitesCalculated,
                    t12hRsi14PrerequisitesCalculated: item.t12hRsi14PrerequisitesCalculated,
                    t1dRsi14PrerequisitesCalculated: item.t1dRsi14PrerequisitesCalculated,
                    t3dRsi14PrerequisitesCalculated: item.t3dRsi14PrerequisitesCalculated,
                    t1wRsi14PrerequisitesCalculated: item.t1wRsi14PrerequisitesCalculated,
                    t1MRsi14PrerequisitesCalculated: item.t1MRsi14PrerequisitesCalculated,
                });

                if (result.affected > 0) {
                    returnItems.push(item);
                }
            } else {
                symbolMeta = new SymbolMetaEntity();
                symbolMeta.t1mRsi14PrerequisitesCalculated = item.t1mRsi14PrerequisitesCalculated;
                symbolMeta.t3mRsi14PrerequisitesCalculated = item.t3mRsi14PrerequisitesCalculated;
                symbolMeta.t5mRsi14PrerequisitesCalculated = item.t5mRsi14PrerequisitesCalculated;
                symbolMeta.t15mRsi14PrerequisitesCalculated = item.t15mRsi14PrerequisitesCalculated;
                symbolMeta.t30mRsi14PrerequisitesCalculated = item.t30mRsi14PrerequisitesCalculated;
                symbolMeta.t1hRsi14PrerequisitesCalculated = item.t1hRsi14PrerequisitesCalculated;
                symbolMeta.t2hRsi14PrerequisitesCalculated = item.t2hRsi14PrerequisitesCalculated;
                symbolMeta.t4hRsi14PrerequisitesCalculated = item.t4hRsi14PrerequisitesCalculated;
                symbolMeta.t6hRsi14PrerequisitesCalculated = item.t6hRsi14PrerequisitesCalculated;
                symbolMeta.t8hRsi14PrerequisitesCalculated = item.t8hRsi14PrerequisitesCalculated;
                symbolMeta.t12hRsi14PrerequisitesCalculated = item.t12hRsi14PrerequisitesCalculated;
                symbolMeta.t1dRsi14PrerequisitesCalculated = item.t1dRsi14PrerequisitesCalculated;
                symbolMeta.t3dRsi14PrerequisitesCalculated = item.t3dRsi14PrerequisitesCalculated;
                symbolMeta.t1wRsi14PrerequisitesCalculated = item.t1wRsi14PrerequisitesCalculated;
                symbolMeta.t1MRsi14PrerequisitesCalculated = item.t1MRsi14PrerequisitesCalculated;

                symbolMeta.symbolId = item.symbolId;

                await this.symbolMetasRepository.insert(symbolMeta);
                returnItems.push(symbolMeta);
            }
        }

        return returnItems;
    }

    async getSymbolMetaBySymbolId(id: string): Promise<SymbolMetaModel | null> {
        const symbolMeta = await this.symbolMetasRepository.findOne({
            where: {
                symbolId: id
            },
        });

        if (!symbolMeta) return null;

        return MapSymbolMetaEntitiesToSymbolMetas([symbolMeta])[0];
    }
}