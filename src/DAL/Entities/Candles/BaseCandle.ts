import { Column, ObjectID, ObjectIdColumn } from "typeorm";

export default class BaseCandle {
    @ObjectIdColumn({
        unique: true
    })
    id: ObjectID;

    @Column()
    symbol: string;

    @Column()
    openTime: number;

    @Column()
    openPrice: number;

    @Column()
    highPrice: number;

    @Column()
    lowPrice: number;

    @Column()
    closePrice: number;

    @Column()
    volume: number;

    @Column()
    closeTime: number;

    @Column()
    quoteAssetVolume: number;

    @Column()
    numberOfTrades: number;

    @Column()
    takerBuyBaseAssetVolume: number;

    @Column()
    takerBuyQuoteAssetVolume: number;

    @Column()
    usedField: number;

    @Column()
    direction: "asc" | "desc";
}