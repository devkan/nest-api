import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entities';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  // controller의 getAll()에서 호출

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    // +id는 string을 number로 변환하는 것으로 parseInt(id)와 같다.

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    // id가 없을 경우 빈 공백으로 출력하지 않고, 404 오류를 출력하도록 구성한 것이다.
    return movie;
  }

  deleteOne(id: string): boolean {
    this.getOne(id); // 옵셔널: 해당 ID의 영화가 존재하는지 확인
    this.movies = this.movies.filter((movie) => movie.id !== +id); // filter로 반환된 배열을 원래 배열에 할당
    return true; // 삭제 성공 여부 반환
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
    // 실제 디비에 구현하는 방식이 아니라서, 코드 구성이 좀 이상하다는 것을 알아두자.
    // { ...movie, ...updateData }는 스프레드 연산자를 사용하여 두 객체를 합치는 구문이다.
    // 스프레드 연산자를 사용함으로써, updateData의 필드가 movie의 동일한 필드를 덮어쓰게 되며, 이는 업데이트된 새 객체를 생성한다.
    // 이렇게 생성된 새 객체를 movies 배열에 push 메소드를 통해 추가함으로써 업데이트가 완료되는 것이다.
  }
}
