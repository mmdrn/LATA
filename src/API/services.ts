import StrategyService from "../BLL/Services/StrategyService.service";
import Binance_CandleService from "../BLL/Services/Binance/Candle.binance.service";
import Binance_CandleMetaService from "../BLL/Services/Binance/CandleMetas.binance.service";
import Binance_SymbolService from "../BLL/Services/Binance/Symbol.binance.service";
import Binance_SymbolMetaService from "../BLL/Services/Binance/SymbolMeta.binance.service";
import CandleService from "../BLL/Services/Candle.service";
import CandleMetaService from "../BLL/Services/CandleMeta.service";
import SymbolService from "../BLL/Services/Symbol.service";
import SymbolMetaService from "../BLL/Services/SymbolMeta.service";
import Binance_StrategyService from "../BLL/Services/Binance/Strategy.binance.service";

export default [
    // strategy services
    SymbolService,
    SymbolMetaService,
    CandleService,
    CandleMetaService,
    StrategyService,

    // binance services
    Binance_SymbolService,
    Binance_SymbolMetaService,
    Binance_CandleService,
    Binance_CandleMetaService,
    Binance_StrategyService
]