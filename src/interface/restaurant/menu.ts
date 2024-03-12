export type IType =
  | "Starters"
  | "Chicken Dishes"
  | "Fish Dishes"
  | "Burgers"
  | "Steaks"
  | "Mexican Dishes"
  | "Vegan Dishes"
  | "Desserts"
  | "Wines"
  | "Beers"
  | "Cocktails"
  | "Spirits"
  | "Soft Drinks"
  | "Sides"
  | "Kids Menu";

export type IMenuType =
  | "Starters"
  | "Main Course"
  | "Desserts"
  | "Bar"
  | "Sides"
  | "Kids Menu"
  | "Extra Sides";

export type IMenuImages = {
  id: string;
  url: string;
  secure_url: string;
  public_id: string;
};

export type IMenExtra = {
  title: string;
  options: string[];
};

export interface IMenu {
  id: string;
  title: string;
  short_title?: string;
  description: string;
  thumbnail: string;
  thumbnail_id: string;
  price: number;
  images: IMenuImages[];
  video?: string;
  sides: string[];
  allergies: string[];
  type: IType;
  menu_type: IMenuType;
  profit: number;
  highlight: boolean;
  website: boolean;
  extra?: IMenExtra[];
}
