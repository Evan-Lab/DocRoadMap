import { Status } from "src/enum/status.enum";
import { Process } from "src/process/entities/process.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string

    @Column('text')
    description: string

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: Status

    @ManyToOne(() => Process, process => process.steps)
    process: Process

    @CreateDateColumn()
    createdAt: Date

    @Column('timestamp')
    updatedAt: Date

    @Column('timestamp')
    endedAt: Date
}
