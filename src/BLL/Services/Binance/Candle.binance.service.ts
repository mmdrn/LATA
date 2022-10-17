import { Injectable, Logger } from "@nestjs/common";
import { MapCandlesToCreateCandles } from "src/BLL/Mappers/Candle.mapper";
import Candle from "src/BLL/Models/Candle.model";
import CreateCandle from "src/BLL/Models/CreateCandle.model";
import Symbol from "src/BLL/Models/Symbol.model";
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

    private readonly logger = new Logger(Binance_CandleService.name);

    async getCandles(symbol: string, interval: Interval, take: number, sortBy: keyof Candle = "closeTime", sortMethod: "ASC" | "DESC"): Promise<Candle[]> {
        return await this.candlesRepository.getCandles(symbol, interval, take, sortBy, sortMethod);
    }

    async getPreviousCandle(symbol: string, interval: Interval, closeTime: number): Promise<Candle> {
        return await this.candlesRepository.getPreviousCandle(symbol, interval, closeTime);
    }

    async fetchAndStore(symbol: Symbol, interval: Interval): Promise<Candle[]> {
        this.logger.log(`fetching candles. symbol: ${symbol.symbol}, interval: ${interval}`);
        let addedCandleCount: number = 0;
        let fetchedCandles: Candle[];
        let storedCandles: Candle[];
        let startTime: number;
        let mappedCandles: CreateCandle[];

        startTime = await this.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, interval);
        fetchedCandles = await this.fetchCandles(symbol.symbol, interval, startTime, 1000);
        this.logger.log(`fetched candles report. symbol: ${symbol.symbol}, interval: ${interval}, count: ${fetchedCandles.length}`);

        if (fetchedCandles.length < 1) return null;

        mappedCandles = MapCandlesToCreateCandles(fetchedCandles);
        storedCandles = await this.storeCandles(mappedCandles, interval);
        addedCandleCount += storedCandles.length;

        while (fetchedCandles.length === 1000) {
            startTime = await this.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, interval);
            fetchedCandles = await this.fetchCandles(symbol.symbol, interval, startTime, 1000);
            this.logger.log(`fetched candles report. symbol: ${symbol.symbol}, interval: ${interval}, count: ${fetchedCandles.length}`);
            mappedCandles = MapCandlesToCreateCandles(fetchedCandles);
            storedCandles = storedCandles.concat(await this.storeCandles(mappedCandles, interval));
            addedCandleCount += storedCandles.length;
        }

        this.logger.log(`finished storing candle. symbol: ${symbol.symbol}, interval: ${interval}, count: ${addedCandleCount}`);

        return storedCandles;
    }

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