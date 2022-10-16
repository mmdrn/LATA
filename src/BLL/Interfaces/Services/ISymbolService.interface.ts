import CreateSymbol from "src/BLL/Models/CreateSymbol.model";
import ExistSymbol from "src/BLL/Models/ExistSymbol.model";
import Symbol from "src/BLL/Models/Symbol.model";

export default interface ISymbolService {
    fetchAllSymbolsFromRemote(): Promise<Symbol[]>;

    findAllSymbols(quoteAsset: string, status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"): Promise<Symbol[]>;

    insertSymbols(symbols: Symbol[]): Promise<Symbol[]>;

    existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]>;
}