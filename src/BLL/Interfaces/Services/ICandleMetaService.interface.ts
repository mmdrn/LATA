import { Interval } from "src/BLL/Enums/Interval.enum";
import CandleMeta from "src/BLL/Models/CandleMeta.model";
import Candle from "../../Models/Candle.model";

export default interface ICandleMetaService {
    calculateDifference(candle: Candle, interval: Interval): Promise<number | null>;

    getCandleMetaByCandleId(id: string): Promise<CandleMeta | null>;

    storeOrUpdate(candleMetas: CandleMeta[]): Promise<CandleMeta[]>;
}