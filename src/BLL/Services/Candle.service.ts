import { Injectable } from "@nestjs/common";
import { Exchanges } from "../Enums/Exchanges.enum";
import { Interval } from "../Enums/Interval.enum";
import { EnumHelper } from "../Helpers/EnumHelper.helper";
import ICandleService from "../Interfaces/Services/ICandleService.interface";
import Candle from "../Models/Candle.model";
import CreateCandle from "../Models/CreateCandle.model";
import Symbol from "../Models/Symbol.model";
import Binance_CandleService from "./Binance/Candle.binance.service";

@Injectable()
export default class CandleService implements ICandleService {
    private exchange: number = null;

    constructor(
        private readonly binanceCandleService: Binance_CandleService,
    ) { }

    async fetchAndStore(symbol: Symbol, interval: Interval): Promise<Candle[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceCandleService.fetchAndStore(symbol, interval);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    async storeCandles(candles: CreateCandle[], interval: Interval): Promise<Candle[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceCandleService.storeCandles(candles, interval);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    async fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number): Promise<Candle[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceCandleService.fetchCandles(symbol, interval, startTime, limit);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    async calculateStartTimeDependingOnTheLatestExistingCandle(symbol: string, interval: Interval): Promise<number> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceCandleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol, interval);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    setExchange(exchange: number): Boolean {
        const enumHelper = new EnumHelper();
        if (!enumHelper.hasValue(exchange, Exchanges)) throw new Error(`invalid exchange: ${exchange}`);

        this.exchange = exchange;
        return true;
    }
}