import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private readonly mailerservice: MailerService) {}

    async sendMailConfirmation(user: User, token: string) {
        const url = `localhost:4200/auth/confirm?token=${token}`;
        await this.mailerservice.sendMail({
            to: user.email ? user.email : "user@email.com",
            subject: 'Inscription sur la plateforme Adecko',
            template: 'mailconfirmation',
            context: { 
                url: url,
            },
        });
    }
}