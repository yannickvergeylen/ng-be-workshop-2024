import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { STATIC_DATA } from './static-data';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return static data', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getMovies()).toEqual(STATIC_DATA);
    });
  });
});