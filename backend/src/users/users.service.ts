import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const existUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existUser) {
      throw new ConflictException('User already exists');
    }
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({ where: { id: id } });
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
    return await this.userRepository.delete(id);
  }
}
