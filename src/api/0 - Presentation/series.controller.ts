import { Series } from '@domain/series.entity';
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
import { SeriesService } from '@services/series.service';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get()
  async getAllSeries(): Promise<Series[]> {
    return await this.seriesService.getAllSeries();
  }

  @Post()
  async createSeries(@Body() newSeries: Series): Promise<Series> {
    return await this.seriesService.createSeries(newSeries);
  }

  @Put()
  async updateSeries(@Body() seriesToBeUpdated: Series): Promise<Series> {
    return await this.seriesService.updateSeries(seriesToBeUpdated);
  }

  @Delete()
  async deleteSeries(@Param('seriesId') seriesId: string): Promise<void> {
    return await this.seriesService.deleteSeries(seriesId);
  }
}
