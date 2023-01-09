import { Injectable } from "@nestjs/common";
import { Exchanges } from "../Enums/Exchanges.enum";
import IExchangeAPIRepository from "../Interfaces/APIRepositories/IExchangeAPIRepository.interface";
import Binance_ExchangeAPIRepository from "./Binance/ExchangeAPI.binance.repository";
import Symbol from "./../Models/Symbol.model";
import Candle from "../Models/Candle.model";
import { Interval } from "../Enums/Interval.enum";

@Injectable()
export default class ExchangeAPIRepository implements IExchangeAPIRepository {

    private exchange: number = null;
    constructor(
        private readonly binanceExchangeAPIRepository: Binance_ExchangeAPIRepository
    ) { }

    async fetchSymbolPrice(symbol: string): Promise<number | null> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceExchangeAPIRepository.fetchSymbolPrice(symbol);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    async fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number, ignoreCurrentCandle: Boolean = true): Promise<Candle[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceExchangeAPIRepository.fetchCandles(symbol, interval, startTime, limit, ignoreCurrentCandle);
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    fetchAllSymbols(): Promise<Symbol[]> {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceExchangeAPIRepository.fetchAllSymbols();
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }
}