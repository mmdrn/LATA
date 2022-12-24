import Binance_ExchangeAPIRepository from "../BLL/APIRepositories/Binance/ExchangeAPI.binance.repository";
import ExchangeAPIRepository from "../BLL/APIRepositories/ExchangeAPI.repository";
import CandleDBRepository from "../DAL/Repositories/CandleDB.repository";
import CandleMetaDBRepository from "../DAL/Repositories/CandleMetaDB.repository";
import SymbolDBRepository from "../DAL/Repositories/SymbolDB.repository";
import SymbolMetaDBRepository from "../DAL/Repositories/SymbolMetaDB.repository";

export default [
    // db repositories
    SymbolDBRepository,
    SymbolMetaDBRepository,
    CandleDBRepository,
    CandleMetaDBRepository,

    // strategy api repositories
    ExchangeAPIRepository,

    // binance api repositories
    Binance_ExchangeAPIRepository,
]