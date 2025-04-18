import { Test, TestingModule } from '@nestjs/testing';
import { ListAdministrativeProcessService } from './list_administrative_process.service';

describe('ListAdministrativeProcessService', () => {
  let service: ListAdministrativeProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListAdministrativeProcessService],
    }).compile();

    service = module.get<ListAdministrativeProcessService>(ListAdministrativeProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
