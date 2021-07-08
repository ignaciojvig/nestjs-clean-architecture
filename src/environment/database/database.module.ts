import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'series-db.sqlite3',
      entities: ['@domain/**/*.entity.ts'],
      migrations: ["@domain/**.*.entity.ts"]
    })
  ]
})
export class DatabaseModule {}
