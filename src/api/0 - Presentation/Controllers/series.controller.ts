import { Series } from '@domain/entities/series.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeriesCreateAndEditViewModel } from '@presentation/View Models/Series View Models/seriesCreateAndEdit.viewmodel';
import { SeriesListViewModel } from '@presentation/View Models/Series View Models/seriesList.viewmodel';
import { SeriesService } from '@services/series.service';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get()
  async getAllSeries(): Promise<SeriesListViewModel[]> {
    const seriesList = await this.seriesService.getAllSeries();
    return seriesList.map(
      (x) =>
        new SeriesListViewModel(
          x.id,
          x.name,
          x.numberOfSeasons,
          x.rottenTomatoesRating,
        ),
    );
  }

  @Post()
  async createSeries(
    @Body() newSeriesViewModel: SeriesCreateAndEditViewModel,
  ): Promise<Series> {
    const newSeries = new Series(
      newSeriesViewModel.name,
      newSeriesViewModel.numberOfSeasons,
      newSeriesViewModel.numberOfEpisodes,
      newSeriesViewModel.rottenTomatoesRating,
    );

    return await this.seriesService.createSeries(newSeries);
  }

  @Put(':id')
  async updateSeries(
    @Body() seriesToBeUpdatedViewModel: SeriesCreateAndEditViewModel,
    @Param('id') id: string,
  ): Promise<Series> {
    const seriesToBeUpdated = new Series(
      seriesToBeUpdatedViewModel.name,
      seriesToBeUpdatedViewModel.numberOfSeasons,
      seriesToBeUpdatedViewModel.numberOfEpisodes,
      seriesToBeUpdatedViewModel.rottenTomatoesRating,
      id,
    );

    return await this.seriesService.updateSeries(seriesToBeUpdated);
  }

  @Delete(':seriesId')
  async deleteSeries(@Param('seriesId') seriesId: string): Promise<void> {
    return await this.seriesService.deleteSeries(seriesId);
  }
}
