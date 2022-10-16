import { Controller, Post } from "@nestjs/common";
import { Exchanges } from "../../BLL/Enums/Exchanges.enum";
import SymbolService from "../../BLL/Services/Symbol.service";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import CandleService from "../../BLL/Services/Candle.service";

@Controller("littleshit")
export class LittleShitController {
    constructor(
        private readonly symbolService: SymbolService,
        private readonly candleService: CandleService,
        @InjectQueue("FourHoursCandle") private readonly fourHoursCandleQueue: Queue
    ) { }

    @Post("shit")
    async ZeroFly(): Promise<any> {
        this.symbolService.setExchange(Exchanges.Binance);
        this.candleService.setExchange(Exchanges.Binance);

        const symbols = await this.symbolService.findAllSymbols(undefined, "TRADING");
        await this.fourHoursCandleQueue.pause();
        await this.fourHoursCandleQueue.empty();
        for (const symbol of symbols) {
            await this.fourHoursCandleQueue.add("default_queue", {
                symbol: symbol,
            })
        }
        await this.fourHoursCandleQueue.resume();
    }

    @Post("clearqueue")
    async ClearQueue(): Promise<any> {
        const result = await this.fourHoursCandleQueue.empty()
        return result
    }

    @Post("pausequeue")
    async PauseQueue(): Promise<any> {
        const result = await this.fourHoursCandleQueue.pause()
        return result
    }

    @Post("startqueue")
    async StartQueue(): Promise<any> {
        const result = await this.fourHoursCandleQueue.resume()
        return result
    }
}