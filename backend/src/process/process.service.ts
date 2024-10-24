import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from './entities/process.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private processRepository: Repository<Process>,
  ) {}

  async create(createProcessDto: CreateProcessDto) {
    return await this.processRepository.save(createProcessDto);
  }

  async findAll() {
    return await this.processRepository.find();
  }

  async findOne(id: number) {
    const findProcess = await this.processRepository.findOne({where: {id : id}});
    if(!findProcess) {
      throw new NotFoundException(`Process #${id} not found`);
    }
    return findProcess;
  }

  async update(id: number, updateProcessDto: UpdateProcessDto) {
    const findProcess = await this.processRepository.findOne({where: {id : id}});
    if(!findProcess) {
      throw new NotFoundException(`Process #${id} not found`);
    }
    return await this.processRepository.update(id, updateProcessDto);
  }

  async remove(id: number) {
    const findProcess = await this.processRepository.findOne({where: {id : id}});
    if(!findProcess) {
      throw new NotFoundException(`Process #${id} not found`);
    }
    return await this.processRepository.delete(id);
  }
}
