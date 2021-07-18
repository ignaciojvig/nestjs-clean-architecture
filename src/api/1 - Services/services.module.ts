import { Series } from '@domain/series.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/environment/database/database.module';
import { SeriesService } from './series.service';

@Module({
  imports: [TypeOrmModule.forFeature([Series]), DatabaseModule],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class ServicesModule {}
