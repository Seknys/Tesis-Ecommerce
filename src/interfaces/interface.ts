export interface Icategories {
  img: string;
  name: string;
  uid: string;
}


export interface Iproducts {
  catUid: string;
  category: string;
  desc:string;
  img: string;
  name: string;
  sold: number;
  price: number;
  tags: string[];
  uid: string;

}
