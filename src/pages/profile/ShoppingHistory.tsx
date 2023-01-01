import { motion } from "framer-motion";
import { Box, Center, HStack, Text, Pressable, Image } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MB } from "../../components/MyComponents";

import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import { constGetShoppingHistoryByUser } from "../../services/cartOperations";
import { updateViews } from "../../services/products";
import { CardProduct } from "../home/componets/CardProduct";

export const ShoppingHistory = ({ history }: any) => {
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
  }, [user]);

  return (
    <Center my="25">
      <Text mt="15" fontSize={"2xl"} color="black">
        {t("shopping-history")}
      </Text>
      {productsShop && (
        <Box w="80%">
          {productsShop.map((product, index) => {
            let auxDate = "";

            if (product.dateBuy) {
              auxDate = new Date(
                product.dateBuy.seconds * 1000
              ).toLocaleDateString("en-US");
            }

            return (
              <Pressable
                w="100%"
                p="15"
                mb="25"
                key={product.uid + index}
                borderRadius={15}
                shadow={7}
                onPress={() => {
                  if (product.productUid) {
                    updateViews(product.productUid)
                      .then(() => {
                        console.log("Views updated");
                        history.push(`/product/${product.productUid}`);
                      })
                      .catch((error) => {
                        console.log("ViewsError", error);
                      });
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <HStack w="100%">
                    <Image
                      source={{
                        uri: product.img[0],
                      }}
                      fallbackSource={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FFallbackImg.jpg?alt=media&token=67f3837f-dfd2-42e8-8490-972b5ccb6f7d",
                      }}
                      alt={product.name}
                      shadow={7}
                      w="120px"
                      h="110 px"
                      mx="15"
                      resizeMode="contain"
                    />
                    <Box flex={4} justifyContent={"space-between"}>
                      <Text fontSize={"3xl"}>{product.name}</Text>
                      <Text fontSize={"2xl"}>Price: {product.price}</Text>
                    </Box>
                    <Box flex={4} justifyContent={"flex-end"}>
                      <Text fontSize={"2xl"}>Quantity: {product.quantity}</Text>
                    </Box>
                    <Box
                      mr="15"
                      flex={2}
                      justifyContent={"space-between"}
                      alignItems="flex-end"
                    >
                      {product.quantity && (
                        <Text>
                          <MB>TOTAL: </MB>
                          {product.price * product.quantity}
                        </Text>
                      )}
                      {/* <Text>TOTAL: {product.price * product.quantity}</Text> */}
                      <Text>Bought at: {auxDate} </Text>
                    </Box>
                  </HStack>
                </motion.div>
              </Pressable>
            );
          })}
        </Box>
      )}
    </Center>
  );
};
