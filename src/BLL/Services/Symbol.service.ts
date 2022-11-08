import { Injectable } from "@nestjs/common";
import { Exchanges } from "../Enums/Exchanges.enum";
import { EnumHelper } from "../Helpers/EnumHelper.helper";
import ISymbolService from "../Interfaces/Services/ISymbolService.interface";
import ExistSymbol from "../Models/ExistSymbol.model";
import Symbol from "../Models/Symbol.model";
import Binance_SymbolService from "./Binance/Symbol.binance.service";

@Injectable()
export default class SymbolService implements ISymbolService {
    private exchange: number = null;
    constructor(
        private readonly binanceSymbolService: Binance_SymbolService,
    ) { }

    async getSymbolBySymbol(symbol: string): Promise<Symbol | null> {
        return this._getInstance().getSymbolBySymbol(symbol);
    }

    async existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]> {
        return this._getInstance().existSymbols(query);
    }

    async insertSymbols(symbols: Symbol[]): Promise<Symbol[]> {
        return this._getInstance().insertSymbols(symbols);
    }

    async fetchAllSymbolsFromRemote(): Promise<Symbol[]> {
        return this._getInstance().fetchAllSymbolsFromRemote();
    }

    async findAllSymbols(quoteAsset: string, status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"): Promise<Symbol[]> {
        return this._getInstance().findAllSymbols(quoteAsset, status);
    }

    private _getInstance(): ISymbolService {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceSymbolService;
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    setExchange(exchange: number): Boolean {
        const enumHelper = new EnumHelper();
        if (!enumHelper.hasValue(exchange, Exchanges)) throw new Error(`invalid exchange: ${exchange}`);

        this.exchange = exchange;
        return true;
    }
}