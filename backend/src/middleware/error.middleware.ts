import { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors: unknown[] | undefined;

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
