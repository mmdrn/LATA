import { Controller, Get, Post, Query } from "@nestjs/common";
import { Exchanges } from "../../BLL/Enums/Exchanges.enum";
import { EnumHelper } from "../../BLL/Helpers/EnumHelper.helper";
import { APIResponse } from "../Models/APIResponse.model";
import SymbolService from "../../BLL/Services/Symbol.service";
import ExistSymbol from "src/BLL/Models/ExistSymbol.model";
import Symbol from "src/BLL/Models/Symbol.model";

@Controller("symbols")
export class SymbolsController {
    constructor(private readonly symbolService: SymbolService) { }

    @Post("update-symbols-list")
    async updateSymbolsList(@Query("exchange") _exchange: string, @Query("quoteAsset") quoteAsset: string): Promise<APIResponse> {
        let exchange: number = null;
        {
            try {
                exchange = parseInt(_exchange);
                const enumHelper = new EnumHelper();
                if (!enumHelper.hasValue(exchange, Exchanges)) {
                    return {
                        success: false,
                        message: "this is an invalid exchange!!",
                        data: {
                            exchange
                        }
                    }
                }
            } catch (error) {
                return {
                    success: false,
                    message: "this is an invalid exchange!!",
                    data: {
                        exchange
                    }
                }
            }
        }

        this.symbolService.setExchange(exchange);
        const symbols = await this.symbolService.fetchAllSymbolsFromRemote();

        // technical debt: must avoid to insert duplicate symbols.
        // technical debt: must avoid to insert duplicate symbols.
        // technical debt: must avoid to insert duplicate symbols.
        // const existSymbolsQuery: ExistSymbol[] = [];
        // for (const symbol of symbols) {
        //     existSymbolsQuery.push({
        //         exist: null,
        //         field: "symbol",
        //         value: symbol.symbol,
        //         operator: "$eq"
        //     })
        // }
        // const existSymbolsResult: ExistSymbol[] = await this.symbolService.existSymbols(existSymbolsQuery);
        // const duplicateSymbols: Symbol[] = [];
        // for (const symbol of existSymbolsResult.filter(s => s.exist)) {
        //     const index = symbols.findIndex(s => s.symbol === symbol.value);
        //     if (index > -1) {
        //         duplicateSymbols.push(symbols[index]);
        //         symbols.splice(index, 1);
        //     }
        // }

        try {
            const insertedSymbols = await this.symbolService.insertSymbols(symbols);

            return {
                success: true,
                message: "symbols successfully updated.",
                data: {
                    // duplicates: duplicateSymbols,
                    newSymbols: insertedSymbols
                }
            }
        } catch (error) {
            return {
                success: false,
                message: "can't insert symbols.",
                data: null
            }
        }
    }

    @Get("get-all-symbols")
    async getAllSymbols(@Query("exchange") _exchange: string, @Query("quoteAsset") quoteAsset: string): Promise<APIResponse> {
        let exchange: number = null;
        {
            try {
                exchange = parseInt(_exchange);
                const enumHelper = new EnumHelper();
                if (!enumHelper.hasValue(exchange, Exchanges)) {
                    return {
                        success: false,
                        message: "this is an invalid exchange!!",
                        data: {
                            exchange
                        }
                    }
                }
            } catch (error) {
                return {
                    success: false,
                    message: "this is an invalid exchange!!",
                    data: {
                        exchange
                    }
                }
            }
        }

        if (!this.symbolService.setExchange(exchange)) {
            return {
                success: false,
                message: "internal server error.",
            }
        }

        const symbols = await this.symbolService.findAllSymbols(quoteAsset);

        return {
            success: true,
            message: "here is the list of symbols.",
            data: {
                count: symbols.length,
                list: symbols
            }
        }

    }
}