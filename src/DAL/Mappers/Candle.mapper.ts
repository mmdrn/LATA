import CreateCandle from "src/BLL/Models/CreateCandle.model";
import Candle from "../Entities/OneHourCandle.entity";

export function MapCreateCandlesToCandleEntities(candles: CreateCandle[]): Candle[] {
    const mappedCandles: Candle[] = [];

    for (const candle of candles) {
        const _candle = new Candle();
        _candle.symbol = candle.symbol;
        _candle.openTime = candle.openTime;
        _candle.openPrice = candle.openPrice;
        _candle.highPrice = candle.highPrice;
        _candle.lowPrice = candle.lowPrice;
        _candle.closePrice = candle.closePrice;
        _candle.volume = candle.volume;
        _candle.closeTime = candle.closeTime;
        _candle.quoteAssetVolume = candle.quoteAssetVolume;
        _candle.numberOfTrades = candle.numberOfTrades;
        _candle.takerBuyBaseAssetVolume = candle.takerBuyBaseAssetVolume;
        _candle.takerBuyQuoteAssetVolume = candle.takerBuyQuoteAssetVolume;
        _candle.usedField = candle.usedField;

        mappedCandles.push(_candle)
    }

    return mappedCandles;
}

export function MapSymbolEntitiesToSymbols(candles: Candle[]) {
    const mappedCandles: Candle[] = [];

    for (const candle of candles) {
        mappedCandles.push({
            id: candle.id,
            closePrice: candle.closePrice,
            closeTime: candle.closeTime,
            highPrice: candle.highPrice,
            lowPrice: candle.lowPrice,
            numberOfTrades: candle.numberOfTrades,
            openPrice: candle.openPrice,
            openTime: candle.openPrice,
            quoteAssetVolume: candle.quoteAssetVolume,
            symbol: candle.symbol,
            takerBuyBaseAssetVolume: candle.takerBuyBaseAssetVolume,
            takerBuyQuoteAssetVolume: candle.takerBuyQuoteAssetVolume,
            usedField: candle.usedField,
            volume: candle.volume
        })
    }

    return mappedCandles;
}