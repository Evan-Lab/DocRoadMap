import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Status } from '../../enum/status.enum';
import { Step } from '../../steps/entities/step.entity';

@Entity()
export class Process {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: Status;

    @ManyToOne(() => User, user => user.processes)
    user: User;

    @OneToMany(() => Step, step => step.process)
    steps: Step[];

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column('timestamp', { nullable: true })
    endedAt: Date;
}
