import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() // 옵셔널로 지정, 이 필드는 필수가 아니라는 것이다.
  @IsString({ each: true })
  readonly genres: string[];
}
// movie.entities.ts를 참조해서 구성하면 되며, create를 할때 타입 체크가 들어가게 된다.
// class-validator를 사용해서 데코레이터를 지정하면 class의 유효성을 검사할수 있다.
