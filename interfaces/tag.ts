import { IProduct } from "./product";

export interface Tag {
  id: number;
  name: string;
  description: string;
  image: string | null;
  productsList: IProduct[];
}
