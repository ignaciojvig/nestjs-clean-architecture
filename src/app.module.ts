import { Module } from '@nestjs/common';
import { ControllersModule } from 'src/api/0 - Presentation/controllers.module';

@Module({
  imports: [ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
