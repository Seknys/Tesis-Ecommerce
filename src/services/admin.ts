import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/configFirebase";
import { Iproducts } from "../interfaces/interface";

const productRef = collection(db, "products");
const userRef = collection(db, "users");
export const uploadImage = (file: any) => {
  return uploadBytes(ref(storage, `images/${file.name}`), file);
};

export const getUrlImage = async (pathImage: string) => {
  return getDownloadURL(ref(storage, pathImage));
};

export const addProduct = (product: Iproducts) => {
  return setDoc(doc(productRef, product.uid), {
    ...product,
  });
};

export const getUsersByRole = (
  role: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(userRef, where("role", "==", role));
  return onSnapshot(q, fSnapshot);
};
