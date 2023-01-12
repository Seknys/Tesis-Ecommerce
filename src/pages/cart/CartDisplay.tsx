import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  Box,
  Center,
  HStack,
  Text,
  Image,
  Divider,
  Container,
  Button,
  useMediaQuery,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsPaypal } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Pressable } from "react-native";
import { MB } from "../../components/MyComponents";
import { ErrorToast, SuccesToast, ToastC } from "../../components/Toast";
import { getDateString } from "../../constants/dateFormString";
import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import {
  addCartToShoppingHistory,
  deleteProductFromCart,
  updateProductBought,
  updateRemoveFromCart,
} from "../../services/cartOperations";
import { getCartProductsByUser } from "../../services/products";
import "./style.css";

export const CartDisplay = ({ history }: any) => {
  const { user } = useContext(UserContext);
  // const [count, setCount] = useState(1);
  const count = useRef(1);
  const [cartProducts, setCartProducts] = useState<Iproducts[] | null>(null);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const subTotal = useRef(0);
  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 1030,
  });

  useEffect(() => {
    const cartProductsFunction = (products: Iproducts[]) => {
      setCartProducts(products);
    };
    if (user) {
      getCartProductsByUser(user.uid, cartProductsFunction);
    }
  }, [user]);

  const deletePCart = (
    cartUid: string,
    removeToCart: number,
    productUid: string
  ) => {
    console.log("Delete product from cart", cartUid);
    if (user && cartUid) {
      deleteProductFromCart(user.uid, cartUid)
        .then(() => {
          updateRemoveFromCart(productUid, removeToCart);
          console.log("Product deleted from cart Update VIEW");
        })
        .catch((error) => {
          console.log("Error deleting product from cart: ", error);
        });
    }
  };

  const handleBuyProducts = () => {
    updateProductBought(cartProducts);
    let uidShop = getDateString();

    if (user) {
      addCartToShoppingHistory(user?.uid, uidShop, new Date(), cartProducts);
    }
    setTimeout(() => {
      history.push("/home");
    }, 3000);
  };

  let aux = 0;

  return (
    <Center w="100%" mt="50px">
      <ToastC />
      <Text italic bold fontSize={"3xl"}>
        {t("cart")}
      </Text>
      {!isSmallScreen ? (
        <HStack w="80%" my="50px">
          <Box flex="5">
            {cartProducts &&
              cartProducts.map((product, index) => {
                if (product.quantity) {
                  console.log(
                    "Product: ",
                    product.quantity,
                    "*",
                    product.price
                  );
                  aux += product.quantity * product.price;

                  console.log("Aux: ", Math.round(aux * 100) / 100);
                  subTotal.current = Math.round(aux * 100) / 100;
                  count.current = product.quantity;
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
                              {t("cart_quantity")} <MB>{product.quantity}</MB>
                            </Text>
                            {/* {product.quantity && product.quantity > 1 && (
                            <Pressable
                              onPress={() => {
                                if (product.quantity) {
                                  product.quantity -= 1;
                                  count.current -= 1;
                                }
                              }}
                            >
                              <IconContext.Provider
                                value={{
                                  color: "black",
                                  size: "1.5em",
                                  style: {},
                                }}
                              >
                                <AiFillMinusCircle />
                              </IconContext.Provider>
                            </Pressable>
                          )}
                          {product.quantity &&
                            product.quantity < product.stock && (
                              <Pressable
                                onPress={() => {
                                  if (product.quantity) {
                                    console.log("Product: ", product.quantity);
                                    product.quantity += 1;
                                    count.current += 1;
                                  }
                                }}
                              >
                                <IconContext.Provider
                                  value={{
                                    color: "black",
                                    size: "1.5em",
                                    style: {},
                                  }}
                                >
                                  <AiFillPlusCircle />
                                </IconContext.Provider>
                              </Pressable>
                            )} */}
                          </HStack>
                        </Box>
                        <Box
                          justifyContent={"space-between"}
                          alignItems="flex-end"
                        >
                          <Pressable
                            onPress={() => {
                              console.log("Product: ", product);
                              if (product.productUid) {
                                deletePCart(
                                  product.uid,
                                  product.removeToCart,
                                  product.productUid
                                );
                              }
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
                {t("cart_discount")}
              </Text>
              <Text color="black" fontSize={"21"} mb="15">
                {discount}
              </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text color="black" bold fontSize={"21"} mb="15">
                {t("cart_total")}
              </Text>
              <Text color="black" fontSize={"21"} mb="15">
                {subTotal.current - discount}
              </Text>
            </HStack>

            {/* <button
              onClick={() => {
                handleBuyProducts();
              }}
              className="button-cart"
            >
              {t("cart_confirm")}
            </button> */}
            <PayPalScriptProvider
              options={{
                "client-id":
                  //SANDBOX CLIENT
                  // "AakzSsjVghPnwP40WgCb2hYcP4oPqoP9orP58P-fBVgQJg9Fa3OMvZcg6CMDGL9P82VHvzKQylK4wCX7",
                  //LIVE LCIENT
                  "AYUN02PxCTNM4_OUTyXUFhWkYcMgl_wSi7ssf72jEdKfzjqO4fQG0oKDBOdYG4V-lWYUqM5wZpnM09oA",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value:
                            //SandBox
                            //(subTotal.current - discount).toString(),
                            //LIVE
                            "0.01",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions: any) => {
                  return actions.order.capture().then((details: any) => {
                    if (details.status === "COMPLETED") {
                      console.log("Details: ", details);
                      handleBuyProducts();
                    }
                    if (details.payer.name) {
                      const name = details.payer.name.given_name;
                      // alert(`Transaction completed by ${name}`);
                      SuccesToast(`Transaction completed by ${name}`);
                      console.log("DONE", details.payer);
                    }
                  });
                }}
                style={{
                  layout: "horizontal",
                  shape: "pill",
                  color: "gold",
                  tagline: false,
                }}
                onCancel={(data) => {
                  console.log("CANCEL:", data);
                  ErrorToast("purchase canceled");
                }}
              />
            </PayPalScriptProvider>
          </Box>
        </HStack>
      ) : (
        <Box w="95%" my="50px" bg="green.400">
          <Box>
            {cartProducts &&
              cartProducts.map((product, index) => {
                if (product.quantity) {
                  console.log(
                    "Product: ",
                    product.quantity,
                    "*",
                    product.price
                  );
                  aux += product.quantity * product.price;

                  console.log("Aux: ", Math.round(aux * 100) / 100);
                  subTotal.current = Math.round(aux * 100) / 100;
                  count.current = product.quantity;
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
                              {t("cart_quantity")} <MB>{product.quantity}</MB>
                            </Text>
                            {/* {product.quantity && product.quantity > 1 && (
                            <Pressable
                              onPress={() => {
                                if (product.quantity) {
                                  product.quantity -= 1;
                                  count.current -= 1;
                                }
                              }}
                            >
                              <IconContext.Provider
                                value={{
                                  color: "black",
                                  size: "1.5em",
                                  style: {},
                                }}
                              >
                                <AiFillMinusCircle />
                              </IconContext.Provider>
                            </Pressable>
                          )}
                          {product.quantity &&
                            product.quantity < product.stock && (
                              <Pressable
                                onPress={() => {
                                  if (product.quantity) {
                                    console.log("Product: ", product.quantity);
                                    product.quantity += 1;
                                    count.current += 1;
                                  }
                                }}
                              >
                                <IconContext.Provider
                                  value={{
                                    color: "black",
                                    size: "1.5em",
                                    style: {},
                                  }}
                                >
                                  <AiFillPlusCircle />
                                </IconContext.Provider>
                              </Pressable>
                            )} */}
                          </HStack>
                        </Box>
                        <Box
                          justifyContent={"space-between"}
                          alignItems="flex-end"
                        >
                          <Pressable
                            onPress={() => {
                              console.log("Product: ", product);
                              if (product.productUid) {
                                deletePCart(
                                  product.uid,
                                  product.removeToCart,
                                  product.productUid
                                );
                              }
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
            my="25"
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
                {t("cart_discount")}
              </Text>
              <Text color="black" fontSize={"21"} mb="15">
                {discount}
              </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text color="black" bold fontSize={"21"} mb="15">
                {t("cart_total")}
              </Text>
              <Text color="black" fontSize={"21"} mb="15">
                {subTotal.current - discount}
              </Text>
            </HStack>
            {/* 
            <button
              onClick={() => {
                handleBuyProducts();
              }}
              className="button-cart"
            >
              {t("cart_confirm")}
            </button> */}
            <PayPalScriptProvider
              options={{
                "client-id":
                  //SANDBOX CLIENT
                  // "AakzSsjVghPnwP40WgCb2hYcP4oPqoP9orP58P-fBVgQJg9Fa3OMvZcg6CMDGL9P82VHvzKQylK4wCX7",
                  //LIVE LCIENT
                  "AYUN02PxCTNM4_OUTyXUFhWkYcMgl_wSi7ssf72jEdKfzjqO4fQG0oKDBOdYG4V-lWYUqM5wZpnM09oA",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value:
                            //SandBox
                            //(subTotal.current - discount).toString(),
                            //LIVE
                            "0.01",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions: any) => {
                  return actions.order.capture().then((details: any) => {
                    if (details.status === "COMPLETED") {
                      console.log("Details: ", details);
                      //handleBuyProducts();
                    }
                    if (details.payer.name) {
                      const name = details.payer.name.given_name;
                      // alert(`Transaction completed by ${name}`);
                      SuccesToast(`Transaction completed by ${name}`);
                      console.log("DONE", details.payer);
                    }
                  });
                }}
                style={{
                  layout: "horizontal",
                  shape: "pill",
                  color: "gold",
                  tagline: false,
                }}
                onCancel={(data) => {
                  console.log("CANCEL:", data);
                  ErrorToast("purchase canceled");
                }}
              />
            </PayPalScriptProvider>
          </Box>
        </Box>
      )}
    </Center>
  );
};
