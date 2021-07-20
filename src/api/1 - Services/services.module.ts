import { Series } from '@domain/entities/series.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesService } from './series.service';

@Module({
  imports: [TypeOrmModule.forFeature([Series])],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class ServicesModule {}
