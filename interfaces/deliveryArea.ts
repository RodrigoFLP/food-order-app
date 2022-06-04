export interface DeliveryArea {
  id: number;
  isActive: boolean;
  coordinates: Coordinate[];
}

export interface Coordinate {
  id: number;
  lat: number;
  lon: number;
}
