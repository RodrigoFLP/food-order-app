export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: null;
  receiveAds: boolean;
  addresses: Address[];
  tickets: Ticket[];
  email: string;
}

export interface Address {
  id: number;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: null;
  addressReference: string;
  coordinates: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: number;
  couponId: string;
  totalAmount: string;
  status: string;
  orderType: string;
  scheduledDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
