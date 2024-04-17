import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest!';
  }

  getHi(): string {
    return 'Hi Nest!!';
  }
  // 비지니스 로직은 이곳에서 처리하도록 한다.
}
