import { Entity, } from "typeorm";
import BaseCandleMeta from "./BaseCandleMeta";

@Entity()
export default class TwoHoursCandleMeta extends BaseCandleMeta { }