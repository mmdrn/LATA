import { BullMonitorExpress } from '@bull-monitor/express';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';

@Injectable()
export class BullMonitorService extends BullMonitorExpress {
  constructor(
    @InjectQueue('OneMinuteCandle_Fetches') OneMinuteQueue_Fetches: Queue,
    @InjectQueue('ThreeMinutesCandle_Fetches') ThreeMinutesQueue_Fetches: Queue,
    @InjectQueue('FiveMinutesCandle_Fetches') FiveMinutesQueue_Fetches: Queue,
    @InjectQueue('FifteenMinutesCandle_Fetches') FifteenMinutesQueue_Fetches: Queue,
    @InjectQueue('ThirtyMinutesCandle_Fetches') ThirtyMinutesQueue_Fetches: Queue,
    @InjectQueue('OneHourCandle_Fetches') OneHourQueue_Fetches: Queue,
    @InjectQueue('TwoHoursCandle_Fetches') TwoHourQueue_Fetches: Queue,
    @InjectQueue('FourHoursCandle_Fetches') FourHourQueue_Fetches: Queue,
    @InjectQueue('SixHoursCandle_Fetches') SixHourQueue_Fetches: Queue,
    @InjectQueue('EightHoursCandle_Fetches') EightHourQueue_Fetches: Queue,
    @InjectQueue('TwelveHoursCandle_Fetches') TwelveHourQueue_Fetches: Queue,
    @InjectQueue('OneDayCandle_Fetches') OneDayQueue_Fetches: Queue,
    @InjectQueue('ThreeDaysCandle_Fetches') ThreeDayQueue_Fetches: Queue,
    @InjectQueue('OneWeekCandle_Fetches') OneWeekQueue_Fetches: Queue,
    @InjectQueue('OneMonthCandle_Fetches') OneMonthQueue_Fetches: Queue,

    @InjectQueue('OneMinuteCandle_Calculations') OneMinuteQueue_Calculations: Queue,
    @InjectQueue('ThreeMinutesCandle_Calculations') ThreeMinutesQueue_Calculations: Queue,
    @InjectQueue('FiveMinutesCandle_Calculations') FiveMinutesQueue_Calculations: Queue,
    @InjectQueue('FifteenMinutesCandle_Calculations') FifteenMinutesQueue_Calculations: Queue,
    @InjectQueue('ThirtyMinutesCandle_Calculations') ThirtyMinutesQueue_Calculations: Queue,
    @InjectQueue('OneHourCandle_Calculations') OneHourQueue_Calculations: Queue,
    @InjectQueue('TwoHoursCandle_Calculations') TwoHourQueue_Calculations: Queue,
    @InjectQueue('FourHoursCandle_Calculations') FourHourQueue_Calculations: Queue,
    @InjectQueue('SixHoursCandle_Calculations') SixHourQueue_Calculations: Queue,
    @InjectQueue('EightHoursCandle_Calculations') EightHourQueue_Calculations: Queue,
    @InjectQueue('TwelveHoursCandle_Calculations') TwelveHourQueue_Calculations: Queue,
    @InjectQueue('OneDayCandle_Calculations') OneDayQueue_Calculations: Queue,
    @InjectQueue('ThreeDaysCandle_Calculations') ThreeDayQueue_Calculations: Queue,
    @InjectQueue('OneWeekCandle_Calculations') OneWeekQueue_Calculations: Queue,
    @InjectQueue('OneMonthCandle_Calculations') OneMonthQueue_Calculations: Queue,
  ) {
    super({
      queues: [
        new BullAdapter(OneMinuteQueue_Fetches),
        new BullAdapter(ThreeMinutesQueue_Fetches),
        new BullAdapter(FiveMinutesQueue_Fetches),
        new BullAdapter(FifteenMinutesQueue_Fetches),
        new BullAdapter(ThirtyMinutesQueue_Fetches),
        new BullAdapter(OneHourQueue_Fetches),
        new BullAdapter(TwoHourQueue_Fetches),
        new BullAdapter(FourHourQueue_Fetches),
        new BullAdapter(SixHourQueue_Fetches),
        new BullAdapter(EightHourQueue_Fetches),
        new BullAdapter(TwelveHourQueue_Fetches),
        new BullAdapter(OneDayQueue_Fetches),
        new BullAdapter(ThreeDayQueue_Fetches),
        new BullAdapter(OneWeekQueue_Fetches),
        new BullAdapter(OneMonthQueue_Fetches),

        new BullAdapter(OneMinuteQueue_Calculations),
        new BullAdapter(ThreeMinutesQueue_Calculations),
        new BullAdapter(FiveMinutesQueue_Calculations),
        new BullAdapter(FifteenMinutesQueue_Calculations),
        new BullAdapter(ThirtyMinutesQueue_Calculations),
        new BullAdapter(OneHourQueue_Calculations),
        new BullAdapter(TwoHourQueue_Calculations),
        new BullAdapter(FourHourQueue_Calculations),
        new BullAdapter(SixHourQueue_Calculations),
        new BullAdapter(EightHourQueue_Calculations),
        new BullAdapter(TwelveHourQueue_Calculations),
        new BullAdapter(OneDayQueue_Calculations),
        new BullAdapter(ThreeDayQueue_Calculations),
        new BullAdapter(OneWeekQueue_Calculations),
        new BullAdapter(OneMonthQueue_Calculations),
      ]
    });
  }
}