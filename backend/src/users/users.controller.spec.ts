import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
          firstName: "TestFirstName",
          lastName: "TestLastName",
          email: "test@test.com",
          password: "testpassword",
          processIds: []
       };
      const result = {
          id: 1,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
          processes: [],
          isActive: true,
          createdAt: new Date(),
          latestLogin: new Date()
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 1,
          firstName: 'Alice',
          lastName: 'Doe',
          email: 'alice@example.com',
          password: 'password1',
          processes: [],
          isActive: true,
          createdAt: new Date(),
          latestLogin: new Date(),
        },
        {
          id: 2,
          firstName: 'Bob',
          lastName: 'Smith',
          email: 'bob@example.com',
          password: 'password2',
          processes: [],
          isActive: true,
          createdAt: new Date(),
          latestLogin: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const id = '1';
      const result = {
        id: 1,
        firstName: 'Alice',
        lastName: 'Doe',
        password: 'test',
        processes: [],
        email: 'alice@example.com',
        isActive: true,
        createdAt: new Date(),
        latestLogin: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });

    it('should throw an error if user not found', async () => {
      const id = '1';
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('User Not Found'));

      await expect(controller.findOne(id)).rejects.toThrow('User Not Found');
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        email: 'updated@example.com',
      };
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateUserDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(+id, updateUserDto);
    });
  });
});
