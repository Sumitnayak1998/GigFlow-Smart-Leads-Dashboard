import { User } from "../models/user.model";
import { LoginInput, RegisterInput } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";
import { generateToken } from "../utils/jwt";

interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export const registerUser = async (
  input: RegisterInput
): Promise<AuthResult> => {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: input.password,
    role: input.role || "sales",
  });

  const token = generateToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (input: LoginInput): Promise<AuthResult> => {
  const user = await User.findOne({ email: input.email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(input.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
