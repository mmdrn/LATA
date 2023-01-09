import { Injectable } from "@nestjs/common";
import { Exchanges } from "../Enums/Exchanges.enum";
import { Interval } from "../Enums/Interval.enum";
import { EnumHelper } from "../Helpers/EnumHelper.helper";
import ICandleService from "../Interfaces/Services/ICandleService.interface";
import IStrategyService from "../Interfaces/Services/IStrategyService.interface";
import Binance_StrategyService from "./Binance/Strategy.binance.service";

@Injectable()
export default class StrategyService implements IStrategyService {
    private exchange: number = null;
    constructor(
        private readonly binanceStrategyService: Binance_StrategyService,
    ) { }

    async sma(symbol: string, interval: Interval, length: number): Promise<number | null> {
        return this._getInstance().sma(symbol, interval, length)
    }

    private _getInstance(): IStrategyService {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceStrategyService;
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