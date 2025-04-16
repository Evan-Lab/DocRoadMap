import { Test, TestingModule } from '@nestjs/testing';
import { AiHistoryController } from './ai_history.controller';
import { AiHistoryService } from './ai_history.service';

describe('AiHistoryController', () => {
  let controller: AiHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiHistoryController],
      providers: [AiHistoryService],
    }).compile();

    controller = module.get<AiHistoryController>(AiHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
