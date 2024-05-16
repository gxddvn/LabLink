import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { Record } from './records/entities/records.entity';
import { AnalyzesResult } from './analyzes-result/entities/analyzes-result.entity';
import { RecordsModule } from './records/records.module';
import { AnalyzesResultModule } from './analyzes-result/analyzes-result.module';
import { PredictionModule } from './prediction/prediction.module';
import { Prediction } from './prediction/entities/prediction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User, Record, AnalyzesResult, Prediction],
        synchronize: true,
      })
    }), 
    UsersModule,
    RecordsModule,
    AnalyzesResultModule,
    PredictionModule,
  ],
})
export class AppModule {
  constructor() {}
}
