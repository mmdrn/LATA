import { Controller, Get, Query } from "@nestjs/common";
import { Exchanges } from "../../BLL/Enums/Exchanges.enum";
import { EnumHelper } from "../../BLL/Helpers/EnumHelper.helper";
import { APIResponse } from "../Models/APIResponse.model";
import SymbolService from "../../BLL/Services/Symbol.service";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { Interval } from "../../BLL/Enums/Interval.enum";

@Controller("symbols")
export class SymbolsController {
    constructor(
        private readonly symbolService: SymbolService,
        @InjectQueue("OneMinuteCandle_Preprocessings") private readonly oneMinuteCandlePreprocessingsQueue: Queue,
        @InjectQueue("ThreeMinutesCandle_Preprocessings") private readonly threeMinutesCandlePreprocessingsQueue: Queue,
        @InjectQueue("FiveMinutesCandle_Preprocessings") private readonly fiveMinutesCandlePreprocessingsQueue: Queue,
        @InjectQueue("FifteenMinutesCandle_Preprocessings") private readonly fifteenMinutesCandlePreprocessingsQueue: Queue,
        @InjectQueue("ThirtyMinutesCandle_Preprocessings") private readonly thirtyMinutesCandlePreprocessingsQueue: Queue,
        @InjectQueue("OneHourCandle_Preprocessings") private readonly oneHourCandlePreprocessingsQueue: Queue,
        @InjectQueue("TwoHoursCandle_Preprocessings") private readonly twoHoursCandlePreprocessingsQueue: Queue,
        @InjectQueue("FourHoursCandle_Preprocessings") private readonly fourHoursCandlePreprocessingsQueue: Queue,
        @InjectQueue("FourHoursCandle_Fetches") private readonly fourHoursCandleFetchQueue: Queue,
        @InjectQueue("SixHoursCandle_Preprocessings") private readonly sixHoursCandlePreprocessingsQueue: Queue,
        @InjectQueue("EightHoursCandle_Preprocessings") private readonly eightHoursCandlePreprocessingsQueue: Queue,
        @InjectQueue("TwelveHoursCandle_Preprocessings") private readonly twelveHoursCandlePreprocessingsQueue: Queue,
        @InjectQueue("OneDayCandle_Preprocessings") private readonly oneDayCandlePreprocessingsQueue: Queue,
        @InjectQueue("ThreeDaysCandle_Preprocessings") private readonly threeDaysCandlePreprocessingsQueue: Queue,
        @InjectQueue("OneWeekCandle_Preprocessings") private readonly oneWeekCandlePreprocessingsQueue: Queue,
        @InjectQueue("OneMonthCandle_Preprocessings") private readonly oneMonthCandlePreprocessingsQueue: Queue,
    ) { }

    @Get("update-list")
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

    @Get("get-list")
    async getAllSymbols(
        @Query("exchange") _exchange: string,
        @Query("quoteAsset") quoteAsset: string,
        @Query("status") status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"
    ): Promise<APIResponse> {
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

        const symbols = await this.symbolService.findAllSymbols(quoteAsset, status);

        return {
            success: true,
            message: "here is the list of symbols.",
            data: {
                count: symbols.length,
                list: symbols
            }
        }
    }

    /**
     * will manually add symbols to the targeted interval queue, for fetching their candles.
     */
    @Get("manual-fetch")
    async manualFetch(
        @Query("exchange") _exchange: string,
        @Query("quoteAsset") quoteAsset: string,
        @Query("status") status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK",
        @Query("interval") _interval: string
    ): Promise<APIResponse> {
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

        let interval: number = null;
        {
            try {
                interval = parseInt(_interval);
                const enumHelper = new EnumHelper();
                if (!enumHelper.hasValue(interval, Interval)) {
                    return {
                        success: false,
                        message: "this is an invalid interval!!",
                        data: {
                            interval
                        }
                    }
                }
            } catch (error) {
                return {
                    success: false,
                    message: "this is an invalid interval!!",
                    data: {
                        interval
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

        const symbols = await this.symbolService.findAllSymbols(quoteAsset, status);

        switch (interval) {
            case Interval.FourHour: {
                for (const symbol of symbols) {
                    await this.fourHoursCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
        }

        return {
            success: true,
            message: "added.",
        }
    }

    @Get("preprocessings")
    async preprocessings(
        @Query("exchange") _exchange: string,
        @Query("quoteAsset") quoteAsset: string,
        @Query("status") status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK"
    ): Promise<APIResponse> {
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

        const symbols = await this.symbolService.findAllSymbols(quoteAsset, status);

        for (const symbol of [symbols[0]]) {
            const promises = []

            promises.push(this.oneMinuteCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.threeMinutesCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.fiveMinutesCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.fifteenMinutesCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.thirtyMinutesCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.oneHourCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.twoHoursCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.fourHoursCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.sixHoursCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.eightHoursCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.twelveHoursCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.oneDayCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.threeDaysCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.oneWeekCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))
            promises.push(this.oneMonthCandlePreprocessingsQueue.add("default_queue", { symbol: symbol }))

            await Promise.all(promises);
        }

        return {
            message: "",
            success: true
        }
    }
}