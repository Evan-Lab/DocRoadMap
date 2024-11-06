import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Process } from 'src/process/entities/process.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Process)
    private processRepository: Repository<Process>,
  
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { processIds, ...userData } = createUserDto;
    const existUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existUser) {
      throw new ConflictException('User already exists');
    }

    let processes = [];

    if (processIds && Array.isArray(processIds)) {
      processes = await this.processRepository.findByIds(processIds);
      if (!processes || processes.length !== processIds.length) {
        throw new NotFoundException('Some processes were not found');
      }
    }

    const user = this.userRepository.create({
      ...userData,
      processes
    });

    return await this.userRepository.save(userData);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['processes'] });
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({
      where: { id: id },
      relations: ['processes']
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
    return await this.userRepository.delete(id);
  }
}
