import { Module } from '@nestjs/common';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prediction]), UsersModule],
  exports: [TypeOrmModule],
  controllers: [PredictionController],
  providers: [PredictionService]
})
export class PredictionModule {}
