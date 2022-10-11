import { Injectable } from "@nestjs/common";
import ICandleMetaService from "../../Interfaces/Services/ICandleMetaService.interface";
import Candle from "../../Models/Candle.model";

@Injectable()
export default class Binance_CandleMetaService implements ICandleMetaService {
    calculateDifference(candle: Candle, previousCandle: Candle): number {
        return candle.closePrice - previousCandle.closePrice;
    }

    calculateRSI(candle: Candle): Promise<any> {
        throw new Error("Method not implemented.");
    }
}