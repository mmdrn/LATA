import CreateSymbol from "src/BLL/Models/CreateSymbol.model";
import ExistSymbol from "src/BLL/Models/ExistSymbol.model";
import Symbol from "src/BLL/Models/Symbol.model";

export default interface ISymbolDBRepository {
    findAllSymbols(quoteAsset: string, status: "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"): Promise<Symbol[]>;

    insertSymbols(symbols: CreateSymbol[]): Promise<Symbol[]>;

    existSymbols(query: ExistSymbol[]): Promise<ExistSymbol[]>;

    getSymbolBySymbol(symbol: string): Promise<Symbol | null>;
}