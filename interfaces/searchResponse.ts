import { Product } from "./ticket";

export interface SearchResponse {
  result: Product[];
  count: number;
}
