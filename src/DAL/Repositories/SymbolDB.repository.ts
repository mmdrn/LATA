import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MapCreateSymbolsToSymbolEntities, MapSymbolEntitiesToSymbols } from "../Mappers/Symbol.mapper";
import ISymbolDBRepository from "src/BLL/Interfaces/DBRepositories/ISymbolDBRepository.interface";
import CreateSymbol from "src/BLL/Models/CreateSymbol.model";
import Symbol from "src/BLL/Models/Symbol.model";
import SymbolEntity from "../Entities/Symbol.entity";
import ExistSymbol from "src/BLL/Models/ExistSymbol.model";

@Injectable()
export default class SymbolDBRepository implements ISymbolDBRepository {
    constructor(
        @InjectRepository(SymbolEntity)
        private symbolsRepository: Repository<SymbolEntity>
    ) { }

    async existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]> {
        const whereArray = [];

        for (const item of query) {
            const obj = {};
            obj[item.field] = item.value;
            whereArray.push(obj)
        }

        const findResult = await this.symbolsRepository.find({
            where: whereArray,
            select: {
                id: true,
                symbol: true,
                quoteAsset: false,
                baseAsset: false
            },
        });

        const result: ExistSymbol[] = query.map(i => {
            const newItem = i;

            if (findResult.map(s => s[i.field]).includes(i.value)) {
                newItem.exist = true;
            } else {
                newItem.exist = false;
            }

            return newItem;
        });

        return result;
    }

    async findAllSymbols(quoteAsset: string): Promise<Symbol[]> {
        const query: object = {};
        if (quoteAsset) query["where"] = { quoteAsset }
        const result = await this.symbolsRepository.find(query);
        const mappedSymbols = MapSymbolEntitiesToSymbols(result);

        return mappedSymbols;
    }

    async insertSymbols(symbols: CreateSymbol[]): Promise<Symbol[]> {
        const mappedSymbols = MapCreateSymbolsToSymbolEntities(symbols);
        const insertedSymbols = await this.symbolsRepository.save(mappedSymbols);

        return MapSymbolEntitiesToSymbols(insertedSymbols);
    }
}