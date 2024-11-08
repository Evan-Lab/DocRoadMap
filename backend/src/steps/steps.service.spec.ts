import { Test, TestingModule } from '@nestjs/testing';
import { StepsService } from './steps.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Process } from '../process/entities/process.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('StepsService', () => {
  let service: StepsService;
  let stepRepository: Repository<Step>;
  let processRepository: Repository<Process>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StepsService,
        {
          provide: getRepositoryToken(Step),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Process),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StepsService>(StepsService);
    stepRepository = module.get<Repository<Step>>(getRepositoryToken(Step));
    processRepository = module.get<Repository<Process>>(getRepositoryToken(Process));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a step', async () => {
      const createStepDto = { processId: 1, name: 'Test Step', description: 'Test Description' };
      const process = { id: 1, name: 'Test Process' } as Process;
      const step = { id: 1, name: 'Test Step', description: 'Test Description', process } as Step;

      jest.spyOn(processRepository, 'findOne').mockResolvedValue(process);
      jest.spyOn(stepRepository, 'create').mockReturnValue(step);
      jest.spyOn(stepRepository, 'save').mockResolvedValue(step);

      expect(await service.create(createStepDto)).toEqual(step);
      expect(processRepository.findOne).toHaveBeenCalledWith({ where: { id: createStepDto.processId } });
      expect(stepRepository.save).toHaveBeenCalledWith(step);
    });

    it('should throw NotFoundException if process not found', async () => {
      const createStepDto = { processId: 1, name: 'Test Step', description: 'Test Description' };

      jest.spyOn(processRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createStepDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of steps', async () => {
      const steps = [
        {
          id: 1,
          name: 'Test Step',
          process: {
            id: 1,
            name: 'Test Process'
          }
        }
      ] as Step[];

      jest.spyOn(stepRepository, 'find').mockResolvedValue(steps);

      expect(await service.findAll()).toEqual(steps);
      expect(stepRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a step', async () => {
      const step = {
        id: 1,
        name: 'Test Step',
        process: {
          id: 1,
          name: 'Test Process'
        }
      } as Step;

      jest.spyOn(stepRepository, 'findOne').mockResolvedValue(step);

      expect(await service.findOne(1)).toEqual(step);
    });

    it('should throw NotFoundException if step not found', async () => {
      jest.spyOn(stepRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a step', async () => {
      const updateStepDto = { name: 'Updated Step' };
      const step = {
        id: 1,
        name: 'Test Step'
      } as Step;

      jest.spyOn(stepRepository, 'findOne').mockResolvedValue(step);
      jest.spyOn(stepRepository, 'update').mockResolvedValue({ affected: 1 } as any);

      expect(await service.update(1, updateStepDto)).toEqual({ affected: 1 });
      expect(stepRepository.update).toHaveBeenCalledWith(1, updateStepDto);
    });

    it('should throw NotFoundException if step not found', async () => {
      const updateStepDto = { name: 'Updated Step' };

      jest.spyOn(stepRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateStepDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a step', async () => {
      const step = { 
        id: 1, 
        name: 'Test Step' 
      } as Step;

      jest.spyOn(stepRepository, 'findOne').mockResolvedValue(step);
      jest.spyOn(stepRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      expect(await service.remove(1)).toEqual({ affected: 1 });
      expect(stepRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if step not found', async () => {
      jest.spyOn(stepRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
