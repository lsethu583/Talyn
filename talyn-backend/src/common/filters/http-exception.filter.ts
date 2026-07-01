import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Every error the API returns — expected or not — comes out in this exact
// shape, so the frontend never has to special-case a response format.
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message = this.extractMessage(exceptionResponse, exception);
    const code = this.extractCode(exceptionResponse, status);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} -> ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(status).json({
      success: false,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private extractMessage(exceptionResponse: any, exception: unknown): string {
    if (typeof exceptionResponse === 'string') return exceptionResponse;
    if (exceptionResponse?.message) {
      return Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message.join(', ')
        : exceptionResponse.message;
    }
    return exception instanceof Error ? exception.message : 'Internal server error';
  }

  private extractCode(exceptionResponse: any, status: number): string {
    if (exceptionResponse?.code) return exceptionResponse.code;
    // Falls back to a generic code derived from the HTTP status so the
    // frontend always has *something* stable to switch on.
    return `HTTP_${status}`;
  }
}
