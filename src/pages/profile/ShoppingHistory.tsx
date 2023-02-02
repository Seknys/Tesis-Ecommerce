import { motion } from "framer-motion";
import {
  Box,
  Center,
  HStack,
  Text,
  Pressable,
  Image,
  useMediaQuery,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { MB } from "../../components/MyComponents";

import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import { constGetShoppingHistoryByUser } from "../../services/cartOperations";
import { updateViews } from "../../services/products";
import { CardProduct } from "../home/componets/CardProduct";

export const ShoppingHistory = ({ history }: any) => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const { uid } = useParams<{ uid: string }>();
  const [productsShop, setProductsShop] = useState<Iproducts[]>();
  const [newTotal, setNewTotal] = useState<any>(0);

  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 1050,
  });
  const total = useRef(0);
  const shoppingProductsFunction = (products: Iproducts[]) => {
    console.log("products", products);
    setProductsShop(products);
  };
  useEffect(() => {
    if (user && user.role === "client") {
      constGetShoppingHistoryByUser(user.uid, shoppingProductsFunction);
    } else {
      constGetShoppingHistoryByUser(uid, shoppingProductsFunction);
    }
  }, [user]);

  return (
    <Center my="25">
      <Text mt="15" fontSize={"2xl"} color="black">
        {t("shopping-history")}
      </Text>
      {!isSmallScreen ? (
        <Center w="100%">
          <Text fontSize={"2xl"} color="black">
            <MB> {t("shopping_summary")} </MB>
          </Text>
          <HStack mb="25" w="100%" justifyContent={"space-around"}>
            {productsShop && (
              <Text fontSize={"2xl"} color="black">
                <MB> {t("shopping_total")}: </MB>
                {productsShop.length}
              </Text>
            )}
{/* 
            <Text fontSize={"2xl"} color="black">
              <MB> Total gastado: </MB>
              {total.current}$ new {newTotal}
            </Text> */}
          </HStack>
        </Center>
      ) : (
        <Center>
          <Text fontSize={"2xl"} color="black">
            <MB> {t("shopping_summary")} </MB>
          </Text>
          {productsShop && (
            <Text fontSize={"2xl"} color="black">
              <MB> {t("shopping_total")}: </MB>
              {productsShop.length}
            </Text>
          )}
          {/* <Text fontSize={"2xl"} color="black">
            <MB> Total gastado: </MB>
            {total.current}$ 
          </Text> */}
        </Center>
      )}

      {productsShop &&
        (!isSmallScreen
          ? ((total.current = 0),
            (
              <Box w="80%">
                {productsShop.map((product, index) => {
                  let auxDate = "";
                  let auxTotal = 0;

                  if (product.dateBuy) {
                    auxDate = new Date(
                      product.dateBuy.seconds * 1000
                    ).toLocaleDateString("en-US");
                  }
                  if (product.price && product.quantity) {
                    auxTotal = product.price * product.quantity;
                    console.log("AUTXTOTAL: ", auxTotal);
                  }
                  total.current += auxTotal;
                  console.log("C7urrent: ", total.current);

                  return (
                    <Pressable
                      w="100%"
                      p="15"
                      mb="25"
                      key={product.uid + index}
                      borderRadius={15}
                      shadow={7}
                      onPress={() => {
                        if (!uid) {
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
                            <Text fontSize={"2xl"}>
                              {t("product_price")}: {product.price}
                            </Text>
                          </Box>
                          <Box flex={4} justifyContent={"flex-end"}>
                            <Text fontSize={"2xl"}>
                              {t("cart_quantity")} {product.quantity}
                            </Text>
                          </Box>
                          <Box
                            mr="15"
                            flex={2}
                            justifyContent={"space-between"}
                            alignItems="flex-end"
                          >
                            {product.quantity && (
                              <Text fontSize={"xl"}>
                                <MB>TOTAL: </MB>
                                {product.price * product.quantity}$
                              </Text>
                            )}
                            {/* <Text>TOTAL: {product.price * product.quantity}</Text> */}
                            <Text>
                              {t("shopping_bought")}: {auxDate}{" "}
                            </Text>
                          </Box>
                        </HStack>
                      </motion.div>
                    </Pressable>
                  );
                })}
              </Box>
            ))
          : ((total.current = 0),
            (
              <>
                <Box
                  mt="25"
                  w="100%"
                  mx="0"
                  justifyContent={"center"}
                  display={"flex"}
                  flexDirection="row"
                  flexWrap="wrap"
                >
                  {productsShop.map((product, index) => {
                    let auxDate = "";
                    if (product.dateBuy) {
                      auxDate = new Date(
                        product.dateBuy.seconds * 1000
                      ).toLocaleDateString("en-US");
                    }
                    let auxTotal = 0;
                    if (product.price && product.quantity) {
                      auxTotal = product.price * product.quantity;
                    }
                    total.current += auxTotal;

                    return (
                      <Pressable
                        key={product.uid + index}
                        ml="2"
                        mb="15"
                        w="180px"
                        px="2"
                        py="1"
                        shadow={8}
                        borderRadius="15"
                        onPress={() => {
                          if (!uid) {
                            if (product.productUid) {
                              updateViews(product.productUid)
                                .then(() => {
                                  console.log("Views updated");
                                  history.push(
                                    `/product/${product.productUid}`
                                  );
                                })
                                .catch((error) => {
                                  console.log("ViewsError", error);
                                });
                            }
                          }
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Text color="gray.400">
                            {t("shopping_bought")}: {auxDate}
                          </Text>
                          <Box alignItems={"center"}>
                            <Image
                              source={{
                                uri: product.img[0],
                              }}
                              fallbackSource={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FFallbackImg.jpg?alt=media&token=67f3837f-dfd2-42e8-8490-972b5ccb6f7d",
                              }}
                              alt={product.name}
                              shadow={7}
                              my="5"
                              w="120px"
                              h="110px"
                              mx="15"
                              resizeMode="contain"
                            />
                          </Box>
                          <Box w="100%" px="2">
                            <Text
                              textAlign="center"
                              isTruncated
                              fontSize={"xl"}
                            >
                              {product.name}
                            </Text>
                          </Box>

                          <Box
                            w="100%"
                            flexDir={"row-reverse"}
                            justifyContent="space-between"
                          >
                            {product.quantity && (
                              <Text fontSize={"lg"}>
                                <MB>TOTAL: </MB>
                                {product.price * product.quantity}$
                              </Text>
                            )}
                            <Text fontSize={"lg"}>N: {product.quantity}</Text>
                          </Box>
                        </motion.div>
                      </Pressable>
                    );
                  })}
                </Box>
              </>
            )))}
    </Center>
  );
};
