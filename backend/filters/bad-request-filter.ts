import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestFilter extends BaseExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json(exception.getResponse());
  }
}
