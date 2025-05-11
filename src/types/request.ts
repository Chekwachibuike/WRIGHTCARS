import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
} 