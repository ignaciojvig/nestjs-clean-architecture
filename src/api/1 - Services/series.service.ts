import { Series } from '@domain/entities/series.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.seriesRepository.save(newSeries);
  }

  async updateSeries(seriesToUpdated: Series): Promise<Series> {
    const seriesFoundById = await this.seriesRepository.findOne({
      id: seriesToUpdated.id,
    });

    if (!seriesFoundById) {
      throw new HttpException(
        'A Series with the given Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.seriesRepository.save(seriesToUpdated);
  }

  async deleteSeries(seriesId: string): Promise<void> {
    const seriesFoundById = await this.seriesRepository.findOne({
      id: seriesId,
    });

    if (!seriesFoundById) {
      throw new HttpException(
        'A Series with the given Id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.seriesRepository.delete(seriesId);
  }
}
