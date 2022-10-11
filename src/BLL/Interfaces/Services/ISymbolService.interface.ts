import CreateSymbol from "src/BLL/Models/CreateSymbol.model";
import ExistSymbol from "src/BLL/Models/ExistSymbol.model";
import Symbol from "src/BLL/Models/Symbol.model";

export default interface ISymbolService {
    fetchAllSymbolsFromRemote(): Promise<Symbol[]>;

    findAllSymbols(quoteAsset: string): Promise<Symbol[]>;

    insertSymbols(symbols: Symbol[]): Promise<Symbol[]>;

    existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]>;
}