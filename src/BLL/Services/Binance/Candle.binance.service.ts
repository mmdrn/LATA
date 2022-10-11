import { Injectable } from "@nestjs/common";
import Candle from "src/BLL/Models/Candle.model";
import CreateCandle from "src/BLL/Models/CreateCandle.model";
import Binance_ExchangeAPIRepository from "../../../BLL/APIRepositories/Binance/ExchangeAPI.binance.repository";
import { Interval } from "../../../BLL/Enums/Interval.enum";
import CandleDBRepository from "../../../DAL/Repositories/CandleDB.repository";
import ICandleService from "../../Interfaces/Services/ICandleService.interface";

@Injectable()
export default class Binance_CandleService implements ICandleService {
    constructor(
        private readonly candlesRepository: CandleDBRepository,
        private readonly binanceExchangeAPIRepository: Binance_ExchangeAPIRepository,
    ) { }

    async storeCandles(candles: CreateCandle[], interval: Interval): Promise<Candle[]> {
        return this.candlesRepository.storeCandle(candles, interval);
    }

    async fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number): Promise<Candle[]> {
        return this.binanceExchangeAPIRepository.fetchCandles(symbol, interval, startTime, limit);
    }

    async calculateStartTimeDependingOnTheLatestExistingCandle(symbol: string, interval: Interval): Promise<number> {
        let startTime: number = new Date(2000, 1, 1).getTime();
        const _startTime = await this.candlesRepository.getLatestCandleCloseTime(symbol, interval);
        startTime = _startTime ? _startTime : startTime;

        return startTime;
    }
}