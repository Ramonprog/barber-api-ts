// src/middleware/ErrorMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpException } from '../../types/HttpException';

export function ErrorMiddleware(err: HttpException | ZodError | Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 400,
      message: 'Validation error',
      errors: err.errors,
    });
  }

  if (err instanceof HttpException) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err); // Log the error for debugging purposes

  return res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
}
