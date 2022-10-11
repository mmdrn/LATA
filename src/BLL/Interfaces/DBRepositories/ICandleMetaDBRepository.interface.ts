import CreateCandleMeta from "src/BLL/Models/CreateCandleMeta.model";

export default interface ICandleMetaDBRepository {
    addCandleMetas(metas: CreateCandleMeta[])
}