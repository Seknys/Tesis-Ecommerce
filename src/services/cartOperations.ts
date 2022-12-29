import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDateString } from "../constants/dateFormString";
import { auth, db } from "../firebase/configFirebase";
import { Iproducts } from "../interfaces/interface";
import { getCartProductsByUser } from "./products";

export const updateProductBuy = (uid: string, buy: number) => {
  return updateDoc(doc(db, "products", uid), { buy: buy + 1 });
};

export const updateRemoveFromCart = (uid: string, cart: number) => {
  return updateDoc(doc(db, "users", uid), { cart: cart + 1 });
};
export const deleteProductFromCart = (uid: string, productUid: string) => {
  return deleteDoc(doc(db, "users", uid, "cart", productUid));
};

export const addCartToShoppingHistory = (
  uid: string,
  uidShopping: string,
  dateBuy: Date,
  cartProducts: Iproducts[] | null
) => {
  const shoppingHistoryRef = collection(
    db,
    "users",
    uid,
    "shoppingHistory",
    uidShopping
  );

  if (cartProducts) {
    cartProducts.forEach((product) => {
      addDoc(shoppingHistoryRef, {
        ...product,
        dateBuy: Timestamp.fromDate(dateBuy),
        uidBuy: uidShopping,
      }).then(() => {
        console.log("Producto agregado a historial de compras");
      });
      deleteProductFromCart(uid, product.uid).then(() => {
        console.log("Producto eliminado del carrito");
      });
    });
  }
};
