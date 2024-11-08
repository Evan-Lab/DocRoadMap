import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { Repository } from 'typeorm';
import { Process } from '../process/entities/process.entity';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Process)
    private processRepository: Repository<Process>,
  
    @InjectRepository(Step)
    private stepRepository: Repository<Step>
  ) {}

  async create(createStepDto: CreateStepDto) {
    const {processId, ...stepData} = createStepDto;
    const process = await this.processRepository.findOne({ where: { id: processId } });

    if (!process) {
      throw new NotFoundException('Process Not Found');
    }

    const step = this.stepRepository.create({
      ...stepData,
      process
    });
    return await this.stepRepository.save(step);
  }

  async findAll() {
    return await this.stepRepository.find({ relations: ['process'] });
  }

  async findOne(id: number) {
    const findStep = await this.stepRepository.findOne({ 
      where: { id: id },
      relations: ['process']
    });

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
