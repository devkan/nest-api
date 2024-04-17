import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
  // 컨트롤러에는 비지니스 로직을 두지 말고, url을 지정하고, function만 리턴하게 구성해야 한다.
  // 그래야 차후 테스트가 용이해 진다. 꼭 기억해 두자.
}
