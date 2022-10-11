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
}