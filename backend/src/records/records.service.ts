import { Injectable } from "@nestjs/common";
import { Record } from "./entities/records.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(Record)
        private RecordsRepository: Repository<Record>,
    ) {}
    findAll(): Promise<Record[]> {
        return this.RecordsRepository.find();
    }
    findOne(id: string): Promise<Record | null> {
        return this.RecordsRepository.findOneBy({ id });
    }
    async remove(id: string): Promise<void> {
        await this.RecordsRepository.delete(id);
    }
    async create(Record: Record, user: any): Promise<Record> {
        Record.user = user.id
        return this.RecordsRepository.save(Record);
    }
    async update(Record: Record): Promise<Record> {
        return this.RecordsRepository.save(Record);
    }
}