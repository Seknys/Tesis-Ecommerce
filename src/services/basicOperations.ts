import { onValue, ref } from "firebase/database";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/configFirebase";
import { Icategories } from "../interfaces/interface";

const categoryRef = collection(db, "categories");

export const getCategories = (fSnapshot: (snapshot: DocumentData) => void) => {
  const q = query(categoryRef, orderBy("name", "asc"));
  onSnapshot(q, fSnapshot);
};

export const getOneCategory = (
  uid: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(categoryRef, where("uid", "==", uid));
  return onSnapshot(q, fSnapshot);
};
