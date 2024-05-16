import { User } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class AnalyzesResult {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    total_protein: string;
    @Column()
    albumin: string;
    @Column()
    glucose: string;
    @Column()
    urea: string;
    @Column()
    creatinine: string;
    @Column()
    total_cholesterol: string;
    @Column()
    direct_bilirubin: string;
    @Column()
    total_bilirubin: string;
    @Column()
    alt: string;
    @Column()
    ast: string;
    @Column()
    amylase: string;
    @Column()
    ldh: string;
    @Column()
    ck: string;
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
    
    @ManyToOne(() => User, (user) => user.analyzes_results)
    user: User
}