import { Injectable } from "@nestjs/common";
import { Exchanges } from "../Enums/Exchanges.enum";
import { Interval } from "../Enums/Interval.enum";
import { EnumHelper } from "../Helpers/EnumHelper.helper";
import ICandleMetaService from "../Interfaces/Services/ICandleMetaService.interface";
import CandleModel from "../Models/Candle.model";
import CandleMetaModel from "../Models/CandleMeta.model";
import Binance_CandleMetaService from "./Binance/CandleMetas.binance.service";

@Injectable()
export default class CandleMetaService implements ICandleMetaService {
    private exchange: number = null;
    constructor(
        private readonly binanceCandleMetaService: Binance_CandleMetaService,
    ) { }

    async storeOrUpdate(candleMetas: CandleMetaModel[]): Promise<CandleMetaModel[]> {
        return this._getInstance().storeOrUpdate(candleMetas)
    }

    async getCandleMetaByCandleId(id: string): Promise<CandleMetaModel | null> {
        return this._getInstance().getCandleMetaByCandleId(id);
    }

    async calculateDifference(candle: CandleModel, interval: Interval): Promise<number | null> {
        return this._getInstance().calculateDifference(candle, interval)
    }

    private _getInstance(): ICandleMetaService {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceCandleMetaService;
            case Exchanges.KuCoin:
                throw new Error("method not implemented.");
        }
    }

    setExchange(exchange: number): Boolean {
        const enumHelper = new EnumHelper();
        if (!enumHelper.hasValue(exchange, Exchanges)) throw new Error(`invalid exchange: ${exchange}`);

        this.exchange = exchange;
        return true;
    }
}