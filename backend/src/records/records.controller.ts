import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './entities/records.entity';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { Request } from 'express';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<Record[]> {
        return this.recordsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOne(@Param('id') id: string): Promise<Record> {
        return this.recordsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() record: Record, @Req() req: Request): Promise<Record> {
        return this.recordsService.create(record, req.user);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() record: Record): Promise<Record> {
        record.id = id;
        return this.recordsService.update(record);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string): Promise<void> {
        return this.recordsService.remove(id);
    }
}
