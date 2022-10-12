import { Controller, Post } from "@nestjs/common";
import { Exchanges } from "../../BLL/Enums/Exchanges.enum";
import SymbolService from "../../BLL/Services/Symbol.service";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import CandleService from "../../BLL/Services/Candle.service";
import { Interval } from "../../BLL/Enums/Interval.enum";

@Controller("onthefly")
export class OnTheFlyController {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
        @InjectQueue("fetch-candles-queue") private readonly fetchCandlesQueue: Queue
    ) { }

    @Post("zerofly")
    async ZeroFly(): Promise<any> {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);

        const symbols = await this.symbolService.findAllSymbols(undefined);

        for (const symbol of symbols) {
            this.fetchCandlesQueue.add(Interval.FourHour.toString(), {
                symbol: symbol,
            })
        }
    }

    @Post("clearqueue")
    async ClearQueue(): Promise<any> {
        const result = await this.fetchCandlesQueue.empty()
        return result
    }

    @Post("pausequeue")
    async PauseQueue(): Promise<any> {
        const result = await this.fetchCandlesQueue.pause()
        return result
    }

    @Post("startqueue")
    async StartQueue(): Promise<any> {
        const result = await this.fetchCandlesQueue.resume()
        return result
    }
}