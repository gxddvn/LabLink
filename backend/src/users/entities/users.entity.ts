import { AnalyzesResult } from 'src/analyzes-result/entities/analyzes-result.entity';
import { Prediction } from 'src/prediction/entities/prediction.entity';
import { Record } from 'src/records/entities/records.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column()
    password: string;
    @Column()
    gender: string;
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @OneToMany(() => AnalyzesResult, (analyzes_results) => analyzes_results.user)
    analyzes_results: AnalyzesResult[]

    @OneToMany(() => Prediction, (predictions) => predictions.user)
    predictions: Prediction[]

    @OneToMany(() => Record, (records) => records.user)
    records: Record[]
}