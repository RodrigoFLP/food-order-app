export interface SignupForm {
  firstName: string;
  lastname: string;
  phoneNumber: string;
  birthDate: Date;
  email: string;
  password: string;
  state: string;
  city: string;
  locality: string;
  addressLine1: string;
  addressLine2: string;
  addressReference: string;
}

export interface SignUpBody {
  email: string;
  password: string;
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: Date;
    receiveAds: boolean;
    address: {
      state: string;
      city: string;
      addressLine1: string;
      addressLine2: string;
      addressReference: string;
      lat: number;
      lon: number;
    };
  };
}
