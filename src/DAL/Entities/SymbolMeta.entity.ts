import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export default class SymbolMeta {
    @ObjectIdColumn({
        unique: true
    })
    id: ObjectID;

    @Column()
    t1mRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t3mRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t5mRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t15mRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t30mRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t1hRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t2hRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t4hRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t6hRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t8hRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t12hRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t1dRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t3dRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t1wRsi14PrerequisitesCalculated: Boolean;

    @Column()
    t1MRsi14PrerequisitesCalculated: Boolean;

    @Column()
    symbolId: string;
}