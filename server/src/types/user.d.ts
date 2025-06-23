import { Request } from "express";

export type UserPayload = {
  email: string;
  password: string;
  user_name: string;
  user_town: string;
  phone?: string;
};

export type User = {
  user_id: number;
  email: string;
  user_name: string;
  user_town: string;
  phone?: string;
  created_at: Date;
};

export type UserPassword = {
  user_id: number;
  email: string;
  password: string;
};

export interface RequestWithUser extends Request {
  user: User
}
