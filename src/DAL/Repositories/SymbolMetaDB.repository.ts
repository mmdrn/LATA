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
                symbolMeta.rsi14PrerequisitesCalculated = item.rsi14PrerequisitesCalculated;
                symbolMeta.symbolId = item.symbolId;

                const result = await this.symbolMetasRepository.update(item.id, {
                    symbolId: item.symbolId,
                    rsi14PrerequisitesCalculated: item.rsi14PrerequisitesCalculated
                });

                if (result.affected > 0) {
                    returnItems.push(item);
                }
            } else {
                symbolMeta = new SymbolMetaEntity();
                symbolMeta.rsi14PrerequisitesCalculated = item.rsi14PrerequisitesCalculated;
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