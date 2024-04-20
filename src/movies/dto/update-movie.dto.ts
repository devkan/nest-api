import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  /*
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
  */
}
// create-movie.dto.ts를 가져와 필드에 옵셔널을 추가만 해 줬다. 해당 데이타가 안 들어올수도 있게 때문이다.
// createDTO를 재사용하는 형태라서 이걸 좀 쉽게 구성하려면 extends로 PartialType()을 사용하면
// CreateMovieDto의 참조하는 필드를 선택적 필드(optional 필드)로 변경해서 사용이 가능하다.
// 즉, 주석처리된 코드와 동일한 작업을 하게 된다는 것이다.
