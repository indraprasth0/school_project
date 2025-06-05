export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IActionResponce<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  unauthorized?: boolean;
}