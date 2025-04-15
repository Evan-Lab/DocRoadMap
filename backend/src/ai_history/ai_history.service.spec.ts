import { Test, TestingModule } from '@nestjs/testing';
import { AiHistoryService } from './ai_history.service';

describe('AiHistoryService', () => {
  let service: AiHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiHistoryService],
    }).compile();

    service = module.get<AiHistoryService>(AiHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
