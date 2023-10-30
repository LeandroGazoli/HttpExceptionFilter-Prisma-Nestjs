<p align="center">Error handle for prisma.io with NestJs / Captura de erros do prisma.io com NestJS</p>

## Installing

### Package manager

Using npm:

```bash
$ npm i http-exception-filter-prisma-nestjs
```

## Main file

```js
import { HttpExceptionFilter } from 'http-exception-filter-prisma-nestjs';
```

Add the code inside your Bootstrap function / Adicione o codigo dentro de sua função Bootstrap

```js
app.useGlobalFilters(new HttpExceptionFilter());
```

example / exemplo

```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();
  await app.listen(3001);
}
bootstrap();
```

## Module file (app.module.ts)

```js
import { HttpExceptionFilter } from 'http-exception-filter-prisma-nestjs';
```

add the snippet below in providers / adicione o trecho abaixo em providers

```json
PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
```

example of use / exemplo de uso

```js
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```
