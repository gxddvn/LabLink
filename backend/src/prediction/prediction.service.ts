import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as tf from '@tensorflow/tfjs';
import { DataSetPredictionDto, PredictionDto } from './dto/predictions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';


function smokingHistoryEncoded(smokingHistory: string) {
    let result = 0;
    if (smokingHistory === "No info") {
        result = 1
    } 
    else if (smokingHistory === "never") {
        result = 2
    }
    else if (smokingHistory === "former") {
        result = 3
    }
    else if (smokingHistory === "current") {
        result = 4
    }
    else {
        result = 5
    }
    return result;
}

function genderEncoded(gender: string) {
    let result = 0;
    if (gender === "Male") {
        result = 1
    } 
    else {
        result = 2
    }
    return result;
}

@Injectable()
export class PredictionService {
    private model: tf.Sequential;
    private mean: tf.Tensor1D;
    private stdDev: tf.Tensor1D;

    private normalizeData(data: tf.Tensor2D): tf.Tensor2D {
        return data.sub(this.mean).div(this.stdDev);
    }

    constructor(
        @InjectRepository(Prediction)
        private predictionRepository: Repository<Prediction>,
    ) {
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({ inputShape: [8], units: 10, activation: 'relu' }));
        this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
        const diabetesData: DataSetPredictionDto[] = [];
        fs.createReadStream('D:/sitesprog/LabLink/backend/src/prediction/diabetes_prediction_dataset.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            diabetesData.push(row);
        })
        .on('end', () => {
            const inputs = tf.tensor2d(diabetesData.map(item => [
                genderEncoded(item.gender), parseFloat(item.age), parseFloat(item.hypertension),
                parseFloat(item.heart_disease),  smokingHistoryEncoded(item.smoking_history), parseFloat(item.bmi),
                parseFloat(item.HbA1c_level), parseFloat(item.blood_glucose_level)
            ]));
            const { mean, variance } = tf.moments(inputs, 0) as { mean: tf.Tensor1D, variance: tf.Tensor1D };
            this.mean = mean;
            this.stdDev = tf.sqrt(variance);
            const normalizedInputs = this.normalizeData(inputs);
            const labels = tf.tensor2d(diabetesData.map(item => parseFloat(item.diabetes)), [diabetesData.length, 1]);
            console.log('Start Model training!')
            this.model.fit(normalizedInputs, labels, { epochs: 100 })
            .then(() => console.log('Model trained!'));
            // const savePath = path.resolve('./prediction-model');
            // this.model.save('file:///prediction-model');
            // this.model.save('localstorage://prediction-model')
        })
        .on('error', (error) => {
            console.error(error);
        });
    }

    async createPredict(inputData: DataSetPredictionDto): Promise<Prediction> {
        const testData = tf.tensor2d([
            genderEncoded(inputData.gender), 
            parseFloat(inputData.age), 
            parseFloat(inputData.hypertension),
            parseFloat(inputData.heart_disease), 
            smokingHistoryEncoded(inputData.smoking_history), 
            parseFloat(inputData.bmi),
            parseFloat(inputData.HbA1c_level), 
            parseFloat(inputData.blood_glucose_level)
        ], [1, 8]);
        

        const normalizedTestData = (this.normalizeData(testData) as tf.Tensor2D);
        const prediction = (this.model.predict(normalizedTestData) as tf.Tensor2D).dataSync()[0];
        if (!prediction) {
            throw new HttpException("Not Acceptable", HttpStatus.NOT_ACCEPTABLE)
        }
        inputData.diabetes = `${Math.round(prediction)}`
        console.log(inputData)
        const predict = await this.predictionRepository.save(inputData);
        return predict;
    }

    getAll(): Promise<Prediction[]> {
        return this.predictionRepository.find()
    }

    getOne(id: string): Promise<Prediction> {
        return this.predictionRepository.findOneBy({ id })
    }
    
    getAllById(id: string): Promise<Prediction[]> {
        return this.predictionRepository.find({where: {user: {id}}})
    }
}
