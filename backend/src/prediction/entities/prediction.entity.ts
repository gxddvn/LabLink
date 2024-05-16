import { User } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Prediction {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    gender: string;
    @Column()
    age: string;
    @Column()
    hypertension: string;
    @Column()
    heart_disease: string;
    @Column()
    smoking_history: string;
    @Column()
    bmi: string;
    @Column()
    HbA1c_level: string;
    @Column()
    blood_glucose_level: string;
    @Column()
    diabetes: string;
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.predictions)
    user: User
}