import { Injectable } from "@nestjs/common";
import { Exchanges } from "../Enums/Exchanges.enum";
import { EnumHelper } from "../Helpers/EnumHelper.helper";
import ISymbolMetaService from "../Interfaces/Services/ISymbolMetaService.interface";
import SymbolMetaModel from "../Models/SymbolMeta.model";
import Binance_SymbolMetaService from "./Binance/SymbolMeta.binance.service";

@Injectable()
export default class SymbolMetaService implements ISymbolMetaService {
    private exchange: number = null;
    constructor(
        private readonly binanceSymbolMetaService: Binance_SymbolMetaService,
    ) { }

    async getSymbolMetaBySymbolId(id: string): Promise<SymbolMetaModel | null> {
        return this._getInstance().getSymbolMetaBySymbolId(id)
    }

    async storeOrUpdate(symbolMetas: SymbolMetaModel[]): Promise<SymbolMetaModel[]> {
        return this._getInstance().storeOrUpdate(symbolMetas)
    }

    private _getInstance(): ISymbolMetaService {
        switch (this.exchange) {
            case Exchanges.Binance:
                return this.binanceSymbolMetaService;
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