import { Test, TestingModule } from '@nestjs/testing';
import { AnalyzesResultController } from './analyzes-result.controller';

describe('AnalyzesResultController', () => {
  let controller: AnalyzesResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyzesResultController],
    }).compile();

    controller = module.get<AnalyzesResultController>(AnalyzesResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
