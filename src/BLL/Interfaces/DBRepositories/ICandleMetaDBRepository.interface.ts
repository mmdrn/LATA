import { Interval } from "src/BLL/Enums/Interval.enum";
import CandleMetaModel from "src/BLL/Models/CandleMeta.model";
import CandleMeta from "src/BLL/Models/CandleMeta.model";

export default interface ICandleMetaDBRepository {
    getCandleMetaByCandleId(id: string, interval: Interval): Promise<CandleMeta | null>;

    storeOrUpdate(candleMetas: CandleMeta[], interval: Interval): Promise<CandleMeta[]>;

    getCorrections(symbol: string, closeTime: number, interval: Interval): Promise<CandleMetaModel[]>;
}