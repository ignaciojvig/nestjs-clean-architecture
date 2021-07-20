import { Module } from '@nestjs/common';
import { ServicesModule } from '@services/services.module';
import { SeriesController } from './Controllers/series.controller';

@Module({
  imports: [ServicesModule],
  controllers: [SeriesController],
})
export class PresentationModule {}
