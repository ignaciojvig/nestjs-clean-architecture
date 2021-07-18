import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class Series {
  @ApiProperty({
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    maxLength: 50,
    example: 'Game of Thrones',
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    example: 8,
  })
  @Column()
  numberOfSeasons: number;

  @ApiProperty({
    example: 73,
  })
  @Column()
  numberOfEpisodes: number;

  @ApiProperty({
    example: 0.89,
  })
  @Column({ default: 0 })
  rottenTomatoesRating: number;
}
