import { Entity } from "typeorm";
import BaseCandle from "./BaseCandle";

@Entity()
export default class FifteenMinutesCandle extends BaseCandle { }