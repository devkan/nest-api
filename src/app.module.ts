import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
// Nest.js에서는 하나의 모듈만 있을수 있는데, 그게 AppModule 이며, 이 모듈에서 구현하는 모든걸 import 해야 한다
