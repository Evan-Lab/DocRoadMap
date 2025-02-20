import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { ...userData } = createUserDto;
    const existUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;

    const user = this.userRepository.create({
      ...userData,
    });

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findMe(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['processes', 'processes.steps'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find({ relations: ['processes', 'processes.steps'] });
    return users
  }

  async findOne(email: string) {
    const findUser = await this.userRepository.findOne({
      where: { email: email },
      relations: ['processes', 'processes.steps']
    });
    if (!findUser) {
      throw new NotFoundException('User Not Found');
    }
    return findUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findOne({ where: { id: id } });
    if (!findUser) {
      throw new NotFoundException('User Not Found');
    }
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id: id } });
    if (!findUser) {
      throw new NotFoundException('User Not Found');
    }
    const user = await this.userRepository.delete(id);
    return user;
  }
}
