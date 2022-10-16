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

    existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceSymbolService.existSymbols(query);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    insertSymbols(symbols: Symbol[]): Promise<Symbol[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceSymbolService.insertSymbols(symbols);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    async fetchAllSymbolsFromRemote(): Promise<Symbol[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceSymbolService.fetchAllSymbolsFromRemote();
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    findAllSymbols(quoteAsset: string, status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"): Promise<Symbol[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceSymbolService.findAllSymbols(quoteAsset, status);
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