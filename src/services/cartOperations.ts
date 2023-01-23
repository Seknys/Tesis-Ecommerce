import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
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
      console.log("BACK PDORUCT:", product);
      console.log("NEW QUANTITY: ", product.quantity);
      if (product.productUid && product.quantity) {
        updateDoc(doc(db, "products", product.productUid), {
          buy: product.buy + 1,
          stock: increment(-product.quantity),
        }).then(() => {
          console.log("ProductoBOUGHT actualizado: ", product);
        });
      }
    });
  }
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
  if (cartProducts) {
    cartProducts.forEach((product, index) => {
      // addDoc(shoppingHistoryRef, {
      //   ...product,
      //   dateBuy: Timestamp.fromDate(dateBuy),
      //   uidBuy: uidShopping,
      // }).then(() => {
      //   console.log("Producto agregado a historial de compras");
      // });
      setDoc(doc(db, "users", uid, "shoppingHistory", uidShopping + index), {
        ...product,
        dateBuy: Timestamp.fromDate(dateBuy),
        uidBuy: uidShopping,
      });

      deleteProductFromCart(uid, product.uid).then(() => {
        console.log("Producto eliminado del carrito");
      });
    });
  }
};

export const constGetShoppingHistoryByUser = async (
  uid: string,
  fSnapshot: (history: Iproducts[]) => void
) => {
  const shoppingHistoryRef = collection(db, "users", uid, "shoppingHistory");
  onSnapshot(query(shoppingHistoryRef), (snapshot) => {
    const shoppingHistory: any[] = [];

    snapshot.forEach((doc) => {
      shoppingHistory.push({
        ...doc.data(),
        // uid: doc.id,
      });
    });
    fSnapshot(shoppingHistory);
  });
};
