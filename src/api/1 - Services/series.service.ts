import { Series } from '@domain/series.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async getAllSeries(): Promise<Series[]> {
    return await this.seriesRepository.find();
  }

  async createSeries(newSeries: Series): Promise<Series> {
    return await this.seriesRepository.create(newSeries);
  }

  async updateSeries(seriesToUpdated: Series): Promise<Series> {
    return await this.seriesRepository.save(seriesToUpdated);
  }

  async deleteSeries(seriesId: string): Promise<void> {
    await this.seriesRepository.delete(seriesId);
  }
}
