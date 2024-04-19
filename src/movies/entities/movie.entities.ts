export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
// service로 보내고 받을 클래스(interface)를 export 하는 곳이다.
// 실제로는 데이타베이스이 모델을 만들어야 하는데, 여기서는 개념만 잡는거라서 javascript 코드로 대체한다
