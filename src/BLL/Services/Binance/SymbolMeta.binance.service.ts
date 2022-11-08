import { Injectable } from "@nestjs/common";
import SymbolMetaDBRepository from "../../../DAL/Repositories/SymbolMetaDB.repository";
import ISymbolMetaService from "../../../BLL/Interfaces/Services/ISymbolMetaService.interface";
import SymbolMetaModel from "../../../BLL/Models/SymbolMeta.model";

@Injectable()
export default class Binance_SymbolMetaService implements ISymbolMetaService {
    constructor(
        private readonly symbolMetasRepository: SymbolMetaDBRepository,
    ) { }

    async getSymbolMetaBySymbolId(id: string): Promise<SymbolMetaModel | null> {
        return this.symbolMetasRepository.getSymbolMetaBySymbolId(id);
    }

    async storeOrUpdate(symbolMetas: SymbolMetaModel[]): Promise<SymbolMetaModel[]> {
        return this.symbolMetasRepository.storeOrUpdate(symbolMetas);
    }
}