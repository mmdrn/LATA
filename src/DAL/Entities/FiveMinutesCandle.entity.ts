import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import Candle from "./Classes/Candle";

@Entity()
export default class FiveMinutesCandle {
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