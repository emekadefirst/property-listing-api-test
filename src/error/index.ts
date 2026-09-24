
export const HandleErrorResponse = (error: any) => {
  const safeErrorState = error?.response?.data  || error || [];
  const errorCap = safeErrorState?.message || safeErrorState[0]?.message || safeErrorState[0] || error;
  return errorCap;
};


export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly errors?: Array<{ field?: string; message: string }> | any
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400, "BAD_REQUEST");
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation error") {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class QuotaExceededError extends AppError {
  constructor(message = "Usage quota exceeded") {
    super(message, 402, "QUOTA_EXCEEDED");
    this.name = "QuotaExceededError";
  }
}
