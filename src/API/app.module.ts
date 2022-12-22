import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullMonitorService } from './Bull/bull-monitor.service';
import { bullProviders, bullRegisters } from './bull';
import TypeORMConfigs from "./typeorm";
import controllers from './controllers';
import services from './services';
import repositories from './repositories';

@Module({
  imports: [
    ...TypeORMConfigs,
    ...bullRegisters,
    ScheduleModule.forRoot()
  ],
  controllers: [
    ...controllers
  ],
  providers: [
    ...services,
    ...repositories,
    ...bullProviders
  ]
})
export class AppModule implements NestModule {
  constructor(private monitor: BullMonitorService) { }
  async configure(consumer: MiddlewareConsumer) {
    await this.monitor.init();
    consumer.apply(this.monitor.router).forRoutes('/queue-monitoring');
  }
}
