import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import BaseCandle from "./BaseCandle";

@Entity()
export default class ThreeMinutesCandle extends BaseCandle { }