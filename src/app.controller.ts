import { Controller, Get } from '@nestjs/common';

@Controller() // src밑으로 가져와서 'app'이 지정된 경로는 제거해야 한다.
export class AppController {
  @Get()
  home() {
    return 'Welcome to my Movie API';
  }
}
