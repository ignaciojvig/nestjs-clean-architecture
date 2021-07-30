import { DependencyInjectionTokens } from '@core/IoC Crosscutting/di.tokens';
import { Series } from '@domain/entities/series.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesService } from './series.service';

@Module({
  imports: [TypeOrmModule.forFeature([Series])],
  providers: [
    {
      provide: DependencyInjectionTokens.ISeriesInterface,
      useClass: SeriesService,
    },
  ],
  exports: [
    {
      provide: DependencyInjectionTokens.ISeriesInterface,
      useClass: SeriesService,
    },
  ],
})
export class ServicesModule {}
