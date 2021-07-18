import { Module } from '@nestjs/common';
import { ControllersModule } from 'src/api/0 - Presentation/controllers.module';
import { DatabaseModule } from 'src/environment/database/database.module';

@Module({
  imports: [ControllersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
