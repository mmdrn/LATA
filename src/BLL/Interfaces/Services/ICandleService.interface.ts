import { Interval } from "src/BLL/Enums/Interval.enum";
import Candle from "src/BLL/Models/Candle.model";
import CreateCandle from "src/BLL/Models/CreateCandle.model";
import Symbol from "src/BLL/Models/Symbol.model";

export default interface ICandleService {
    calculateStartTimeDependingOnTheLatestExistingCandle(symbol: string, interval: Interval): Promise<number>;

    fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number): Promise<Candle[]>;

    storeCandles(candles: CreateCandle[], interval: Interval): Promise<Candle[]>

    fetchAndStore(symbol: Symbol, interval: Interval): Promise<Candle[] | null>
}