import Binance_ExchangeAPIRepository from "src/BLL/APIRepositories/Binance/ExchangeAPI.binance.repository";
import ExchangeAPIRepository from "src/BLL/APIRepositories/ExchangeAPI.repository";
import CandleDBRepository from "src/DAL/Repositories/CandleDB.repository";
import CandleMetaDBRepository from "src/DAL/Repositories/CandleMetaDB.repository";
import SymbolDBRepository from "src/DAL/Repositories/SymbolDB.repository";
import SymbolMetaDBRepository from "src/DAL/Repositories/SymbolMetaDB.repository";

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