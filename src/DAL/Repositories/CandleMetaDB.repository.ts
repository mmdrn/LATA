import { Injectable } from "@nestjs/common";
import ICandleMetaDBRepository from "src/BLL/Interfaces/DBRepositories/ICandleMetaDBRepository.interface";
import CreateCandleMetaModel from "src/BLL/Models/CreateCandleMeta.model";

@Injectable()
export default class CandleMetaDBRepository implements ICandleMetaDBRepository {
    addCandleMetas(metas: CreateCandleMetaModel[]) {
        throw new Error("Method not implemented.");
    }

}