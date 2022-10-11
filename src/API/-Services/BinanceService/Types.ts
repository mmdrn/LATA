// import { Candle } from "src/Schemas/Candle.Schema";

export interface CreateSymbol {
    symbol: string,
    baseAsset: string,
    quoteAsset: string,
}

export interface CreateCandle {
    symbol: string,
    openTime: number,
    openPrice: number,
    highPrice: number,
    lowPrice: number,
    closePrice: number,
    volume: number,
    closeTime: number,
    quoteAssetVolume: number,
    numberOfTrades: number,
    takerBuyBaseAssetVolume: number,
    takerBuyQuoteAssetVolume: number,
    usedField: number,
}

export interface CreateMetas {
    // candle: Candle,
    rsi: number,
    difference: number,
}