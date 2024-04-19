import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entities';

@Controller('movies') // url의 entry point를 컨트롤한다. 즉, localhost:3000/movies로 접속해야 작동한다.
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  // constructor는 moviesService라는 클래스를 가지고 된다.

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  // Movie[]는 getAll이 Movie Array를 리턴할 것이라는 것이다.

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after : ${searchingYear}`;
    //return this.moviesService.
  }
  // @Get('search')를 밑에 두면 아래에 있는 @Get('/:id')에서 id로 search를 인식하게 된다. 그래서 위쪽에 두어야 한다.
  // 이건 차후 해결 방안이 있는지 체크해 보고.
  // http://localhost:3000/movies/search?year=2000 에서 Query로 year로 잡아서 사용이 가능하다.

  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    //return `One Movie ID : ${movieId}`;
    return this.moviesService.getOne(movieId);
  }
  // 필요하면 먼저 요청해야 한다.
  // id값을 가져오고 싶을때 그냥 movieId를 쓰면 안되고, Param이라는 데코레이터로 요청해서 받아와야 하는 것이다.
  // @Param('id')로 id값을 받아와서 movieId에 할당하는 것이다.
  // : Movie로 지정하는 것은 Movie를 리턴할 것이라는 것이다.

  @Post()
  create(@Body() movieData) {
    //return `This will create a movie data : ${movieData['name']}`;
    return this.moviesService.create(movieData);
  }
  // data를 보낼때는 Body로 받아서 처리하면 된다.

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    //return `This will delete a movie with the id: ${movieId}`;
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    //return `This will patch a movie width the id: ${movieId}`;
    return this.moviesService.update(movieId, updateData);
  }
  // patch는 리소스의 일부만 업데이트 할때 사용한다. put이랑 틀리니 주의하자.
  // 대역폭을 절약하는 데 도움이 됨
  // patch는 멱등성이 없다. 즉 여러번 요청으로 출력값이 변경될 수 있다는 것이다. 카운트가 증가하는 것처럼..
  // data를 같이 보낼때는 Body로 받아서 처리하면 된다.

  @Put('/:id')
  put(@Param('id') movieId: string) {
    return `This will put a movie with the id: ${movieId}`;
  }
  // put은 리소스 전체를 업데이트 할때 사용한다. 특정 정보를 교체할 때 사용하고, 해당 정보가 없으면 새로 생성할 수도 있음
  // 멱등성을 가져야 한다. 같은 PUT 요청을 여러 번 수행해도 결과는 동일하게 유지되어야 합니다
}
