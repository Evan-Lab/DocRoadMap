import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Status } from '../enum/status.enum';

describe('ProcessController', () => {
  let controller: ProcessController;
  let service: ProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessController],
      providers: [
        {
          provide: ProcessService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Test Process',
            }),
            findAll: jest.fn().mockResolvedValue([{
              id: 1,
              name: 'Test Process',
              description: 'Test Description',
              status: Status.IN_PROGRESS,
              userId: 1,
              stepsId: [],
            }]),
            findOne: jest.fn().mockResolvedValue({ 
              id: 1,
              name: 'Test Process' 
            }),
            update: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Updated Process' 
            }),
            remove: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
        {
          provide: 'StepRepository',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProcessController>(ProcessController);
    service = module.get<ProcessService>(ProcessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a process', async () => {
      const createProcessDto: CreateProcessDto = { 
        name: 'Test Process', 
        description: 'Test Description', 
        status: Status.IN_PROGRESS, 
        userId: 1,
        stepsId: [],
        endedAt: new Date(),
      };
      const result = await controller.create(createProcessDto);
      expect(result).toEqual({ id: 1, name: 'Test Process' });
      expect(service.create).toHaveBeenCalledWith(createProcessDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of processes', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{
        id: 1,
        name: 'Test Process',
        description: 'Test Description',
        status: Status.IN_PROGRESS,
        userId: 1,
        stepsId: [],
      }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single process', async () => {
      const id = '1';
      const result = await controller.findOne(id);
      expect(result).toEqual({ id: 1, name: 'Test Process' });
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a process', async () => {
      const id = '1';
      const updateProcessDto: UpdateProcessDto = {
        name: 'Updated Process',
        description: 'Updated Description',
        status: Status.COMPLETED,
        userId: 2,
        stepsId: [1, 2, 3],
        endedAt: new Date(),
      };
      const result = await controller.update(id, updateProcessDto);
      expect(result).toEqual({ id: 1, name: 'Updated Process' });
      expect(service.update).toHaveBeenCalledWith(+id, updateProcessDto);
    });
  });

  describe('remove', () => {
    it('should remove a process', async () => {
      const id = '1';
      const result = await controller.remove(id);
      expect(result).toEqual({ id: 1 });
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
