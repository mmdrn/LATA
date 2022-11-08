import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, FindOptionsSelect, FindOptionsWhere, Repository } from "typeorm";
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

    async getSymbolBySymbol(symbol: string): Promise<Symbol | null> {
        const _symbol = await this.symbolsRepository.findOne({
            where: {
                symbol: symbol
            }
        })

        if (!_symbol) return null
        
        return MapSymbolEntitiesToSymbols([_symbol])[0];
    }

    async existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]> {
        const whereArray: FindOptionsWhere<SymbolEntity>[] = [];
        for (const item of query) {
            const queryItem: FindOptionsWhere<SymbolEntity> = {}
            queryItem[item.field].toString = Equal(item.value.toString());
            queryItem[item.field].toString = item.value;
            whereArray.push(queryItem)
        }

        try {
            const findResult = await this.symbolsRepository.find({
                // where: whereArray,
                where: [
                    {
                        symbol: Equal("BNBBTC")
                    },
                    {
                        symbol: Equal("ETHBTC")
                    },
                ]
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
        } catch (error) {
            throw error
        }
    }

    async findAllSymbols(quoteAsset: string, status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"): Promise<Symbol[]> {
        const query: object = {};
        if (quoteAsset || status) {
            query["where"] = {};
            if (quoteAsset) query["where"]["quoteAsset"] = quoteAsset;
            if (status) query["where"]["status"] = status;
        }

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