import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './app.error';
import { ServiceError } from './service.error';

@Catch()
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message,
      });
    }

    if (exception instanceof AppError) {
      const statusCode = this.getAppErrorCode(exception);
      return response.status(statusCode).json({
        statusCode,
        message: exception.message,
      });
    }

    console.error(exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }

  getAppErrorCode(exception: AppError) {
    if (exception instanceof ServiceError) {
      return HttpStatus.BAD_REQUEST;
    }
    throw new Error('Unhandled error');
  }
}
