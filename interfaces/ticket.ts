import { Customer } from "./customer";
import { Portion } from "./product";
import { Address } from "./profile";

export interface Ticket {
  id: string;
  couponId: string;
  totalAmount: string;
  orderType: "pickup" | "delivery";
  status: Status;
  storeId: string;
  scheduledDate: string;
  createdAt: string;
  updatedAt: string;
  ticketItems: TicketItem[];
  customer?: Customer;
  address?: Address;
}

export interface TicketCalculation {
  orderType: string;
  ticketItems: TicketItem[];
  totalAmount: string;
}

export enum StatusType {
  PLACED = "OrderPlaced",
  PAID = "OrderPaid",
  CONFIRMED = "OrderConfirmed",
  PREPARED = "OrderPrepared",
  DELIVERED = "OrderReceived",
}

export interface Status {
  id: number;
  orderPlaced: Date | null;
  orderPaid: Date | null;
  orderConfirmed: Date | null;
  orderPrepared: Date | null;
  orderReceived: Date | null;
}

export interface TicketMutation {
  id?: string;
  customerAddressId: string | undefined;
  couponId?: string;
  totalAmount?: string;
  orderType: string;
  status?: string;
  storeId: number;
  scheduledDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TicketItem {
  id: number;
  quantity: number;
  portion: Portion;
  tags: TicketTag[];
  totalAmount: string;
  product: Product;
}

export interface TicketTagGroup {
  id: number;
  max: number;
  min: number;
  name: string;
  tags: TicketTag[];
  hidden: boolean;
}

export interface TicketTag {
  id: number;
  name: string;
  price: number;
  ratio?: number;
  value: string;
  quantity?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: Portion[];
  tags: TicketTag[];
  image: string;
  createdAt: string;
  updatedAt: string;
}
