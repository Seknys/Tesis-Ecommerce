import { Box, Center, HStack, Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import { constGetShoppingHistoryByUser } from "../../services/cartOperations";
import { CardProduct } from "../home/componets/CardProduct";

export const ShoppingHistory = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [productsShop, setProductsShop] = useState<Iproducts[]>();

  useEffect(() => {
    const shoppingProductsFunction = (products: Iproducts[]) => {
      console.log("products", products);
      setProductsShop(products);
    };
    if (user) {
      constGetShoppingHistoryByUser(user.uid, shoppingProductsFunction);
    }
  }, []);

  return (
    <Center my="25">
      <Text fontSize={"2xl"} color="black">
        {t("shopping-history")}
      </Text>
      {productsShop && (
        <HStack>
          {productsShop.map((product, index) => {
            let auxDate = "";
            console.log("product", product);
            if (product.dateBuy) {
              auxDate = new Date(
                product.dateBuy.seconds * 1000
              ).toLocaleDateString("en-US");
            }

            return (
              <Box key={product.uid + index}>
                <CardProduct product={product} />
                <Text>Bought at: {auxDate} </Text>
              </Box>
            );
          })}
        </HStack>
      )}
    </Center>
  );
};
