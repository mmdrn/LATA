import CandleMeta from "src/BLL/Models/CandleMeta.model";
import CandleMetaEntity from "../Entities/CandleMeta.entity";

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

export function MapCandleMetaEntitiesToCandleMetas(candleMetas: CandleMetaEntity[]) {
    const mappedCandleMetas: CandleMeta[] = [];

    for (const candleMeta of candleMetas) {
        mappedCandleMetas.push({
            id: candleMeta.id.toString(),
            candleId: candleMeta.candleId,
            difference: candleMeta.difference,
            rsi14: candleMeta.rsi14,
            previous14Gains: candleMeta.previous14Gains,
            previous14Losses: candleMeta.previous14Losses,
            isImpulse: candleMeta.isImpulse,
            isCorrection: candleMeta.isCorrection,
            openPrice: candleMeta.openPrice,
            openTime: candleMeta.openTime,
            closePrice: candleMeta.closePrice,
            closeTime: candleMeta.closeTime,
            symbol: candleMeta.symbol
        })
    }

    return mappedCandleMetas;
}