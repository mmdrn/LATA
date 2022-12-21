import CandleMetaModel from "src/BLL/Models/CandleMeta.model";
import CandleMeta from "src/BLL/Models/CandleMeta.model";

export default interface ICandleMetaDBRepository {
    getCandleMetaByCandleId(id: string): Promise<CandleMeta | null>;

    storeOrUpdate(candleMetas: CandleMeta[]): Promise<CandleMeta[]>;

    getCorrections(symbol: string, closeTime: number): Promise<CandleMetaModel[]>;
}