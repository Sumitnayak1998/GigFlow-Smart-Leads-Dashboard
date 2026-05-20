import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  res.status(201).json(new ApiResponse("User registered successfully", result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  res.status(200).json(new ApiResponse("Login successful", result));
});
