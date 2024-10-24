import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('timestamp')
    latestLogin: Date;
}
