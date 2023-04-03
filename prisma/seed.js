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
                first_name: 'Santiago',
                last_name: 'López',
                date_birth: '24/03/1995',
                address: 'AV 123',
                password: await hash('123456', 10),
                mobile_pho: '3217654321',
                email: 'algo@hotmail.com',
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