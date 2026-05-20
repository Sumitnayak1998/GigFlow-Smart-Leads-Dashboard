import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { env } from "../config/env";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as StringValue,
  });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, env.jwtSecret) as { userId: string };
};
