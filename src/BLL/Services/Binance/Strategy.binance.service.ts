import { Injectable } from "@nestjs/common";
import IStrategyService from "./../../../BLL/Interfaces/Services/IStrategyService.interface";
import { Interval } from "./../../../BLL/Enums/Interval.enum";
import CandleDBRepository from "./../../../DAL/Repositories/CandleDB.repository";
import Binance_ExchangeAPIRepository from "./../../../BLL/APIRepositories/Binance/ExchangeAPI.binance.repository";

@Injectable()
export default class Binance_StrategyService implements IStrategyService {
    constructor(
        private readonly candleDBRepository: CandleDBRepository,
        private readonly binanceExchangeAPIRepository: Binance_ExchangeAPIRepository
    ) { }

    async sma(symbol: string, interval: Interval, length: number): Promise<number | null> {
        const candles = await this.candleDBRepository.getCandles(symbol, interval, length - 1, "closeTime", "DESC");

        if (!candles || candles.length !== length - 1) return null

        const sum = candles.reduce((acc, candle) => {
            return acc + parseFloat(candle.closePrice.toString())
        }, 0)

        const lastPrice = await this.binanceExchangeAPIRepository.fetchSymbolPrice(symbol);

        return (sum + lastPrice) / length;
    }
}