import {
  HttpException,
  HttpStatus,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const parsedErrorMessage =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message || exception.getResponse()
        : (exception as Error).message;

    const errorMessage = Array.isArray(parsedErrorMessage)
      ? `The following problem(s) were found: ${parsedErrorMessage.join(',')}`
      : parsedErrorMessage;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: (exception as Error | HttpException).name,
      message: errorMessage,
    });
  }
}
