import { IProduct } from "./product";

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  productsList: IProduct[];
}
