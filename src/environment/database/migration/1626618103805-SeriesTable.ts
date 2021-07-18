import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeriesTable1626618103805 implements MigrationInterface {
  name = 'SeriesTable1626618103805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "series" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "numberOfSeasons" integer NOT NULL, "numberOfEpisodes" integer NOT NULL, "rottenTomatoesRating" integer NOT NULL DEFAULT (0))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "series"`);
  }
}
