import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission"));
    }

    next();
  };
};
