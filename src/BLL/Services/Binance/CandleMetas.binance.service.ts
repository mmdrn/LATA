import { Injectable } from "@nestjs/common";
import { Interval } from "../../../BLL/Enums/Interval.enum";
import CandleMetaModel from "../../../BLL/Models/CandleMeta.model";
import CandleMetaDBRepository from "../../../DAL/Repositories/CandleMetaDB.repository";
import ICandleMetaService from "../../Interfaces/Services/ICandleMetaService.interface";
import Candle from "../../Models/Candle.model";
import CandleService from "../Candle.service";

@Injectable()
export default class Binance_CandleMetaService implements ICandleMetaService {
    constructor(
        private readonly candleMetasRepository: CandleMetaDBRepository,
        private readonly candleService: CandleService
    ) { }
    async getCorrections(symbol: string, closeTime: number): Promise<CandleMetaModel[]> {
        return this.candleMetasRepository.getCorrections(symbol, closeTime);
    }

    async storeOrUpdate(candleMetas: CandleMetaModel[]): Promise<CandleMetaModel[]> {
        return this.candleMetasRepository.storeOrUpdate(candleMetas);
    }

    async getCandleMetaByCandleId(id: string): Promise<CandleMetaModel | null> {
        return this.candleMetasRepository.getCandleMetaByCandleId(id);
    }

    async calculateDifference(candle: Candle, interval: Interval): Promise<number | null> {
        const previousCandle: Candle = await this.candleService.getPreviousCandle(candle.symbol, interval, candle.closeTime);

        if (!previousCandle) return 0

        return candle.closePrice - previousCandle.closePrice;
    }
}