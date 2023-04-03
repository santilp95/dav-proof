/* eslint-disable prettier/prettier */
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class SeedCommand {
    constructor(private readonly prismaService: PrismaService) { }

    @Command({
        command: 'seed',
        describe: 'Seed database with initial data',
    })
    async seed() {
        const users = [
            {
                first_name: 'Camilo',
                last_name: 'López',
                date_birth: '24/03/1997',
                address: 'AV 123',
                password: await hash('123456', 10),
                mobile_pho: '3217654321',
                email: 'camilonose@hotmail.com',
            },
            {
                first_name: 'Santiago',
                last_name: 'López',
                date_birth: '24/03/1995',
                address: 'AV 321',
                password: await hash('123456', 10),
                mobile_pho: '3217654321',
                email: 'santiagolopezamaya@hotmail.com',
            }
        ];

        // insert the users into the database
        for (const user of users) {
            await this.prismaService.user.create({ data: user });
        }

        console.log('Database seeded successfully!');
    }
}
