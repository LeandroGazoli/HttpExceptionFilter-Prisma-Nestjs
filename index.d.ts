import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
export declare class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void;
}
