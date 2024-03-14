import { IMenuType, IType } from "./menu";


export type ITableMealStatus =
  | "waiting"
  | "starters"
  | "main"
  | "all together"
  | "clean table";

export interface ITable {
  id: string;

  number: number;

  start_time: Date;
  food_ordered_at: Date;
  pass: number;

  meal_status: ITableMealStatus
  is_open: boolean;

  guests: number;

  booking_id?: string | null;
  client_id?: string | null;
  client_name?: string | null;
  finished_table_id?: string | null;

  order_controller: IOrderController[];

  section_id: string;

  created_at: Date;
  updated_at: Date;
}

export type IOrderStatus = "ordered" | "cancelled" | "returned" | "delivered";

export interface IOrder {
  id: string;

  status: IOrderStatus;
  quantity: number;
  paid: number;

  mn_type: IMenuType;
  mn_section: string;

  price: number;
  
  menu: string;
  menu_id: string;
  menu_short_title: string
  
  add_ons: IAddOnsCreateOrder[]

  to_print_ips: string[];

  order_controller: IOrderController;
  order_controller_id: string;

  created_at: Date;
  updated_at: Date;
}

export interface IOrderController {
  id: string;
  number: number
  
  waiter: string;
  waiter_id: string;

  client_id: string;

  table: ITable | null;
  table_id: string | null;

  // finished_table: IFinishedTable | null;
  // finished_table_id: string | null;

  orders: IOrder[];

  created_at: Date;
  updated_at: Date;
}

export interface IAddOnsCreateOrder {
  add_ons_id: string
  add_ons_opt_id: string
  title: string
  price: number
  is_mandatory: boolean
}


































export interface IExtraSide {
  title: string;
  price: number;
}

export interface IOrderConfig {
  doneness?: string;
  sauce?: {
    title?: string;
    price?: number;
  };
  side?: string;
  extra_side: IExtraSide[];
  notes?: string;
  quantity: number;
  extra_notes: string[];
}

export interface ICreateOrder {
  status: IOrderStatus;
  quantity: number;

  type: IType;
  menu_type: IMenuType;

  price: number;
  description: string;

  menu: string;
  menu_id: string;
}
