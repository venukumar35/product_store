import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    console.log('Unhandled error');
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception.message);
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal server error';

    console.log(message);
    const prodErrorResponse: any = {
      statusCode,
      message,
    };
    response.status(statusCode).json(prodErrorResponse);
  }
}
