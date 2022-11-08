import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class CandleMeta {
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
}