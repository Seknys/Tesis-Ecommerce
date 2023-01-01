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
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/configFirebase";
import { IComments, Iproducts } from "../interfaces/interface";

const productRef = collection(db, "products");

export const getProductsByCategory = (
  category: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  const q = query(
    productRef,
    where("catUid", "==", category)
    // orderBy("name", "asc")
  );
  return onSnapshot(q, fSnapshot);
};

export const getProductByUid = (
  uid: string,
  fSnapshot: (snapshot: DocumentData) => void
) => {
  return onSnapshot(doc(db, "products", uid), fSnapshot);
};

export const getProductByUidStatic = async (uid: string) => {
  const docSnap = await getDoc(doc(db, "products", uid));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
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
  return addDoc(collection(db, "users", uid, "cart"), product);
};

//Add product to firestore
export const addProduct = (product: Iproducts) => {
  return addDoc(productRef, product);
};

//Unused
export const updateProduct = (uid: string, product: Iproducts) => {
  return updateDoc(doc(db, "products", uid), {
    ...product,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};
//Unused
export const deleteProduct = (uid: string) => {
  return deleteDoc(doc(db, "products", uid));
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

export const addCommentToProduct = (uid: string, comment: IComments) => {
  return setDoc(doc(db, "products", uid, "comments", comment.uid), comment);
};

export const updateViews = async (uid: string) => {
  // getProductByUid(uid, (snapshot) => {
  //   const views = snapshot.data()?.views;
  //   return updateDoc(doc(db, "products", uid), {
  //     views: views + 1,
  //   });
  // });
  getProductByUidStatic(uid).then((snapshot) => {
    const views = snapshot?.views;
    return updateDoc(doc(db, "products", uid), {
      views: views + 1,
    });
  });
};

export const updateAddedToCart = async (uid: string, addedToCart: number) => {
  await updateDoc(doc(db, "products", uid), {
    addedToCart: addedToCart + 1,
  }).then(() => {
    console.log("addedToCart updated");
  });
};
