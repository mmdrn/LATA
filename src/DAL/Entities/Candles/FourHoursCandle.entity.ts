import { Entity, } from "typeorm";
import BaseCandle from "./BaseCandle";

@Entity()
export default class FourHoursCandle extends BaseCandle { }