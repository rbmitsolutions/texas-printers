import { IHaccp, IRoles, IRoster } from "../company";

export type IUserStatus = "Working" | "Application" | "Filled";

export interface IUser {
  id: string;
  name: string;
  email: string;
  status: IUserStatus;
  roster_password: number;
  available_days?: IAvailableDays[];

  fixed_salary: boolean;
  salary?: number;
  rate_per_hour?: number;
  rate_per_hour_weekend?: number;

  date_of_birthday?: Date;
  sex?: string;
  contact_number?: string;
  shirt_size?: string;
  address?: string;
  city?: string;
  country?: string;

  profile_image?: string;
  id_profile_image?: string;

  bank?: string;
  iban?: string;
  account_number?: string;
  bic?: string;
  notes?: string;
  payment_id?: string;

  emergency_name?: string;
  emergency_contact_number?: string;
  emergency_email?: string;
  emergency_city?: string;
  emergency_country?: string;
  emergency_adress?: string;

  visa_needed: boolean;
  visa_number?: string;
  visa_valid_until?: Date;
  type_of_visa?: string;
  id_work_authorization?: string;

  // refresh_token?: IRefreshToken;
  // token?: ITokens[];
  // requests?: IRequests[];
  roster?: IRoster[];
  documents?: IUserDocuments[];
  haccp?: IHaccp[];

  role_id?: string;
  role?: IRoles;
}

export interface IAvailableDays {
  weekDay: string;
  available: boolean;
  shift: string[];
}

export interface IUserDocuments {
  id: string;
  title: string;
  public_id: string;
  signature: string;
  url: string;
  secure_url: string;
  user_id: string;
}
