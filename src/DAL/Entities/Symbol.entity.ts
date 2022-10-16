import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class Symbol {
    @ObjectIdColumn({
        unique: true
    })
    id: ObjectID;

    @Column()
    symbol: string;

    @Column()
    baseAsset: string;

    @Column()
    quoteAsset: string;

    @Column()
    status: string;

    @Column()
    baseAssetPrecision: Number;

    @Column()
    quotePrecision: Number;

    @Column()
    quoteAssetPrecision: Number;

    @Column()
    orderTypes: string[]

    @Column()
    icebergAllowed: Boolean;

    @Column()
    ocoAllowed: Boolean;

    @Column()
    isSpotTradingAllowed: Boolean;

    @Column()
    isMarginTradingAllowed: Boolean;

    @Column()
    permissions: string[];
}