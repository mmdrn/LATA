import { Injectable } from "@nestjs/common";
import { MapSymbolsToCreateSymbols } from "../../Mappers/Symbol.mapper";
import ISymbolService from "../../Interfaces/Services/ISymbolService.interface";
import Symbol from "../../Models/Symbol.model";
import SymbolDBRepository from "../../../DAL/Repositories/SymbolDB.repository";
import ExistSymbol from "../../../BLL/Models/ExistSymbol.model";
import Binance_ExchangeAPIRepository from "../../../BLL/APIRepositories/Binance/ExchangeAPI.binance.repository";

@Injectable()
export default class Binance_SymbolService implements ISymbolService {
    constructor(
        private readonly symbolsRepository: SymbolDBRepository,
        private readonly binanceExchangeAPIRepository: Binance_ExchangeAPIRepository
    ) { }

    async fetchAllSymbolsFromRemote(): Promise<Symbol[]> {
        return this.binanceExchangeAPIRepository.fetchAllSymbols();
    }

    async existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]> {
        try {
            return await this.symbolsRepository.existSymbols(query);
        } catch (error) {
            throw new Error("operation failed!!");
        }
    }

    async insertSymbols(symbols: Symbol[]): Promise<Symbol[]> {
        try {
            const mappedSymbols = MapSymbolsToCreateSymbols(symbols);
            const insertedSymbols = await this.symbolsRepository.insertSymbols(mappedSymbols);

            return insertedSymbols;
        } catch (error) {
            throw new Error("operation failed!!");
        }
    }

    async findAllSymbols(quoteAsset: string, status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"): Promise<Symbol[]> {
        return this.symbolsRepository.findAllSymbols(quoteAsset, status);
    }
}