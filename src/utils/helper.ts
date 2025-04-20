import { Response } from "express";

interface SuccessResponseOptions {
  message?: string;
  data?: unknown;
  statusCode?: number;
  successCode?: string;
}

export const successResponse = (
  res: Response,
  { message = 'Success', data, statusCode = 201, successCode = 'SUCCESS' }: SuccessResponseOptions
) => {
  return res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    successCode,
    data,
  });
};

interface ErrorResponseOptions {
  message?: string;
  statusCode?: number;
  errorCode?: string;
  details?: Record<string, any> | null;
}

export const errorResponse = (
  res: Response,
  { message = 'Error', statusCode = 500, errorCode = 'UNKNOWN_ERROR', details }: ErrorResponseOptions
) => {
  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    errorCode,
    details,
  });
};


