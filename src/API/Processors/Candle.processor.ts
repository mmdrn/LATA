import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MapCandlesToCreateCandles } from 'src/BLL/Mappers/Candle.mapper';
import CreateCandle from 'src/BLL/Models/CreateCandle.model';
import Symbol from 'src/BLL/Models/Symbol.model';
import { Exchanges } from './../../BLL/Enums/Exchanges.enum';
import { Interval } from './../../BLL/Enums/Interval.enum';
import Candle from './../../BLL/Models/Candle.model';
import CandleService from './../../BLL/Services/Candle.service';
import SymbolService from './../../BLL/Services/Symbol.service';

@Processor('fetch-candles-queue')
@Injectable()
export class FetchCandlesProcessor {
  constructor(
    private readonly symbolService: SymbolService,
    private readonly candleService: CandleService,
  ) {
    this.symbolService.setExchange(Exchanges.Binance);
    this.candleService.setExchange(Exchanges.Binance);
  }

  private readonly logger = new Logger(FetchCandlesProcessor.name);

  @Process({
    name: "0",
    concurrency: 3
  })
  async OneMinute(job: Job) {
    this.logger.log(`processing a OneMinute job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.OneMinute;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "1",
    concurrency: 3
  })
  async ThreeMinutes(job: Job) {
    this.logger.log(`processing a ThreeMinutes job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.ThreeMinutes;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "2",
    concurrency: 3
  })
  async FiveMinutes(job: Job) {
    this.logger.log(`processing a FiveMinutes job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.FiveMinutes;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "3",
    concurrency: 3
  })
  async FifteenMinutes(job: Job) {
    this.logger.log(`processing a FifteenMinutes job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.FifteenMinutes;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "4",
    concurrency: 3
  })
  async ThirtyMinutes(job: Job) {
    this.logger.log(`processing a ThirtyMinutes job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.ThirtyMinutes;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "5",
    concurrency: 3
  })
  async OneHour(job: Job) {
    this.logger.log(`processing a OneHour job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.OneHour;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "6",
    concurrency: 3
  })
  async TwoHour(job: Job) {
    this.logger.log(`processing a TwoHour job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.TwoHour;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "7",
    concurrency: 5
  })
  async FourHour(job: Job) {
    this.logger.log(`processing a FourHour job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.FourHour;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "8",
    concurrency: 3
  })
  async SixHour(job: Job) {
    this.logger.log(`processing a SixHour job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.SixHour;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "9",
    concurrency: 3
  })
  async EightHour(job: Job) {
    this.logger.log(`processing a EightHour job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.EightHour;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "10",
    concurrency: 3
  })
  async TwelveHour(job: Job) {
    this.logger.log(`processing a TwelveHour job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.TwelveHour;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "11",
    concurrency: 3
  })
  async OneDay(job: Job) {
    this.logger.log(`processing a OneDay job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.OneDay;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "12",
    concurrency: 3
  })
  async ThreeDay(job: Job) {
    this.logger.log(`processing a ThreeDay job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.ThreeDay;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "13",
    concurrency: 3
  })
  async OneWeek(job: Job) {
    this.logger.log(`processing a OneWeek job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.OneWeek;
    return await this.fetch(symbol, _interval);
  }

  @Process({
    name: "14",
    concurrency: 3
  })
  async OneMonth(job: Job) {
    this.logger.log(`processing a OneMonth job. jobId: ${job.id}`)
    const symbol = job.data.symbol;
    const _interval: Interval = Interval.OneMonth;
    return await this.fetch(symbol, _interval);
  }

  private async fetch(symbol: Symbol, interval: Interval) {
    this.logger.log(`fetching candles. symbol: ${symbol.symbol}, interval: ${interval}`);
    let addedCandleCount: number = 0;
    let fetchedCandles: Candle[];
    let storedCandles: Candle[];
    let startTime: number;
    let mappedCandles: CreateCandle[];

    startTime = await this.candleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, interval);
    fetchedCandles = await this.candleService.fetchCandles(symbol.symbol, interval, startTime, 1000);
    this.logger.log(`fetched candles report. symbol: ${symbol.symbol}, interval: ${interval}, count: ${fetchedCandles.length}`);

    if (fetchedCandles.length < 1) {
      return false;
    }

    mappedCandles = MapCandlesToCreateCandles(fetchedCandles);
    storedCandles = await this.candleService.storeCandles(mappedCandles, interval);
    addedCandleCount += storedCandles.length;

    while (fetchedCandles.length === 1000) {
      startTime = await this.candleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, interval);
      fetchedCandles = await this.candleService.fetchCandles(symbol.symbol, interval, startTime, 1000);
      this.logger.log(`fetched candles report. symbol: ${symbol.symbol}, interval: ${interval}, count: ${fetchedCandles.length}`);
      mappedCandles = MapCandlesToCreateCandles(fetchedCandles);
      storedCandles = storedCandles.concat(await this.candleService.storeCandles(mappedCandles, interval));
      addedCandleCount += storedCandles.length;
    }

    this.logger.log(`finished storing candle. symbol: ${symbol.symbol}, interval: ${interval}, count: ${addedCandleCount}`);

    return true;
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // @Process({
  //   name: "1",
  //   concurrency: 3
  // })
  // async oneHourQueue(job: Job) {
  //   const symbol = job.data.symbol;
  //   const _interval = Interval.OneHour;

  //   this.logger.debug(`fetching candles of ${symbol.symbol} ----------------------------`);
  //   let addedCandleCount: number = 0;
  //   let fetchedCandles: Candle[];
  //   let storedCandles: Candle[];
  //   let startTime: number;

  //   startTime = await this.candleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, _interval);
  //   fetchedCandles = await this.candleService.fetchCandles(symbol.symbol, _interval, startTime, 1000);

  //   if (fetchedCandles.length < 1) {
  //     this.logger.debug(`fetching candles done with 0 new candles for ${symbol.symbol}.`);
  //     return false;
  //   }

  //   storedCandles = await this.candleService.storeCandles(fetchedCandles, _interval);
  //   this.logger.debug(`storing candles done with ${storedCandles.length} new candles for ${symbol.symbol}.`);
  //   addedCandleCount += storedCandles.length;

  //   while (fetchedCandles.length === 1000) {
  //     startTime = await this.candleService.calculateStartTimeDependingOnTheLatestExistingCandle(symbol.symbol, _interval);
  //     fetchedCandles = await this.candleService.fetchCandles(symbol.symbol, _interval, startTime, 1000);
  //     this.logger.debug(`fetching candles done with ${fetchedCandles.length} new candles for ${symbol.symbol}.`);
  //     storedCandles = storedCandles.concat(await this.candleService.storeCandles(fetchedCandles, _interval));
  //     this.logger.debug(`storing candles done with ${storedCandles.length} new candles for ${symbol.symbol}.`);
  //     addedCandleCount += storedCandles.length;
  //   }
  //   this.logger.debug(`${addedCandleCount} new candles stored for ${symbol.symbol}`);

  //   return true;
  // }
}
