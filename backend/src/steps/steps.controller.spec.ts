import { Test, TestingModule } from '@nestjs/testing';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Process } from '../process/entities/process.entity';
import { Repository } from 'typeorm';

describe('StepsController', () => {
  let controller: StepsController;
  let service: StepsService;
  let processRepository: Repository<Process>;
  let stepRepository: Repository<Step>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepsController],
      providers: [
        StepsService,
        {
          provide: getRepositoryToken(Step),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Process),
          useClass: Repository,
        },
        {
          provide: StepsService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Sample Step' }),
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'Step One', description: 'Description for Step One', processId: 1 },
              { id: 2, name: 'Step Two', description: 'Description for Step Two', processId: 1 },
            ]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Sample Step' }),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated Step' }),
            remove: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<StepsController>(StepsController);
    service = module.get<StepsService>(StepsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a step', async () => {
      const createStepDto: CreateStepDto = { 
        name: 'Sample Step', 
        description: 'This is a sample step', 
        processId: 1 
      };
      const result = await controller.create(createStepDto);
      expect(result).toEqual({ id: 1, name: 'Sample Step' });
      expect(service.create).toHaveBeenCalledWith(createStepDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of steps', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        { id: 1, name: 'Step One', description: 'Description for Step One', processId: 1 },
        { id: 2, name: 'Step Two', description: 'Description for Step Two', processId: 1 },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single step', async () => {
      const id = '1';
      const result = await controller.findOne(id);
      expect(result).toEqual({ id: 1, name: 'Sample Step' });
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a step', async () => {
      const id = '1';
      const updateStepDto: UpdateStepDto = { 
        name: 'Updated Step', 
        description: 'This step has been updated', 
        processId: 1 
      };
      const result = await controller.update(id, updateStepDto);
      expect(result).toEqual({ id: 1, name: 'Updated Step' });
      expect(service.update).toHaveBeenCalledWith(+id, updateStepDto);
    });
  });

  describe('remove', () => {
    it('should remove a step', async () => {
      const id = '1';
      const result = await controller.remove(id);
      expect(result).toEqual({ id: 1 });
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
