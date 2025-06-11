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
};
