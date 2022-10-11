import CreateSymbol from "src/BLL/Models/CreateSymbol.model";
import Symbol from "src/BLL/Models/Symbol.model";
import SymbolEntity from "../Entities/Symbol.entity";

export function MapCreateSymbolsToSymbolEntities(symbols: CreateSymbol[]): SymbolEntity[] {
    const mappedSymbols: SymbolEntity[] = [];

    for (const symbol of symbols) {
        const _symbol = new SymbolEntity();
        _symbol.baseAsset = symbol.baseAsset;
        _symbol.quoteAsset = symbol.quoteAsset;
        _symbol.symbol = symbol.symbol;

        mappedSymbols.push(_symbol)
    }

    return mappedSymbols;
}

export function MapSymbolEntitiesToSymbols(symbols: SymbolEntity[]) {
    const mappedSymbols: Symbol[] = [];

    for (const symbol of symbols) {
        mappedSymbols.push({
            id: symbol.id.toString(),
            baseAsset: symbol.baseAsset,
            quoteAsset: symbol.quoteAsset,
            symbol: symbol.symbol
        })
    }

    return mappedSymbols;
}