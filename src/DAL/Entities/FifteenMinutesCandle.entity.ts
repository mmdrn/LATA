import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class FifteenMinutesCandle {
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
}