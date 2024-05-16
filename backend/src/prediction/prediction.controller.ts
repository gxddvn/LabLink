import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';
import { PredictionService } from './prediction.service';
import { PredictionDto } from './dto/predictions.dto';
import { Prediction } from './entities/prediction.entity';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';

@Controller('prediction')
export class PredictionController {

    constructor(private readonly predictionService: PredictionService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<Prediction[]> {
        return this.predictionService.getAll();
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOne(@Param('id') id: string): Promise<Prediction> {
        return this.predictionService.getOne(id);
    }
    @Get('/getallbyid/:id')
    @UseGuards(JwtAuthGuard)
    getAllById(@Param('id') id: string): Promise<Prediction[]> {
        return this.predictionService.getAllById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async predict(@Body() inputData: any): Promise<Prediction> {
        return await this.predictionService.createPredict(inputData);
    }
}
