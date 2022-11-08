import SymbolMeta from "src/BLL/Models/SymbolMeta.model";

export default interface ISymbolMetaService {
    getSymbolMetaBySymbolId(id: string): Promise<SymbolMeta | null>;

    storeOrUpdate(symbolMetas: SymbolMeta[]): Promise<SymbolMeta[]>;
}