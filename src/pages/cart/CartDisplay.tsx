import {
  Box,
  Center,
  HStack,
  Text,
  Image,
  Divider,
  Container,
  Button,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { Pressable } from "react-native";
import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import {
  deleteProductFromCart,
  getCartProductsByUser,
} from "../../services/products";
import "./style.css";

export const CartDisplay = ({ history }: any) => {
  const { user } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState<Iproducts[] | null>(null);
  console.log("User: ", user);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const subTotal = useRef(0);

  useEffect(() => {
    const cartProductsFunction = (products: Iproducts[]) => {
      setCartProducts(products);
      console.log("Products: ", products);
    };
    if (user) {
      getCartProductsByUser(user.uid, cartProductsFunction);
    }
  }, [user]);

  const deletePCart = (productUid: string) => {
    console.log("Delete product from cart");
    if (user && productUid) {
      deleteProductFromCart(user.uid, productUid)
        .then(() => {
          console.log("Product deleted from cart");
        })
        .catch((error) => {
          console.log("Error deleting product from cart: ", error);
        });
    }
  };

  return (
    <Center w="100%" mt="50px">
      <Text italic bold fontSize={"3xl"}>
        {t("cart")}
      </Text>
      <HStack w="80%" my="50px">
        <Box flex="5">
          {cartProducts &&
            cartProducts.map((product, index) => {
              if (product.quantity) {
                subTotal.current += product.price * product.quantity;
              }

              return (
                <Box key={`${product.uid}_${product.name}_${index}`}>
                  <HStack w="100%" key={product.uid} py="15">
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
                      mr="15"
                      resizeMode="contain"
                    />

                    <HStack w="80%" justifyContent="space-between">
                      <Box justifyContent="space-between">
                        <Text fontSize={"3xl"}>{product.name}</Text>
                        <HStack
                          w="130"
                          alignItems={"center"}
                          justifyContent="space-around"
                        >
                          <Text>
                            {t("cart_quantity")} {product.quantity}
                          </Text>
                          <IconContext.Provider
                            value={{
                              color: "black",
                              size: "1.5em",
                              style: {},
                            }}
                          >
                            <AiFillMinusCircle />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "black",
                              size: "1.5em",
                              style: {},
                            }}
                          >
                            <AiFillPlusCircle />
                          </IconContext.Provider>
                        </HStack>
                      </Box>
                      <Box
                        justifyContent={"space-between"}
                        alignItems="flex-end"
                      >
                        <Pressable
                          onPress={() => {
                            deletePCart(product.uid);
                          }}
                        >
                          <IconContext.Provider
                            value={{
                              color: "#9D9D9D",
                              size: "2em",
                              style: {},
                            }}
                          >
                            <MdCancel />
                          </IconContext.Provider>
                        </Pressable>

                        {product.quantity && (
                          <Text bold fontSize={"lg"}>
                            $
                            {Math.round(
                              product?.quantity * product.price * 100
                            ) / 100}
                          </Text>
                        )}
                      </Box>
                    </HStack>
                  </HStack>
                  <Divider thickness="2" bg="gray.300" />
                </Box>
              );
            })}
          {cartProducts === null && <p>Cart is empty</p>}
        </Box>
        <Box
          h="220"
          flex="2"
          ml="75"
          shadow={8}
          p="15"
          borderRadius={15}
          borderColor="gray.500"
          borderBottomWidth={3}
          borderRightWidth={3}
          position="sticky"
          top="150"
        >
          <HStack justifyContent={"space-between"}>
            <Text color="black" fontSize={"21"} mb="15">
              Subtotal
            </Text>
            <Text color="black" fontSize={"21"} mb="15">
              {subTotal.current}
            </Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text color="black" fontSize={"21"} mb="15">
              Descuento
            </Text>
            <Text color="black" fontSize={"21"} mb="15"></Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text color="black" bold fontSize={"21"} mb="15">
              Total
            </Text>
            <Text color="black" fontSize={"21"} mb="15"></Text>
          </HStack>

          <button
            onClick={() => {
              console.log("click");
            }}
            className="button-cart"
          >
            {t("cart_confirm")}
          </button>
        </Box>
      </HStack>
    </Center>
  );
};
