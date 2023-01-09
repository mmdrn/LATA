import { Injectable } from "@nestjs/common";
import { ExchangeInfo, KlineInterval, MainClient } from "binance";
import { MapSymbolExchangeInfoToSymbol } from "../../../BLL/Mappers/Symbol.mapper";
import { Interval } from "../../../BLL/Enums/Interval.enum";
import IExchangeAPIRepository from "../../../BLL/Interfaces/APIRepositories/IExchangeAPIRepository.interface";
import Symbol from "../../../BLL/Models/Symbol.model";
import Candle from "../../../BLL/Models/Candle.model";

@Injectable()
export default class Binance_ExchangeAPIRepository implements IExchangeAPIRepository {

    async fetchSymbolPrice(symbol: string): Promise<number | null> {
        const clinet = new MainClient({});
        const result = await clinet.getSymbolPriceTicker({
            symbol: symbol.toUpperCase()
        })

        return parseFloat(result["price"])
    }

    async fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number, ignoreCurrentCandle: Boolean = true): Promise<Candle[]> {
        const clinet = new MainClient({});
        const result = await clinet.getKlines({
            symbol: symbol.toUpperCase(),
            interval: this.mapIntervalToBinanceKlineInterval(interval),
            startTime,
            limit
        });

        const mappedCandles = this.mapBinanceKlinesToCandles(result, symbol);

        if (ignoreCurrentCandle) {
            const now = Date.now();
            return mappedCandles.filter(i => i.closeTime < now)
        }

        return mappedCandles;
    }

    async fetchAllSymbols(): Promise<Symbol[]> {
        try {
            const client = new MainClient({});
            const response: ExchangeInfo = await client.getExchangeInfo();

            const symbols: Symbol[] = MapSymbolExchangeInfoToSymbol(response.symbols);

            return symbols;
        } catch (error) {
            throw error
        }
    }

    private mapIntervalToBinanceKlineInterval(interval: Interval): KlineInterval {
        switch (interval) {
            case 0:
                return "1m"
            case 1:
                return "3m"
            case 2:
                return "5m"
            case 3:
                return "15m"
            case 4:
                return "30m"
            case 5:
                return "1h"
            case 6:
                return "2h"
            case 7:
                return "4h"
            case 8:
                return "6h"
            case 9:
                return "8h"
            case 10:
                return "12h"
            case 11:
                return "1d"
            case 12:
                return "3d"
            case 13:
                return "1w"
            case 14:
                return "1M"
        }
    }

    private mapBinanceKlinesToCandles(sourceCandles: Object[], symbol: string): Candle[] {
        const mappedCandles: Candle[] = [];

        for (const candle of sourceCandles) {
            mappedCandles.push({
                id: null,
                symbol: symbol,
                openTime: candle[0],
                openPrice: parseFloat(candle[1]),
                highPrice: parseFloat(candle[2]),
                lowPrice: parseFloat(candle[3]),
                closePrice: parseFloat(candle[4]),
                volume: candle[5],
                closeTime: candle[6],
                quoteAssetVolume: candle[7],
                numberOfTrades: candle[8],
                takerBuyBaseAssetVolume: candle[9],
                takerBuyQuoteAssetVolume: candle[10],
                usedField: candle[11],
                direction: candle[1] > candle[4] ? "desc" : "asc"
            });
        }

        return mappedCandles;
    }
}