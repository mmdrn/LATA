import { Injectable } from "@nestjs/common";
import ICandleMetaService from "../Interfaces/Services/ICandleMetaService.interface";
import CandleModel from "../Models/Candle.model";

@Injectable()
export default class CandleMetaService implements ICandleMetaService {
    calculateDifference(candle: CandleModel, previousCandle: CandleModel): number {
        throw new Error("Method not implemented.");
    }
    calculateRSI(candle: CandleModel): Promise<any> {
        throw new Error("Method not implemented.");
    }

}