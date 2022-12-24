import CreateSymbol from "../../BLL/Models/CreateSymbol.model";
import Symbol from "../../BLL/Models/Symbol.model";
import SymbolEntity from "../Entities/Symbol.entity";

export function MapCreateSymbolsToSymbolEntities(symbols: CreateSymbol[]): SymbolEntity[] {
    const mappedSymbols: SymbolEntity[] = [];

    for (const symbol of symbols) {
        const _symbol = new SymbolEntity();
        _symbol.symbol = symbol.symbol;
        _symbol.baseAsset = symbol.baseAsset;
        _symbol.quoteAsset = symbol.quoteAsset;
        _symbol.status = symbol.status;
        _symbol.baseAssetPrecision = symbol.baseAssetPrecision;
        _symbol.quotePrecision = symbol.quotePrecision;
        _symbol.quoteAssetPrecision = symbol.quoteAssetPrecision;
        _symbol.orderTypes = symbol.orderTypes;
        _symbol.icebergAllowed = symbol.icebergAllowed;
        _symbol.ocoAllowed = symbol.ocoAllowed;
        _symbol.isSpotTradingAllowed = symbol.isSpotTradingAllowed;
        _symbol.isMarginTradingAllowed = symbol.isMarginTradingAllowed;
        _symbol.permissions = symbol.permissions;

        mappedSymbols.push(_symbol)
    }

    return mappedSymbols;
}

export function MapSymbolEntitiesToSymbols(symbols: SymbolEntity[]) {
    const mappedSymbols: Symbol[] = [];

    for (const symbol of symbols) {
        mappedSymbols.push({
            id: symbol.id.toString(),
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

    return mappedSymbols;
}