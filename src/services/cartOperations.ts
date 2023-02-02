import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDateString } from "../constants/dateFormString";
import { auth, db } from "../firebase/configFirebase";
import { Iproducts } from "../interfaces/interface";
import { getCartProductsByUser } from "./products";

// export const updateProductBuy = (uid: string, buy: number) => {
//   return updateDoc(doc(db, "products", uid), { buy: buy + 1 });
// };

export const updateRemoveFromCart = (uid: string, remove: number) => {
  return updateDoc(doc(db, "products", uid), { removeToCart: remove + 1 });
};

export const updateProductBought = (product: Iproducts[] | null) => {
  if (product) {
    product.forEach((product, index) => {
      if (product.productUid && product.quantity) {
        updateDoc(doc(db, "products", product.productUid), {
          buy: increment(1),
          stock: increment(-product.quantity),
        })
      }
    });
  }
};
export const deleteProductFromCart = async (
  uid: string,
  productUid: string
) => {
  return await deleteDoc(doc(db, "users", uid, "cart", productUid));
};

export const addCartToShoppingHistory = async (
  uid: string,
  uidShopping: string,
  dateBuy: Date,
  cartProducts: Iproducts[] | null
) => {
  let index = 0;
  if (cartProducts) {
    for (const product of cartProducts) {
      await setDoc(
        doc(db, "users", uid, "shoppingHistory", uidShopping + index),
        {
          ...product,
          dateBuy: Timestamp.fromDate(dateBuy),
          uidBuy: uidShopping,
        }
      );

      await deleteProductFromCart(uid, product.uid);
      index++;
    }
    // cartProducts.forEach((product, index) => {
    //   setDoc(doc(db, "users", uid, "shoppingHistory", uidShopping + index), {
    //     ...product,
    //     dateBuy: Timestamp.fromDate(dateBuy),
    //     uidBuy: uidShopping,
    //   });

    //   deleteProductFromCart(uid, product.uid).then(() => {
    //     console.log("Producto eliminado del carrito");
    //   });
    // });
  }
  return;
};

export const constGetShoppingHistoryByUser = async (
  uid: string,
  fSnapshot: (history: Iproducts[]) => void
) => {
  const shoppingHistoryRef = collection(db, "users", uid, "shoppingHistory");
  onSnapshot(
    query(shoppingHistoryRef, orderBy("dateBuy", "desc")),
    (snapshot) => {
      const shoppingHistory: any[] = [];

      snapshot.forEach((doc) => {
        shoppingHistory.push({
          ...doc.data(),
          // uid: doc.id,
        });
      });
      fSnapshot(shoppingHistory);
    }
  );
};
