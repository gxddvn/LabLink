import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyzesResult } from "./entities/analyzes-result.entity";
import { AnalyzesResultController } from "./analyzes-result.controller";
import { AnalyzesResultService } from "./analyzes-result.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([AnalyzesResult]),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: configService.get<string>('MAIL_TRANSPORT'),
                defaults: {
                    from: `"${configService.get<string>('MAIL_FROM_NAME')}" <${configService.get<string>('MAIL_TRANSPORT').split(':')[1].split('//')[1]}>`,
                },
            }),
        }),
        UsersModule,
    ],
    exports: [TypeOrmModule],
    controllers: [AnalyzesResultController],
    providers: [AnalyzesResultService],
})

export class AnalyzesResultModule {}