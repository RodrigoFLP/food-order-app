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
  name: string;
  price: number;
}

export interface OrderState {
  orderId: string;
  productId: number;
  productName: string;
  quantity: number;
  portion: PortionState;
  tagsGroups: TagGroupState[];
  unitPrice: number;
  price: number;
}
