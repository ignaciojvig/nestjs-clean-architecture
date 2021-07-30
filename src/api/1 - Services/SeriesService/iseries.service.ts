import { Series } from '@domain/entities/series.entity';

export interface ISeriesService {
  getAllSeries(): Promise<Series[]>;

  createSeries(newSeries: Series): Promise<Series>;

  updateSeries(seriesToUpdated: Series): Promise<Series>;

  deleteSeries(seriesId: string): Promise<void>;
}
