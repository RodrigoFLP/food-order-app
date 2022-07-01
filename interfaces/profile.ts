import { Ticket } from "./ticket";

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
  id: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: null;
  addressReference: string;
  coordinates: string;
  createdAt: Date;
  updatedAt: Date;
}
