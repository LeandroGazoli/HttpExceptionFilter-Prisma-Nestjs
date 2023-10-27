import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception.code) {
      switch (exception.code) {
        case 'P2000':
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'The provided value for the column is too long for the column type';
          break;
        case 'P2001':
          statusCode = HttpStatus.NOT_FOUND;
          message = `The requested record in the where condition does not exist: ${exception?.meta?.model}.${exception?.meta?.field} = ${exception?.meta?.value}`;
          break;
        case 'P2002':
          statusCode = HttpStatus.CONFLICT;
          message = `Uniqueness constraint failure in ${exception?.meta?.target}`;
          break;
        case 'P2003':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Foreign key constraint failure in the column: ${exception?.meta?.target}`;
          break;
        case 'P2004':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `A database constraint failed: ${exception?.message}`;
          break;
        case 'P2005':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `The value ${exception?.meta?.value} stored in the database for the field ${exception?.meta?.field} is invalid for the field type`;
          break;
        case 'P2006':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `The provided value ${exception?.meta?.value} for the field ${exception?.meta?.model}.${exception?.meta?.field} is not valid`;
          break;
        case 'P2007':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Data validation error: ${exception?.message}`;
          break;
        case 'P2008':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Transaction API error: ${exception?.meta?.error}`;
          break;
        case 'P2009':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Query validation error: ${exception?.meta?.query_validation_error} at ${exception?.meta?.query_position}`;
          break;
        case 'P2010':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Raw query failure. Code: ${exception?.meta?.code}. Message: ${exception?.meta?.message}`;
          break;
        case 'P2011':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Nullity constraint violation in ${exception?.meta?.target ?? exception?.meta?.constraint}`;
          break;
        case 'P2012':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Missing mandatory value in ${exception?.meta?.path}`;
          break;
        case 'P2013':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Missing mandatory argument ${exception?.meta?.argument_name} for the field ${exception?.meta?.field_name} in ${exception?.meta?.object_name}`;
          break;
        case 'P2014':
          statusCode = HttpStatus.CONFLICT;
          message = `The change you're trying to make would violate the required relationship '${exception?.meta?.relation_name}' between models ${exception?.meta?.model_a_name} and ${exception?.meta?.model_b_name}`;
          break;
        case 'P2015':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Related record not found: ${exception?.meta?.details}`;
          break;
        case 'P2016':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Query interpretation error: ${exception?.meta?.details}`;
          break;
        case 'P2017':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Records in the relationship ${exception?.meta?.relation_name} between models ${exception?.meta?.parent_name} and ${exception?.meta?.child_name} are not connected`;
          break;
        case 'P2018':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Required connected records were not found: ${exception?.meta?.details}`;
          break;
        case 'P2019':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Input error: ${exception?.meta?.details}`;
          break;
        case 'P2020':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Value out of range for the type: ${exception?.meta?.details}`;
          break;
        case 'P2021':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `The table ${exception?.meta?.table} does not exist in the current database`;
          break;
        case 'P2022':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `The column ${exception?.meta?.column} does not exist in the current database`;
          break;
        case 'P2023':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Inconsistent column data: ${exception?.message}`;
          break;
        case 'P2024':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Timeout while acquiring a new connection in the connection pool. (More information: http://pris.ly/d/connection-pool) (Current connection pool timeout: ${exception?.meta?.timeout}, connection limit: ${exception?.meta?.connection_limit})`;
          break;
        case 'P2025':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `An operation failed because it depends on one or more required records that were not found: ${exception?.meta?.cause}`;
          break;
        case 'P2026':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `The current database provider does not support a feature used in the query: ${exception?.meta?.feature}`;
          break;
        case 'P2027':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Multiple database errors occurred during query execution: ${exception?.meta?.errors}`;
          break;
        case 'P2028':
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `Transaction API error: ${exception?.meta?.error}`;
          break;
        case 'P2030':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `A full-text index for search could not be found. Try adding @@fulltext([Fields...]) to your schema`;
          break;
        case 'P2031':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `Prisma needs to perform transactions, which requires your MongoDB server to run as a replica set. See details: http://pris.ly/d/mongodb-replica-set`;
          break;
        case 'P2033':
          statusCode = HttpStatus.BAD_REQUEST;
          message = `A number used in the query does not fit in a 64-bit signed integer. Consider using BigInt as a field type if you're trying to store large integers`;
          break;
        case 'P2034':
          statusCode = HttpStatus.CONFLICT;
          message = `The transaction failed due to a write conflict or deadlock. Please try your transaction again`;
          break;
      }
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: exception,
    });
  }
}
