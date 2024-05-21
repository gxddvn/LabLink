import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import PDFDocumentWithTables from 'pdfkit-table';
import { AnalyzesResult } from "./entities/analyzes-result.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "src/users/entities/users.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AnalyzesResultService {
    constructor(
        @InjectRepository(AnalyzesResult)
        private AnalyzesResultRepository: Repository<AnalyzesResult>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) {}
    findAll(): Promise<AnalyzesResult[]> {
        return this.AnalyzesResultRepository.find();
    }
    findOne(id: string): Promise<AnalyzesResult | null> {
        return this.AnalyzesResultRepository.findOneBy({ id });
    }
    findAllById(id: string) {
        return this.AnalyzesResultRepository.find({where: {user: {id}}, take: 10})
    }
    async sendOnEmail(pdfBuffer: Buffer, email: string) {
        this.mailerService.sendMail({
            to: email, // list of receivers
            from: this.configService.get<string>('MAIL_FROM_NAME'), // sender address
            subject: 'LabLink ✔', // Subject line
            text: 'welcome LabLink', // plaintext body
            html: '<b>LabLink</b>', // HTML body content
            attachments: [
                {
                    filename: 'analyzes_result.pdf',
                    content: pdfBuffer,
                },
            ],
        })
        .then(() => {
            console.log("Send mail has done!")
        })
        .catch((e) => {
            throw new HttpException(
                `Помилка праці пошти: ${JSON.stringify(e)}`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        });
    }
    async createPdfAndSend(id: string) {
        const user = await this.usersRepository.findOneBy({ id });
        const analyzes_results = await this.AnalyzesResultRepository.find({where: {user: {id}}, take: 10})
        const data = analyzes_results.map((item)=>[
            `${item.createdAt.getFullYear()}-${item.createdAt.getMonth() + 1}-${item.createdAt.getDate()} ${item.createdAt.getHours()}:${item.createdAt.getMinutes()}:${item.createdAt.getSeconds()}`, item.total_protein, item.albumin, item.glucose, 
            item.urea, item.creatinine, item.total_cholesterol, 
            item.direct_bilirubin, item.total_bilirubin, item.alt, item.ast, 
            item.amylase, item.ldh, item.ck
        ])
        console.log(__dirname.replace('dist','src'))
        console.log("SendOnEmailPdf");
        const doc = new PDFDocumentWithTables();
        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        const fontMPath = __dirname.replace('dist','src') + '/Rubik-Medium.ttf';
        const fontSmPath = __dirname.replace('dist','src') + '/Rubik-SemiBold.ttf';
        doc.font(fontMPath); // Встановіть шрифт з підтримкою української мови
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#111827');
        doc.fillColor('white').font(fontSmPath).fontSize(28).text('Lab', { continued: true });
        doc.fillColor('#38BDF8').font(fontSmPath).fontSize(28).text('Link');
        doc.moveDown();
        doc.font(fontMPath);
        doc.fillColor('white')
        doc.fontSize(20).text('Результати аналізів', { align: 'center' }); // Додайте український текст до документу
        doc.moveDown();
        doc.fontSize(12).text(`Замовник: ${user?.name || "####"}`);
        doc.fontSize(12).text(`Дата та час відправки: ${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`);
        doc.moveDown();
        const table = { 
            title: '',
            headers: ['Дата та час',
            'Загальний білок',
            'Альбумін',
            'Глюкоза',
            'Сечовина',
            'Креатинін',
            'Холестерин загальний',
            'Білірубін прямий',
            'Білірубін загальний',
            'Грансаміназа АЛТ',
            'Грансаміназа АСТ',
            'Аміназа',
            'ЛДГ',
            'Креатинкіназа, КФК'],
            datas: [],
            rows: data,
        }
        const options = {
            prepareHeader: () => doc.font(fontMPath).fontSize(8).fillColor("white"),
            prepareRow: () => doc.font(fontMPath).fontSize(10).fillColor("white")
        }
        doc.table( table, options );
        doc.moveDown();
        doc.end();
        return new Promise<void>((resolve, reject) => {
            doc.on('end', async () => {
                try {
                    await this.sendOnEmail(Buffer.concat(buffers), user.email);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    async remove(id: string): Promise<void> {
        await this.AnalyzesResultRepository.delete(id);
    }
    async create(analyzesResult: AnalyzesResult, req: any): Promise<AnalyzesResult> {
        analyzesResult.user = req.id;
        return this.AnalyzesResultRepository.save(analyzesResult);
    }
    async update(analyzesResult: AnalyzesResult): Promise<AnalyzesResult> {
        return this.AnalyzesResultRepository.save(analyzesResult);
    }
}