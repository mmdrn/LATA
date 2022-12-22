import Binance_CandleService from "src/BLL/Services/Binance/Candle.binance.service";
import Binance_CandleMetaService from "src/BLL/Services/Binance/CandleMetas.binance.service";
import Binance_SymbolService from "src/BLL/Services/Binance/Symbol.binance.service";
import Binance_SymbolMetaService from "src/BLL/Services/Binance/SymbolMeta.binance.service";
import CandleService from "src/BLL/Services/Candle.service";
import CandleMetaService from "src/BLL/Services/CandleMeta.service";
import SymbolService from "src/BLL/Services/Symbol.service";
import SymbolMetaService from "src/BLL/Services/SymbolMeta.service";

export default [
    // strategy services
    SymbolService,
    SymbolMetaService,
    CandleService,
    CandleMetaService,

    // binance services
    Binance_SymbolService,
    Binance_SymbolMetaService,
    Binance_CandleService,
    Binance_CandleMetaService,
]