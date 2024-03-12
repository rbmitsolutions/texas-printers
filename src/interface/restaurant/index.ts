export type IBookingStatus =
  | "confirmed"
  | "unconfirmed"
  | "canceled"
  | "arrived"
  | "not_shown"
  | "walk_in";

export interface IBooking {
  id: string;
  date: Date;
  weekDay: string;
  amount_of_people: number;
  amount_per_table: number;
  request?: string;
  review_id?: string;
  table_id?: string;

  status: IBookingStatus;

  scheduledate?: string;

  has_request: boolean;

  cancelation_comment?: string;
  cancelation_reason?: "dashboard" | "user";

  client_id?: string;
  client?: IClient;

  time: string;
}

export interface IClient {
  id: string;
  email: string;
  name: string;
  contact_number: string;
  valid_number: boolean;
  blocked: boolean;
  qnt_of_bookings: number;
  complaints: number;
  bookings?: IBooking[];
  reviews?: IReviews[];
  restaurant_review: number;
  staff_review: number;
}

export interface IReviews {
  id: string;
  type: "restaurant" | "staff";

  review: {
    food: number;
    service: number;
    ambiance: number;

    welcoming: number;
    knowledge: number;
    requests: number;
    timing: number;
    atmosphere: number;

    comment?: string;
  };
  total: number;

  date: Date;

  client: IClient;
  client_id: string;
  key?: string;

  user_photo?: string;
  user_name?: string;
}

export interface IStaffReview {
  welcoming: number;
  knowledge: number;
  requests: number;
  timing: number;
  atmosphere: number;
  comment?: string;
}

export interface IRestaurantReview {
  food: number;
  service: number;
  ambiance: number;
  comment?: string;
}

export type IGiftCardStatus = "confirmed" | "sent" | "unsent" | "spent";
export interface IGiftCards {
  id: string;

  value: number;
  email: string;
  name: string;
  last_name: string;
  contact_number: string;
  message: string;

  name_to: string;
  address_to: string;
  address_2_to: string;

  city_to: string;
  country_to: string;
  eircode_to: string;
  stripe_secret: string;
  payed: boolean;
  token: string;

  sent_date: Date;
  sent_by: string;

  status: IGiftCardStatus;
  code: string;

  spent?: IGiftCardSpent[];

  updated_at: Date;
  created_at: Date;

  company_id: string;
}

export interface IGiftCardSpent {
  id: string;

  value: number;

  gift_card_id: string;
  gift_card: IGiftCards;

  created_at: Date;
  updated_at: Date;
}

export interface ITablesAvailable {
  id: number;
  amount_of_people: number;
  quantity: number;
  active: boolean;
}

export interface ITimesOpen {
  id: string;
  open: string;
  close: string;
  title: string;
  real_time: string;
  tables_available: ITablesAvailable[];
  active: boolean;
}
export interface IDays {
  id: number;
  day: string;
  short_day: string;
  times_open: ITimesOpen[];
}