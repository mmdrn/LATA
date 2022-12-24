import SymbolMeta from "../../BLL/Models/SymbolMeta.model";
import SymbolMetaEntity from "../Entities/SymbolMeta.entity";

// export function MapCreateSymbolsToSymbolEntities(symbols: CreateSymbol[]): SymbolEntity[] {
//     const mappedSymbols: SymbolEntity[] = [];

//     for (const symbol of symbols) {
//         const _symbol = new SymbolEntity();
//         _symbol.symbol = symbol.symbol;
//         _symbol.baseAsset = symbol.baseAsset;
//         _symbol.quoteAsset = symbol.quoteAsset;
//         _symbol.status = symbol.status;
//         _symbol.baseAssetPrecision = symbol.baseAssetPrecision;
//         _symbol.quotePrecision = symbol.quotePrecision;
//         _symbol.quoteAssetPrecision = symbol.quoteAssetPrecision;
//         _symbol.orderTypes = symbol.orderTypes;
//         _symbol.icebergAllowed = symbol.icebergAllowed;
//         _symbol.ocoAllowed = symbol.ocoAllowed;
//         _symbol.isSpotTradingAllowed = symbol.isSpotTradingAllowed;
//         _symbol.isMarginTradingAllowed = symbol.isMarginTradingAllowed;
//         _symbol.permissions = symbol.permissions;

//         mappedSymbols.push(_symbol)
//     }

//     return mappedSymbols;
// }

export function MapSymbolMetaEntitiesToSymbolMetas(symbolMetas: SymbolMetaEntity[]) {
    const mappedSymbolMetas: SymbolMeta[] = [];

    for (const symbolMeta of symbolMetas) {
        mappedSymbolMetas.push({
            id: symbolMeta.id.toString(),
            rsi14PrerequisitesCalculated: symbolMeta.rsi14PrerequisitesCalculated,
            symbolId: symbolMeta.symbolId
        })
    }

    return mappedSymbolMetas;
}