import { Controller, Get, Query } from "@nestjs/common";
import { Exchanges } from "../../BLL/Enums/Exchanges.enum";
import { Interval } from "../..//BLL/Enums/Interval.enum";
import { EnumHelper } from "../../BLL/Helpers/EnumHelper.helper";
import CandleMetaService from "../../BLL/Services/CandleMeta.service";
import SymbolService from "../../BLL/Services/Symbol.service";
import { APIResponse } from "../Models/APIResponse.model";
import CandleMeta from "src/BLL/Models/CandleMeta.model";

@Controller("strategies")
export class StrategiesController {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleMetaService: CandleMetaService,
    ) { }

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
                closeTime.setDate(closeTime.getDate() - 30);

                const promises: Promise<CandleMeta[]>[] = [];
                for (const symbol of symbols) {
                    promises.push(this.candleMetaService.getCorrections(symbol.symbol, closeTime.getTime()));
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
                    promises.push(this.candleMetaService.getCorrections(symbol.symbol, closeTime.getTime()));
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