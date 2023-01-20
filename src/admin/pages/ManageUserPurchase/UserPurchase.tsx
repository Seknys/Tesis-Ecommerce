import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Iproducts } from "../../../interfaces/interface";
import { constGetShoppingHistoryByUser } from "../../../services/cartOperations";

export const UserPurchase = () => {
  const { uid } = useParams<{ uid: string }>();
  const [productsShop, setProductsShop] = useState<Iproducts[]>();

  useEffect(() => {
    const shoppingProductsFunction = (products: Iproducts[]) => {
      console.log("products", products);
      setProductsShop(products);
    };
    if (uid) {
      constGetShoppingHistoryByUser(uid, shoppingProductsFunction);
    }
  }, [uid]);

  return (
    <Box>
      <Text>User {uid}</Text>
    </Box>
  );
};
