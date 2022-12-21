import { Column, ObjectID, ObjectIdColumn } from "typeorm";

export default class BaseCandleMeta {
    @ObjectIdColumn({
        unique: true
    })
    id: ObjectID;

    @Column()
    candleId: string;

    @Column()
    difference: number;

    @Column()
    rsi14: number;

    @Column()
    previous14Gains: number;

    @Column()
    previous14Losses: number;

    @Column()
    isImpulse: boolean;

    @Column()
    isCorrection: boolean;

    @Column()
    openPrice: number;

    @Column()
    openTime: number;

    @Column()
    closePrice: number;

    @Column()
    closeTime: number;

    @Column()
    symbol: string;
}