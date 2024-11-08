import { Test, TestingModule } from '@nestjs/testing';
import { ProcessService } from './process.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';
import { Step } from '../steps/entities/step.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Status } from '../enum/status.enum';

describe('ProcessService', () => {
  let service: ProcessService;
  let processRepository: Repository<Process>;
  let stepRepository: Repository<Step>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessService,
        {
          provide: getRepositoryToken(Process),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Step),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProcessService>(ProcessService);
    processRepository = module.get<Repository<Process>>(getRepositoryToken(Process));
    stepRepository = module.get<Repository<Step>>(getRepositoryToken(Step));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new process', async () => {
      const createProcessDto = {
        stepsId: [1, 2],
        userId: 1,
        name: 'Test Process',
        description: 'Test Description',
        status: Status.IN_PROGRESS,
        endedAt: null,
      };

      const user = { id: 1, name: 'Test User' };
      const steps = [{ id: 1, name: 'Step 1' }, { id: 2, name: 'Step 2' }];
      const createdProcess = { id: 1, ...createProcessDto, user, steps };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(stepRepository, 'findByIds').mockResolvedValue(steps as any);
      jest.spyOn(processRepository, 'create').mockReturnValue(createdProcess as any);
      jest.spyOn(processRepository, 'save').mockResolvedValue(createdProcess as any);

      expect(await service.create(createProcessDto)).toEqual(createdProcess);
    });

    it('should throw NotFoundException if user not found', async () => {
      const createProcessDto = {
        stepsId: [1, 2],
        userId: 1,
        name: 'Test Process',
        description: 'Test Description',
        status: Status.IN_PROGRESS,
        endedAt: null,
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createProcessDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if some steps not found', async () => {
      const createProcessDto = {
        stepsId: [1, 2],
        userId: 1,
        name: 'Test Process',
        description: 'Test Description',
        status: Status.IN_PROGRESS,
        endedAt: null,
      };

      const user = { id: 1, name: 'Test User' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as any);
      jest.spyOn(stepRepository, 'findByIds').mockResolvedValue([{ id: 1, name: 'Step 1' }] as any);

      await expect(service.create(createProcessDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of processes', async () => {
      const processes = [{ id: 1, name: 'Test Process' }];
      jest.spyOn(processRepository, 'find').mockResolvedValue(processes as any);
      expect(await service.findAll()).toEqual(processes);
    });
  });

  describe('findOne', () => {
    it('should return a process', async () => {
      const process = { id: 1, name: 'Test Process' };
      jest.spyOn(processRepository, 'findOne').mockResolvedValue(process as any);
      expect(await service.findOne(1)).toEqual(process);
    });

    it('should throw NotFoundException if process not found', async () => {
      jest.spyOn(processRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a process', async () => {
      const updateProcessDto = { name: 'Updated Process' };
      const process = { id: 1, name: 'Test Process' };

      jest.spyOn(processRepository, 'findOne').mockResolvedValue(process as any);
      jest.spyOn(processRepository, 'update').mockResolvedValue({ affected: 1 } as any);

      expect(await service.update(1, updateProcessDto)).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if process not found', async () => {
      const updateProcessDto = { name: 'Updated Process' };

      jest.spyOn(processRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, updateProcessDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a process', async () => {
      const process = { id: 1, name: 'Test Process' };

      jest.spyOn(processRepository, 'findOne').mockResolvedValue(process as any);
      jest.spyOn(processRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      expect(await service.remove(1)).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if process not found', async () => {
      jest.spyOn(processRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
