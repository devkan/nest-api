import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  const testMovieData = {
    title: 'Test Movie',
    genres: ['test'],
    year: 2000,
  };
  // 테스트용 영화 데이터를 외부 변수로 선언

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it는 individual test(개발 테스트)를 의미한다.
  it('should be 4', () => {
    expect(2 + 3).toEqual(5);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
      // toBeInstanceOf를 사용해서 array instance를 리턴하는지 확인하는 것이다.
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create(testMovieData);

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // 주어진 값이 undefined가 아니라 정의된 값이 있는지 확인하는 테스트 구문으로 값이 null, false, 0 등이어도 정의되어 있기만 하면 테스트를 통과한다.
      expect(movie.id).toEqual(1);
      // 리턴값을 체크했지만, 다시 한번 1번의 데이타가 있는지 확인하는 것임
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); // NotFoundException의 인스턴스인지 확인
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create(testMovieData);
      //console.log(service.getAll());
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toEqual(allMovies - 1);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create(testMovieData);
      const afterCreate = service.getAll().length;
      //console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
