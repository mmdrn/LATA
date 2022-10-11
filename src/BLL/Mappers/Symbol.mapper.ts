import { SymbolExchangeInfo } from "binance";
import CreateSymbol from "../Models/CreateSymbol.model";
import Symbol from "../Models/Symbol.model";

export function MapSymbolExchangeInfoToSymbol(symbols: SymbolExchangeInfo[]): Symbol[] {
    const mappedSymbols: Symbol[] = [];

    for (const symbol of symbols) {
        mappedSymbols.push({
            id: null,
            symbol: symbol.symbol,
            baseAsset: symbol.baseAsset,
            quoteAsset: symbol.quoteAsset
        })
    }

    return mappedSymbols
}

export function MapSymbolsToCreateSymbols(symbols: Symbol[]): CreateSymbol[] {
    const mappedSymbols: CreateSymbol[] = [];

    for (const symbol of symbols) {
        mappedSymbols.push({
            symbol: symbol.symbol,
            baseAsset: symbol.baseAsset,
            quoteAsset: symbol.quoteAsset
        })
    }

    return mappedSymbols
}