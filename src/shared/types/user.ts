interface DummyAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
}

export interface DummyUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  phone: string;
  birthDate: string;
  image: string;
  role: string;
  university: string;
  address: DummyAddress;
  company: {
    name: string;
    title: string;
    department: string;
  };
  bank: {
    cardType: string;
    cardNumber: string;
    cardExpire: string;
  };
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  phone: string;
  birthDate: string;
  image: string;
  role: string;
  university: string;
  address: DummyAddress;
  company: {
    name: string;
    title: string;
    department: string;
  };
  card: {
    type: string;
    last4: string;
    expires: string;
  };
}
