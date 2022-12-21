import { Entity } from "typeorm";
import BaseCandle from "./BaseCandle";

@Entity()
export default class FiveMinutesCandle extends BaseCandle { }