import { Entity } from "typeorm";
import BaseCandleMeta from "./BaseCandleMeta";

@Entity()
export default class FiveMinutesCandleMeta extends BaseCandleMeta { }