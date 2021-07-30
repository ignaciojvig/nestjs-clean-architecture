import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/SeriesService/services.module';
import { SeriesController } from './Controllers/series.controller';

@Module({
  imports: [ServicesModule],
  controllers: [SeriesController],
})
export class PresentationModule {}
