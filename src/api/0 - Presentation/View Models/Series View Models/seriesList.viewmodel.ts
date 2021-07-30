import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SeriesListViewModel {
  @ApiProperty({
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  id: string;

  @ApiProperty({
    maxLength: 50,
    example: 'Game of Thrones',
  })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 8,
  })
  @IsNotEmpty()
  numberOfSeasons: number;

  @ApiProperty({
    example: 73,
  })
  @ApiProperty({
    example: 0.89,
    nullable: true,
  })
  rottenTomatoesRating: number;

  constructor(
    id: string,
    name: string,
    numberOfSeasons: number,
    rottenTomatoesRating: number,
  ) {
    this.id = id;
    this.name = name;
    this.numberOfSeasons = numberOfSeasons;
    this.rottenTomatoesRating = rottenTomatoesRating;
  }
}
