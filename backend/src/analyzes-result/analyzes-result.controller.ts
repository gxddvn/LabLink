import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AnalyzesResultService } from './analyzes-result.service';
import { AnalyzesResult } from './entities/analyzes-result.entity';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

@Controller('analyzes-result')
export class AnalyzesResultController {
    constructor(private readonly analyzesResultService: AnalyzesResultService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<AnalyzesResult[]> {
        return this.analyzesResultService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOne(@Param('id') id: string): Promise<AnalyzesResult> {
        return this.analyzesResultService.findOne(id);
    }

    @Get('/sendpdf/:id')
    @UseGuards(JwtAuthGuard)
    sendOnEmailPdf(@Param('id') id: string) {
        return this.analyzesResultService.createPdfAndSend(id);
    }

    @Get('/getusersall/:id')
    @UseGuards(JwtAuthGuard)
    getAllUsersAnalyzesRes(@Param('id') id: string) {
        return this.analyzesResultService.findAllById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() analyzesResult: AnalyzesResult): Promise<AnalyzesResult> {
        return this.analyzesResultService.create(analyzesResult);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() analyzesResult: AnalyzesResult): Promise<AnalyzesResult> {
        analyzesResult.id = id;
        return this.analyzesResultService.update(analyzesResult);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string): Promise<void> {
        return this.analyzesResultService.remove(id);
    }
}
