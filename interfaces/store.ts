import { Tag } from "./tag";

export interface Store {
  id: number;
  name: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string | null;
  addressReference: string | null;
  phoneNumber: string;
  whatsappNumber: string | null;
  facebook: string | null;
  instagram: string | null;
  isDeliveryEnabled: boolean;
  isPickupEnabled: boolean;
  isTaxEnabled: boolean;
  isCashPaymentEnabled: boolean;
  isWompiPaymentEnabled: boolean;
  isDeliveryCostEnabled: boolean;
  isSchedulingEnabled: boolean;
  productException: boolean;
  lat: number;
  lon: number;
  deliveryCost: number | null | string;
  whatsapp: string | null;
  headerImage: string | null;
  headerUrl: string | null;
  defaultHomeTagCategory: Tag | null;
}
