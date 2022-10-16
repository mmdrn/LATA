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
            quoteAsset: symbol.quoteAsset,
            status: symbol.status,
            quotePrecision: symbol.quoteAssetPrecision,
            baseAssetPrecision: symbol.baseAssetPrecision,
            quoteAssetPrecision: symbol.quoteAssetPrecision,
            orderTypes: symbol.orderTypes,
            icebergAllowed: symbol.icebergAllowed,
            ocoAllowed: symbol.icebergAllowed,
            isSpotTradingAllowed: symbol.isSpotTradingAllowed,
            isMarginTradingAllowed: symbol.isMarginTradingAllowed,
            permissions: symbol.permissions,
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
            quoteAsset: symbol.quoteAsset,
            baseAssetPrecision: symbol.baseAssetPrecision,
            icebergAllowed: symbol.icebergAllowed,
            isMarginTradingAllowed: symbol.isMarginTradingAllowed,
            isSpotTradingAllowed: symbol.isSpotTradingAllowed,
            ocoAllowed: symbol.ocoAllowed,
            orderTypes: symbol.orderTypes,
            permissions: symbol.permissions,
            quoteAssetPrecision: symbol.quoteAssetPrecision,
            quotePrecision: symbol.quotePrecision,
            status: symbol.status
        })
    }

    return mappedSymbols
}