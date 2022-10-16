import { BullMonitorExpress } from '@bull-monitor/express';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';

@Injectable()
export class BullMonitorService extends BullMonitorExpress {
  constructor(
    @InjectQueue('OneMinuteCandle') OneMinuteQueue: Queue,
    @InjectQueue('ThreeMinutesCandle') ThreeMinutesQueue: Queue,
    @InjectQueue('FiveMinutesCandle') FiveMinutesQueue: Queue,
    @InjectQueue('FifteenMinutesCandle') FifteenMinutesQueue: Queue,
    @InjectQueue('ThirtyMinutesCandle') ThirtyMinutesQueue: Queue,
    @InjectQueue('OneHourCandle') OneHourQueue: Queue,
    @InjectQueue('TwoHoursCandle') TwoHourQueue: Queue,
    @InjectQueue('FourHoursCandle') FourHourQueue: Queue,
    @InjectQueue('SixHoursCandle') SixHourQueue: Queue,
    @InjectQueue('EightHoursCandle') EightHourQueue: Queue,
    @InjectQueue('TwelveHoursCandle') TwelveHourQueue: Queue,
    @InjectQueue('OneDayCandle') OneDayQueue: Queue,
    @InjectQueue('ThreeDaysCandle') ThreeDayQueue: Queue,
    @InjectQueue('OneWeekCandle') OneWeekQueue: Queue,
    @InjectQueue('OneMonthCandle') OneMonthQueue: Queue,
  ) {
    super({
      queues: [
        new BullAdapter(OneMinuteQueue),
        new BullAdapter(ThreeMinutesQueue),
        new BullAdapter(FiveMinutesQueue),
        new BullAdapter(FifteenMinutesQueue),
        new BullAdapter(ThirtyMinutesQueue),
        new BullAdapter(OneHourQueue),
        new BullAdapter(TwoHourQueue),
        new BullAdapter(FourHourQueue),
        new BullAdapter(SixHourQueue),
        new BullAdapter(EightHourQueue),
        new BullAdapter(TwelveHourQueue),
        new BullAdapter(OneDayQueue),
        new BullAdapter(ThreeDayQueue),
        new BullAdapter(OneWeekQueue),
        new BullAdapter(OneMonthQueue),
      ]
    });
  }
}