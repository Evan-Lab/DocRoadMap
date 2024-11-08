import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Process } from '../process/entities/process.entity';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let processRepository: Repository<Process>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Process),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    processRepository = module.get<Repository<Process>>(getRepositoryToken(Process));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException if user already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({} as User);
      await expect(service.create({ email: 'test@example.com' } as any)).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if some processes are not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(processRepository, 'findByIds').mockResolvedValueOnce([]);
      await expect(service.create({ email: 'test@example.com', processIds: [1, 2] } as any)).rejects.toThrow(NotFoundException);
    });

    it('should create and save a new user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(processRepository, 'findByIds').mockResolvedValueOnce([{ id: 1 }] as Process[]);
      jest.spyOn(userRepository, 'create').mockReturnValue({} as User);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce({} as User);

      const result = await service.create({ email: 'test@example.com', password: 'mySecretPassword', processIds: [1] } as any);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([{}] as User[]);
      const result = await service.findAll();
      expect(result).toEqual([{}]);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('should return a user if found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({} as User);
      const result = await service.findOne(1);
      expect(result).toEqual({});
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.update(1, {} as any)).rejects.toThrow(NotFoundException);
    });

    it('should update and return the user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({} as User);
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce({} as any);
      const result = await service.update(1, {} as any);
      expect(result).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should remove the user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({} as User);
      jest.spyOn(userRepository, 'delete').mockResolvedValueOnce({} as any);
      const result = await service.remove(1);
      expect(result).toBeDefined();
    });
  });
});
