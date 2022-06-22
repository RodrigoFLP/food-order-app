export interface Store {
  id: number;
  name: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: null;
  addressReference: null;
  phoneNumber: string;
  isDeliveryEnabled: boolean;
  isPickupEnabled: boolean;
  isSchedulingEnabled: boolean;
  productException: boolean;
}
