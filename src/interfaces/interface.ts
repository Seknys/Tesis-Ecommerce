export interface Icategories {
  img: string;
  name: string;
  uid: string;
}

export interface Iproducts {
  catUid: string;
  category: string;
  desc: string;
  img: string;
  name: string;
  sold: number;
  price: number;
  tags: string[];
  uid: string;
  feat: string[];
  stock: number;
}

export interface Iuser {
  uid: string;
  name: string;
  email: string;
  lastName: string;
  phone: string;
  role: string;
  img: string;
  orders: string[];
  cart: string[];
  wish: string[];
  date: Date;
}
