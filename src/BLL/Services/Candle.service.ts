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

    async getCandles(symbol: string, interval: Interval, take: number, sortBy: keyof Candle = "closeTime", sortMethod: "ASC" | "DESC"): Promise<Candle[] | null> {
        return this._getInstance().getCandles(symbol, interval, take, sortBy, sortMethod);
    }

    async getPreviousCandle(symbol: string, interval: Interval, closeTime: number): Promise<Candle | null> {
        return this._getInstance().getPreviousCandle(symbol, interval, closeTime);
    }

    async fetchAndStore(symbol: Symbol, interval: Interval): Promise<Candle[]> {
        return this._getInstance().fetchAndStore(symbol, interval)
    }

    async storeCandles(candles: CreateCandle[], interval: Interval): Promise<Candle[]> {
        return this._getInstance().storeCandles(candles, interval)
    }

    async fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number): Promise<Candle[]> {
        return this._getInstance().fetchCandles(symbol, interval, startTime, limit)
    }

    async calculateStartTimeDependingOnTheLatestExistingCandle(symbol: string, interval: Interval): Promise<number> {
        return this._getInstance().calculateStartTimeDependingOnTheLatestExistingCandle(symbol, interval);
    }

    private _getInstance(): ICandleService {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceCandleService;
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