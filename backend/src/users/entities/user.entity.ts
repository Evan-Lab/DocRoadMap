import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Process } from '../../process/entities/process.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text')
    email: string;

    @Column('boolean', { default: false })
    isActive: boolean;

    @Column('text')
    password: string

    @CreateDateColumn()
    createdAt: Date;

    @Column('timestamp', {nullable: true})
    latestLogin: Date;

    @OneToMany(() => Process, process => process.user)
    processes: Process[];
}
