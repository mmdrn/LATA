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
            symbolId: symbolMeta.symbolId,
            t1mRsi14PrerequisitesCalculated: symbolMeta.t1mRsi14PrerequisitesCalculated,
            t3mRsi14PrerequisitesCalculated: symbolMeta.t3mRsi14PrerequisitesCalculated,
            t5mRsi14PrerequisitesCalculated: symbolMeta.t5mRsi14PrerequisitesCalculated,
            t15mRsi14PrerequisitesCalculated: symbolMeta.t15mRsi14PrerequisitesCalculated,
            t30mRsi14PrerequisitesCalculated: symbolMeta.t30mRsi14PrerequisitesCalculated,
            t1hRsi14PrerequisitesCalculated: symbolMeta.t1hRsi14PrerequisitesCalculated,
            t2hRsi14PrerequisitesCalculated: symbolMeta.t2hRsi14PrerequisitesCalculated,
            t4hRsi14PrerequisitesCalculated: symbolMeta.t4hRsi14PrerequisitesCalculated,
            t6hRsi14PrerequisitesCalculated: symbolMeta.t6hRsi14PrerequisitesCalculated,
            t8hRsi14PrerequisitesCalculated: symbolMeta.t8hRsi14PrerequisitesCalculated,
            t12hRsi14PrerequisitesCalculated: symbolMeta.t12hRsi14PrerequisitesCalculated,
            t1dRsi14PrerequisitesCalculated: symbolMeta.t1dRsi14PrerequisitesCalculated,
            t3dRsi14PrerequisitesCalculated: symbolMeta.t3dRsi14PrerequisitesCalculated,
            t1wRsi14PrerequisitesCalculated: symbolMeta.t1wRsi14PrerequisitesCalculated,
            t1MRsi14PrerequisitesCalculated: symbolMeta.t1MRsi14PrerequisitesCalculated,
        })
    }

    return mappedSymbolMetas;
}