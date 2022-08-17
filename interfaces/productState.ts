export interface TagGroupState {
  name: string;
  quantity: number;
  tags: TagState[];
}

export interface TagState {
  name: string;
  value: string;
  quantity: number;
  price: number;
}

export interface PortionState {
  id: string;
  name: string;
  price: number;
}

export interface OrderItemState {
  orderItemId: string;
  productId: number;
  productName: string;
  quantity: number;
  portion: PortionState;
  tagsGroups: TagGroupState[];
  unitPrice: number;
  price: number;
  image: string;
}
