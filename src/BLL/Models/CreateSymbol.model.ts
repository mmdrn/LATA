export default class CreateSymbol {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    status: string;
    baseAssetPrecision: Number;
    quotePrecision: Number;
    quoteAssetPrecision: Number;
    orderTypes: string[]
    icebergAllowed: Boolean;
    ocoAllowed: Boolean;
    isSpotTradingAllowed: Boolean;
    isMarginTradingAllowed: Boolean;
    permissions: string[];
}