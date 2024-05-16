import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";
import { Record } from "./entities/records.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Record])],
    exports: [TypeOrmModule],
    controllers: [RecordsController],
    providers: [RecordsService],
})

export class RecordsModule {}