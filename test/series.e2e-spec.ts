import { DependencyInjectionTokens } from '@core/IoC Crosscutting/di.tokens';
import { Series } from '@domain/entities/series.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { SeriesController } from '@presentation/Controllers/series.controller';
import { SeriesCreateAndEditViewModel } from '@presentation/View Models/Series View Models/seriesCreateAndEdit.viewmodel';
import { SeriesListViewModel } from '@presentation/View Models/Series View Models/seriesList.viewmodel';
import { SeriesService } from '@services/SeriesService/series.service';
import * as request from 'supertest';
import { Repository } from 'typeorm';

describe('Series', () => {
  let app: INestApplication;

  const mockedUUID = '14da614a-6d80-41f0-8211-6e7889fdde96';

  const mockedSeries: Series = {
    id: mockedUUID,
    name: 'Breaking Bad',
    numberOfEpisodes: 32,
    numberOfSeasons: 6,
    rottenTomatoesRating: 0.98,
  };

  const mockedSeriesRepository = {
    find: () => [
      {
        id: mockedUUID,
        name: 'Umbrella Academy',
        numberOfSeasons: 3,
        numberOfEpisodes: 20,
        rottenTomatoesRating: 0.98,
      } as Series,
    ],
    findOne: (seriesId: { id: string }) => {
      if (!seriesId || seriesId.id !== mockedUUID) {
        return undefined;
      }

      return mockedSeries;
    },
    save: (seriesToBeCreatedOrUpdated: Series) => ({
      ...seriesToBeCreatedOrUpdated,
      id: mockedUUID,
    }),
    delete: () => {
      return undefined;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SeriesController],
      providers: [
        {
          provide: DependencyInjectionTokens.ISeriesInterface,
          useClass: SeriesService,
        },
        {
          provide: getRepositoryToken(Series),
          useFactory: () => mockedSeriesRepository,
        },
      ],
    })
      .overrideProvider(Repository)
      .useValue(mockedSeriesRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/GET Get all Series', () => {
    const seriesInViewModel = mockedSeriesRepository.find().map(
      (x) =>
        ({
          id: x.id,
          name: x.name,
          numberOfSeasons: x.numberOfSeasons,
          rottenTomatoesRating: x.rottenTomatoesRating,
        } as SeriesListViewModel),
    );

    return request(app.getHttpServer())
      .get('/series')
      .expect(200)
      .expect(seriesInViewModel);
  });

  it('/POST Create a new Series', () => {
    const mockedSeriesToBeCreated: SeriesCreateAndEditViewModel = {
      name: 'Breaking Bad',
      numberOfEpisodes: 80,
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .post('/series')
      .send(mockedSeriesToBeCreated)
      .expect(201)
      .expect({ ...mockedSeriesToBeCreated, id: mockedUUID });
  });

  it('/POST Try to create a Series without a Name specified', () => {
    const mockedSeriesToBeCreated: SeriesCreateAndEditViewModel = {
      name: '',
      numberOfEpisodes: 80,
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .post('/series')
      .send(mockedSeriesToBeCreated)
      .expect(400);
  });

  it('/POST Try to create a Series with a Name with more than 50 characters', () => {
    const mockedSeriesToBeCreated: SeriesCreateAndEditViewModel = {
      name: 'Queen Daenerys Stormborn of the House Targaryen, the First of Her Name, Queen of the Andals, the Rhoynar and the First Men, Lady of the Seven Kingdoms and Protector of the Realm, Lady of Dragonstone, Queen of Meereen, Khaleesi of the Great Grass Sea, the Unburnt, Breaker of Chains and Mother of Dragons',
      numberOfEpisodes: 80,
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .post('/series')
      .send(mockedSeriesToBeCreated)
      .expect(400);
  });

  it('/POST Try to create a Series without Number of Seasons', () => {
    const mockedSeriesToBeCreated: any = {
      name: '',
      numberOfEpisodes: 80,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .post('/series')
      .send(mockedSeriesToBeCreated)
      .expect(400);
  });

  it('/POST Try to create a Series without Number of Episodes', () => {
    const mockedSeriesToBeCreated: any = {
      name: '',
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .post('/series')
      .send(mockedSeriesToBeCreated)
      .expect(400);
  });

  it('/POST Create a new Series without a predefined rotten tomatoes rating', () => {
    const mockedSeriesToBeCreated: any = {
      name: 'Breaking Bad',
      numberOfEpisodes: 80,
      numberOfSeasons: 6,
    };

    return request(app.getHttpServer())
      .post('/series')
      .send(mockedSeriesToBeCreated)
      .expect(201)
      .expect({ ...mockedSeriesToBeCreated, id: mockedUUID });
  });

  it('/PUT Try to update a Series without providing an id', () => {
    const mockedSeriesToBeUpdated: SeriesCreateAndEditViewModel = {
      name: 'Jane the Virgin',
      numberOfEpisodes: 80,
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .put('/series/abc')
      .send(mockedSeriesToBeUpdated)
      .expect(400);
  });

  it('/PUT Update a Series', () => {
    const mockedSeriesToBeUpdated: SeriesCreateAndEditViewModel = {
      name: 'Jane the Virgin',
      numberOfEpisodes: 90,
      numberOfSeasons: 2,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .put(`/series/${mockedUUID}`)
      .send(mockedSeriesToBeUpdated)
      .expect(200)
      .expect({ ...mockedSeriesToBeUpdated, id: mockedUUID });
  });

  it('/PUT Try to update a Series with a name with more than 50 characters', () => {
    const mockedSeriesToBeUpdated: SeriesCreateAndEditViewModel = {
      name: 'How to sell drugs onlineeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      numberOfEpisodes: 80,
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .put(`/series/${mockedUUID}`)
      .send(mockedSeriesToBeUpdated)
      .expect(400);
  });

  it('/PUT Try to update a Series without a number of episodes', () => {
    const mockedSeriesToBeUpdated: any = {
      name: 'How to sell drugs online',
      numberOfSeasons: 6,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .put(`/series/${mockedUUID}`)
      .send(mockedSeriesToBeUpdated)
      .expect(400);
  });

  it('/PUT Try to update a Series without a number of seasons', () => {
    const mockedSeriesToBeUpdated: any = {
      name: 'How to sell drugs online',
      numberOfEpisodes: 30,
      rottenTomatoesRating: 0.98,
    };

    return request(app.getHttpServer())
      .put(`/series/${mockedUUID}`)
      .send(mockedSeriesToBeUpdated)
      .expect(400);
  });

  it('/PUT Update a Series without rotten tomatoes rating', () => {
    const mockedSeriesToBeUpdated: any = {
      name: 'How to sell drugs online',
      numberOfSeasons: 6,
      numberOfEpisodes: 30,
    };

    return request(app.getHttpServer())
      .put(`/series/${mockedUUID}`)
      .send(mockedSeriesToBeUpdated)
      .expect(200)
      .expect({ ...mockedSeriesToBeUpdated, id: mockedUUID });
  });

  it('/DELETE Try to delete a Series providing an inexistent Id', () => {
    return request(app.getHttpServer()).delete('/series/abc').expect(400);
  });

  it('/DELETE Delete a Series', () => {
    return request(app.getHttpServer())
      .delete(`/series/${mockedUUID}`)
      .expect(200);
  });
});
