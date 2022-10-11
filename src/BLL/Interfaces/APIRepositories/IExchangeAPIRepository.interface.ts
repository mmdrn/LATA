import { Interval } from "src/BLL/Enums/Interval.enum";
import Candle from "src/BLL/Models/Candle.model";
import Symbol from "src/BLL/Models/Symbol.model";

export default interface IExchangeAPIRepository {
    fetchAllSymbols(): Promise<Symbol[]>;

    fetchCandles(symbol: string, interval: Interval, startTime: number, limit: number): Promise<Candle[]>;
}