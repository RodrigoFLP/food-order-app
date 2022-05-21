export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: Portion[];
  tags: Tag[];
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  src: string;
}

export interface Portion {
  id: number;
  name: string;
  price: number;
  tagGroups: TagGroup[];
}

export interface TagGroup {
  id: number;
  description: string;
  max: number;
  min: number;
  name: string;
  tags: Tag[];
  hidden: boolean;
}

export interface Tag {
  id: number;
  name: string;
  rate?: number;
  price: number;
  maxQuantity?: number;
  ratio: number;
  value: string;
}
