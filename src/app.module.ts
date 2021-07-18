import { Module } from '@nestjs/common';
import { PresentationModule } from 'src/api/0 - Presentation/presentation.module';
import { DatabaseModule } from 'src/environment/database/database.module';

@Module({
  imports: [PresentationModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
