import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class CandleMeta {
    @ObjectIdColumn({
        unique: true
    })
    id: ObjectID;

    @Column()
    rsi: number;

    @Column()
    difference: number;
}