import { Interval } from "src/BLL/Enums/Interval.enum";
import Candle from "src/BLL/Models/Candle.model";
import CreateCandle from "src/BLL/Models/CreateCandle.model";

export default interface ICandleDBRepository {
    storeCandle(candles: CreateCandle[], interval: Interval): Promise<Candle[]>;

    getLatestCandleCloseTime(symbol: string, interval: Interval): Promise<number | null>;

    getPreviousCandle(symbol: string, interval: Interval, closeTime: number): Promise<Candle | null>

    getCandles(symbol: string, interval: Interval, take: number, sortBy: keyof Candle, sortMethod: string): Promise<Candle[] | null>
}