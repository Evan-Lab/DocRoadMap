import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step)
    private stepRepository: Repository<Step>
  ) {}

  async create(createStepDto: CreateStepDto) {
    return await this.stepRepository.save(createStepDto);
  }

  async findAll() {
    return await this.stepRepository.find();
  }

  async findOne(id: number) {
    const findStep = await this.stepRepository.findOne({ where: { id: id } });
    if (!findStep) {
      throw new NotFoundException('Step Not Found');
    }
    return findStep;
  }

  async update(id: number, updateStepDto: UpdateStepDto) {
    const findStep = await this.stepRepository.findOne({ where: { id: id } });
    if (!findStep) {
      throw new NotFoundException('Step Not Found');
    }
    return await this.stepRepository.update(id, updateStepDto);
  }

  async remove(id: number) {
    const findStep = await this.stepRepository.findOne({ where: { id: id } });
    if (!findStep) {
      throw new NotFoundException('Step Not Found');
    }
    return await this.stepRepository.delete(id);
  }
}
