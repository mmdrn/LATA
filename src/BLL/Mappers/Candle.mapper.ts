import Candle from "../Models/Candle.model";
import CreateCandle from "../Models/CreateCandle.model";

export function MapCandlesToCreateCandles(candles: Candle[]): CreateCandle[] {
    let mappedCandles = [];

    for (const candle of candles) {
        const _candle = new CreateCandle();
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