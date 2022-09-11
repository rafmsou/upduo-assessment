import { User } from "./user";

export interface RandomUserAPIResponse {
  results: User[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface UserFilter {
  nat?: string;
  gender?: string;
}

export type UserFields =
  | "gender"
  | "name"
  | "location"
  | "email"
  | "login"
  | "registered"
  | "dob"
  | "phone"
  | "cell"
  | "id"
  | "picture"
  | "nat";
