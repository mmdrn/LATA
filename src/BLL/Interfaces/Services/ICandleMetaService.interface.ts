import Candle from "../../Models/Candle.model";

export default interface ICandleMetaService {
    calculateDifference(candle: Candle, previousCandle: Candle): number;
    
    calculateRSI(candle: Candle): Promise<any>;
}