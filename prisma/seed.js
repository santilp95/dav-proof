/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
    PrismaClient
} = require('@prisma/client');
const { hash }  = require('bcrypt');

const prisma = new PrismaClient();
async function seed() {


    try {
        await prisma.user.upsert({
            where: {
                id: 1,
            },
            update: {},
            create: {
                id: 1,
                first_name: 'tana',
                last_name: 'López',
                date_birth: '24/07/1997',
                address: 'AV 123',
                password: await hash('123456', 10),
                mobile_pho: '23423434',
                email: 'algo@hotmail.com',
            }
        });

        await prisma.user.upsert({
            where: {
                id: 2,
            },
            update: {},
            create: {
                id: 2,
                first_name: 'prueba',
                last_name: 'prueba',
                date_birth: '24/07/1997',
                address: 'AV prueba',
                password: await hash('123456', 10),
                mobile_pho: 'prueba',
                email: 'prueba@prueba.com',
            }
        });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

seed().then(async () => {
    await prisma.$disconnect();
}).catch((e) => {
    console.error(e);
    process.exit(1);
});