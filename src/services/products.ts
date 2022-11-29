import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/configFirebase";

const productRef = collection(db, "products");

export const getProductsByCategory = (
  category: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(productRef, where("catUid", "==", category));
  return onSnapshot(q, fSnapshot);
};
