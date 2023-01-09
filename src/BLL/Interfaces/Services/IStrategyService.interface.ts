import { Interval } from "src/BLL/Enums/Interval.enum";

export default interface IStrategyService {
    sma(symbol: string, interval: Interval, length: number): Promise<number | null>;
}