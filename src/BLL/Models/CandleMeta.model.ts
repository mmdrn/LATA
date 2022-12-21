export default class CandleMeta {
    id: string;
    candleId: string;
    difference: number;
    rsi14: number;
    previous14Gains: number;
    previous14Losses: number;
    isImpulse: boolean;
    isCorrection: boolean;
    symbol: string;
    openPrice: number;
    openTime: number;
    closePrice: number;
    closeTime: number;
}