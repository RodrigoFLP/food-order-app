export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: Portion[];
  tags: Tag[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portion {
  id: number;
  name: string;
  price: number;
  tagGroups: TagGroup[];
}

export interface TagGroup {
  id: number;
  max: number;
  min: number;
  name: string;
  tags: Tag[];
  hidden: boolean;
}

export interface Tag {
  id: number;
  name: string;
  price: number;
  ratio: number;
  value: string;
}
