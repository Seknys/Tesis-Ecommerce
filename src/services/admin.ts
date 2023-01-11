import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/configFirebase";
import { Iproducts } from "../interfaces/interface";

const productRef = collection(db, "products");
const userRef = collection(db, "users");
export const uploadImage = (file: any, uid: string) => {
  console.log("BACKUID: ", uid);
  return uploadBytes(ref(storage, `images/${uid}/${file.name}`), file);
};

export const getUrlImage = async (pathImage: string) => {
  return getDownloadURL(ref(storage, pathImage));
};

export const addProduct = (product: Iproducts) => {
  return setDoc(doc(productRef, product.uid), {
    ...product,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export const getUsersByRole = (
  role: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(userRef, where("role", "==", role));
  return onSnapshot(q, fSnapshot);
};

export const getProductsByViews = (
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(
    productRef,
    where("views", ">", 25),
    orderBy("views", "desc")
  );
  return onSnapshot(q, fSnapshot);
};

export const getProductsByBuy = (
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(productRef, where("buy", ">", 25), orderBy("buy", "desc"));
  return onSnapshot(q, fSnapshot);
};

export const deleteUserByUid = (uid: string) => {
  return deleteDoc(doc(userRef, uid));
};
