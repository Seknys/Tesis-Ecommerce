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
import { IComments, Iproducts } from "../interfaces/interface";

const productRef = collection(db, "products");

export const getProductsByCategory = (
  category: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  console.log("CategoryBackEnd: ", category);
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
  return addDoc(collection(db, "users", uid, "cart"), product);
};

//Add product to firestore
export const addProduct = (product: Iproducts) => {
  return addDoc(productRef, product);
};

//Unused
export const updateProduct = (uid: string, product: Iproducts) => {
  return setDoc(doc(db, "products", uid), product);
};
//Unused
export const deleteProduct = (uid: string) => {
  return setDoc(doc(db, "products", uid), { stock: 0 });
};
//Unused
export const getProductsBySearch = (
  search: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(productRef, where("name", "==", search));
  return onSnapshot(q, fSnapshot);
};

export const getCommetsbyProduct = (
  uid: string,
  fSnapshot: (snapshot: IComments[]) => void
) => {
  return onSnapshot(
    query(collection(db, "products", uid, "comments")),
    (snapshot) => {
      const comments: any[] = [];

      snapshot.forEach((doc) => {
        comments.push({
          ...doc.data(),
          uid: doc.id,
          date: new Date(doc.data().date.seconds * 1000).toLocaleDateString(
            "en-US"
          ), //Convert Timestamp to Date, extract only the date
        });
      });

      fSnapshot(comments);
    }
  );
};
