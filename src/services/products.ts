import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  query,
  where,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/configFirebase";
import { Iproducts } from "../interfaces/interface";

const productRef = collection(db, "products");

export const getProductsByCategory = (
  category: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(productRef, where("catUid", "==", category));
  return onSnapshot(q, fSnapshot);
};

export const getProductByUid = (
  uid: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  return onSnapshot(doc(db, "products", uid), fSnapshot);
};

export const getCartProductsByUser = (
  uid: string,
  fSnapshot: (products: Iproducts[]) => void
) => {
  onSnapshot(query(collection(db, "users", uid, "cart")), (snapshot) => {
    const products: any[] = [];

    snapshot.forEach((doc) => {
      products.push({
        ...doc.data(),
        uid: doc.id,
      });
    });

    fSnapshot(products);
    // console.log("Productos del carritos: ", products);
  });
};

export const addProductToCart = (uid: string, product: any) => {
  //  doc(db, "users", uid, "cart", product.uid)

  // setDoc(addDoc(db, "users", uid, "cart", product.uid), product);

  //Set new doc in collection with a auto generate ID
  addDoc(collection(db, "users", uid, "cart"), product);

  console.log("DONE");
};
