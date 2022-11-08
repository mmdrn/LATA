import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class SymbolMeta {
    @ObjectIdColumn({
        unique: true
    })
    id: ObjectID;

    @Column()
    rsi14PrerequisitesCalculated: Boolean;

    @Column()
    symbolId: string;
}