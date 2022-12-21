import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class SixHoursCandleMeta {
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