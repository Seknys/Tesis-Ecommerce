import { onValue, ref } from "firebase/database";
import { db } from "../firebase/configFirebase";
import { Icategories } from "../interfaces/interface";

export const getCategories = () => {
  const categoriesRef = ref(db, "categories");

  //Return a promise
  return new Promise<Icategories[]>((resolve, reject) => {
    onValue(
      categoriesRef,
      (snapshot) => {
        const data = snapshot.val();
        const dataValues: Icategories[] = Object.values(data);

        resolve(dataValues);
      },
      (error) => {
        reject(error);
      }
      //   ,
      //   {
      //     onlyOnce: true,
      //   }
    );
  });
};
