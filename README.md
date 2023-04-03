<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

Proyecto realizado con

- [Nest](https://github.com/nestjs/nest)
- [Prisma](https://www.prisma.io/)
- [postgresql](https://www.postgresql.org/)

## Comienzo

Este proyecto se puede correr como un proyecto de nest y hay dos opciones con docker y node

### Docker

1. Para esto hay que tener previamente docker en el computador instalado

```bash
docker-compose up -d
```

### Nodejs

1. Toca tener previamente instalado postgres
2. Instalar nodejs
3. Instalar prisma

```bash
npm npm install -g prisma
```

4. instalar el proyecto como se ve en **Instalacion**

#### Instalacion

```bash
npm install
```

##### User prisma

Para llenar la bd con prisma

```bash
npx run seed
```

si desea mas datos puede ejecutar el siguiente comando

```bash
npx nestjs-command seed
```

```bash
npx prisma migrate dev --name init
```

Para realizar cambios en prisma

```bash
npx prisma migrate generate
```

##### Correr la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

##### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
