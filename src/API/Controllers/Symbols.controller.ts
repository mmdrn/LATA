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
        @InjectQueue("OneMinuteCandle_Fetches") private readonly oneMinuteCandleFetchQueue: Queue,
        @InjectQueue("ThreeMinutesCandle_Fetches") private readonly threeMinutesCandleFetchQueue: Queue,
        @InjectQueue("FiveMinutesCandle_Fetches") private readonly fiveMinutesCandleFetchQueue: Queue,
        @InjectQueue("FifteenMinutesCandle_Fetches") private readonly fifteenMinutesCandleFetchQueue: Queue,
        @InjectQueue("ThirtyMinutesCandle_Fetches") private readonly thirtyMinutesCandleFetchQueue: Queue,
        @InjectQueue("OneHourCandle_Fetches") private readonly oneHourCandleFetchQueue: Queue,
        @InjectQueue("TwoHoursCandle_Fetches") private readonly twoHoursCandleFetchQueue: Queue,
        @InjectQueue("FourHoursCandle_Fetches") private readonly fourHoursCandleFetchQueue: Queue,
        @InjectQueue("SixHoursCandle_Fetches") private readonly sixHoursCandleFetchQueue: Queue,
        @InjectQueue("EightHoursCandle_Fetches") private readonly eightHoursCandleFetchQueue: Queue,
        @InjectQueue("TwelveHoursCandle_Fetches") private readonly twelveHoursCandleFetchQueue: Queue,
        @InjectQueue("OneDayCandle_Fetches") private readonly oneDayCandleFetchQueue: Queue,
        @InjectQueue("ThreeDaysCandle_Fetches") private readonly threeDaysCandleFetchQueue: Queue,
        @InjectQueue("OneWeekCandle_Fetches") private readonly oneWeekCandleFetchQueue: Queue,
        @InjectQueue("OneMonthCandle_Fetches") private readonly oneMonthCandleFetchQueue: Queue,
    ) { }

    //TODO: handle update existing symbols.
    @Get("update")
    async updateSymbolsList(@Query("exchange") _exchange: string): Promise<APIResponse> {
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

        try {
            const insertedSymbols = await this.symbolService.insertSymbols(symbols);

            return {
                success: true,
                message: "symbols successfully updated.",
                data: {
                    new: {
                        count: insertedSymbols.length,
                        items: insertedSymbols.map(s => {
                            return {
                                "id": s.id,
                                "symbol": s.symbol,
                                "baseAsset": s.baseAsset,
                                "quoteAsset": s.quoteAsset,
                            }
                        })
                    }
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

    @Get("get")
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

    @Get("fetchCandles")
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
            case Interval.OneMinute: {
                for (const symbol of symbols) {
                    await this.oneMinuteCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.ThreeMinutes: {
                for (const symbol of symbols) {
                    await this.threeMinutesCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.FiveMinutes: {
                for (const symbol of symbols) {
                    await this.fiveMinutesCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.FifteenMinutes: {
                for (const symbol of symbols) {
                    await this.fifteenMinutesCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.ThirtyMinutes: {
                for (const symbol of symbols) {
                    await this.thirtyMinutesCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.OneHour: {
                for (const symbol of symbols) {
                    await this.oneHourCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.TwoHour: {
                for (const symbol of symbols) {
                    await this.twoHoursCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.FourHour: {
                for (const symbol of symbols) {
                    await this.fourHoursCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.SixHour: {
                for (const symbol of symbols) {
                    await this.sixHoursCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.EightHour: {
                for (const symbol of symbols) {
                    await this.eightHoursCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.TwelveHour: {
                for (const symbol of symbols) {
                    await this.twelveHoursCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.OneDay: {
                for (const symbol of symbols) {
                    await this.oneDayCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.ThreeDay: {
                for (const symbol of symbols) {
                    await this.threeDaysCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.OneWeek: {
                for (const symbol of symbols) {
                    await this.oneWeekCandleFetchQueue.add("default_queue", {
                        symbol: symbol,
                    })
                }
                break;
            }
            case Interval.OneMonth: {
                for (const symbol of symbols) {
                    await this.oneMonthCandleFetchQueue.add("default_queue", {
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
}