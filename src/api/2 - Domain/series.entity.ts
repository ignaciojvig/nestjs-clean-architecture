import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Series {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  numberOfSeasons: number;

  @Column()
  numberOfEpisodes: number;

  @Column({ default: 0 })
  rottenTomatoesRating: number;
}