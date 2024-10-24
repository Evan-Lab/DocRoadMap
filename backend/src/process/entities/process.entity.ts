import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Status } from 'src/enum/status.enum';

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

    @CreateDateColumn()
    createdAt: Date;

    @Column('timestamp')
    updatedAt: Date;

    @Column('timestamp')
    endedAt: Date;
}
