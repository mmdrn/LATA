import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Exchanges } from "../../BLL/Enums/Exchanges.enum";
import { Interval } from "../../BLL/Enums/Interval.enum";
import { Strategies } from "../../BLL/Enums/Strategies.enum";
import { EnumHelper } from "../../BLL/Helpers/EnumHelper.helper";
import CandleMetaService from "../../BLL/Services/CandleMeta.service";
import SymbolService from "../../BLL/Services/Symbol.service";
import { APIResponse } from "../Models/APIResponse.model";
import CandleMeta from "../../BLL/Models/CandleMeta.model";
import StrategyService from "../../BLL/Services/StrategyService.service";
import { resolve } from "path";

@Controller("Strategies")
export class StrategiesController {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleMetaService: CandleMetaService,
        private readonly strategyService: StrategyService,
    ) { }

    @Get("list")
    async StrategiesList(
    ): Promise<APIResponse> {
        const strategies = {};
        for (const strg of Object.values(Strategies)
            .filter((value) => typeof value === "string")) {
            strategies[strg] = Strategies[strg]
        }

        return {
            message: "here is the list of strategies.",
            success: true,
            data: strategies
        }
    }

    @Post("findSymbols")
    async FindSymbols(
        @Query("exchange") _exchange: string,
        @Query("quoteAsset") quoteAsset: string,
        @Query("status") status: "" | "PRE_TRADING" | "TRADING" | "POST_TRADING" | "END_OF_DAY" | "HALT" | "AUCTION_MATCH" | "BREAK",
        @Body("strategies") _strategies: string // 55001,55002...
    ): Promise<APIResponse> {
        // exchange validation
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

        // strategies validation
        let strategies: number[] = [];
        if (Object.keys(_strategies).length === 0) {
            return {
                success: false,
                message: "there are no strategies entered!!",
                data: {
                    strategies: _strategies
                }
            }
        } else {
            try {
                const enumHelper = new EnumHelper();
                for (const st of Object.keys(_strategies)) {
                    if (!enumHelper.hasValue(parseInt(st), Strategies)) {
                        return {
                            success: false,
                            message: "invalid strategy!!",
                            data: {
                                strategy: st
                            }
                        }
                    }
                    strategies.push(parseInt(st))
                }
            } catch (error) {
                return {
                    success: false,
                    message: "invalid strategies!!",
                    data: {
                        strategies: _strategies
                    }
                }
            }
        }

        const symbols = await this.symbolService.findAllSymbols(quoteAsset, status);
        if (!this.strategyService.setExchange(exchange)) {
            return {
                success: false,
                message: "internal server error.",
            }
        }

        const result = {};
        const promises: Promise<any>[] = []
        for (const symbol of symbols) {
            result[symbol.symbol] = {
                strategies: {}
            }

            for (const st of strategies) {
                switch (st) {
                    case Strategies.SMA:
                        const promise = new Promise(async (resolve) => {
                            const value = await this.strategyService.sma(
                                symbol.symbol,
                                _strategies[st]["interval"],
                                _strategies[st]["length"]
                            );

                            resolve({
                                symbol: symbol.symbol,
                                strategy: st,
                                value
                            });
                        });
                        promises.push(promise);
                        break;

                    default:
                        break;
                }
            }
        }

        await Promise.all(promises).then((values) => {
            for (const item of values) {
                result[item.symbol].strategies[item.strategy] = item.value
            }
        })

        return {
            message: "",
            success: true,
            data: {
                count: symbols.length,
                symbols: result
            }
        }
    }



    @Get("strg01")
    async strg01(
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

        const results: any = {};
        switch (interval) {
            case Interval.FourHour: {
                const closeTime = new Date();
                closeTime.setDate(closeTime.getDate() - 80);

                const promises: Promise<CandleMeta[]>[] = [];
                for (const symbol of symbols) {
                    promises.push(this.candleMetaService.getCorrections(symbol.symbol, closeTime.getTime(), interval));
                }

                await Promise.all(promises).then(values => {
                    for (const value of values) {
                        if (value.length > 0) {
                            results[value[0].symbol] = value.map(i => {
                                return {
                                    date: new Date(i.closeTime),
                                    symbol: i.symbol
                                }
                            });
                        }
                    }
                })
                break;
            }
            case Interval.OneDay: {
                const closeTime = new Date();
                closeTime.setDate(closeTime.getDate() - 30);

                const promises: Promise<CandleMeta[]>[] = [];
                for (const symbol of symbols) {
                    promises.push(this.candleMetaService.getCorrections(symbol.symbol, closeTime.getTime(), interval));
                }

                await Promise.all(promises).then(values => {
                    for (const value of values) {
                        if (value.length > 0) {
                            results[value[0].symbol] = value.map(i => {
                                return {
                                    date: new Date(i.closeTime),
                                    symbol: i.symbol
                                }
                            });
                        }
                    }
                })
                break;
            }
        }

        return {
            success: true,
            message: "I'm really fucked up bro...",
            data: results
        }
    }
}