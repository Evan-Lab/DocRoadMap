import { Test, TestingModule } from '@nestjs/testing';
import { ListAdministrativeProcessController } from './list_administrative_process.controller';

describe('ListAdministrativeProcessController', () => {
  let controller: ListAdministrativeProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListAdministrativeProcessController],
    }).compile();

    controller = module.get<ListAdministrativeProcessController>(ListAdministrativeProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
