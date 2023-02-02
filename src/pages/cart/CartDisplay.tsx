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
  Spinner,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsPaypal } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Pressable } from "react-native";
import { Link } from "react-router-dom";
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
  const [cartProducts, setCartProducts] = useState<Iproducts[]>([]);
  const { t } = useTranslation();
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [auxQuantity, setAuxQuantity] = useState(0);
  const myAux = useRef<any>(0);
  const subTotal = useRef(0);
  const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 790,
  });
  const [isMediumScreen] = useMediaQuery({
    minWidth: 791,
    maxWidth: 1030,
  });

  useEffect(() => {
    const cartProductsFunction = (products: Iproducts[]) => {
      if (products) {
        console.log("PRODUCTS: ", products);
        setCartProducts(products);
      }
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

  const handleBuyProducts = async (paypal: boolean) => {
    setLoadingBuy(true);
    updateProductBought(cartProducts);
    let uidShop = getDateString();

    if (user) {
      await addCartToShoppingHistory(
        user?.uid,
        uidShop,
        new Date(),
        cartProducts
      );
    }

    console.log("END¿¿?");

    setLoadingBuy(false);
    history.push("/checkout");
    // setTimeout(() => {
    //
    // }, 3000);
  };

  let aux = 0;

  return (
    <Center w="100%" mt="50px">
      <ToastC />
      <Text italic bold fontFamily="heading" fontSize={"3xl"}>
        {t("cart")}
      </Text>
      {loadingBuy && <Spinner size={55} color="black"></Spinner>}
      {isMediumScreen || isSmallScreen ? (
        <Box
          w="90%"
          my="50px" //bg="green.400"
        >
          <Box>
            {cartProducts &&
              cartProducts.map((product, index) => {
                if (product.quantity) {
                  aux += product.quantity * product.price;

                  subTotal.current = Math.round(aux * 100) / 100;
                  count.current = product.quantity;
                }

                return (
                  <Box key={`${product.uid}_${product.name}_${index}`}>
                    <HStack
                      w="100%"
                      key={product.uid}
                      py="15"
                      // bg="red.500"
                    >
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

                      <HStack
                        // bg="blue.300"
                        w={isSmallScreen ? "65%" : "80%"}
                        justifyContent={"space-between"}
                      >
                        <Box // bg="emerald.300"
                          justifyContent="space-between"
                        >
                          <Link
                            target={"_blank"}
                            to={`/product/${product.productUid}`}
                            className="text-Url"
                          >
                            <Text fontSize={"xl"} width="150">
                              {product.name}
                            </Text>
                          </Link>

                          <HStack
                            w="130"
                            alignItems={"center"}
                            justifyContent="space-around"
                          >
                            <Text>
                              {t("cart_quantity")} <MB>{product.quantity}</MB>
                            </Text>
                            {product.quantity && product.quantity > 1 && (
                              <Pressable
                                onPress={() => {
                                  if (product.quantity) {
                                    product.quantity -= 1;
                                    myAux.current -= 1;
                                    setAuxQuantity((myAux.current -= 1));
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
                                      product.quantity += 1;
                                      myAux.current += 1;
                                      setAuxQuantity((myAux.current += 1));
                                      console.log("Aux: ", myAux.current);
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
                              )}
                          </HStack>
                        </Box>
                        <Box
                          // bg="violet.400"
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
            {cartProducts.length === 0 && (
              <Text fontSize={"xl"}>THE CART IS EMPTY</Text>
            )}
          </Box>
          {cartProducts.length !== 0 && (
            <Box
              my="35"
              h="310"
              mx="25"
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
                <Text color="black" bold fontSize={"21"} mb="15">
                  {subTotal.current - discount}
                </Text>
              </HStack>

              <button
                onClick={() => {
                  handleBuyProducts(false);
                }}
                className="button-cart"
              >
                {t("cart_confirm")}
              </button>
              <Text textAlign={"center"}>{t("another_pay")}</Text>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    //SANDBOX CLIENT
                    "AakzSsjVghPnwP40WgCb2hYcP4oPqoP9orP58P-fBVgQJg9Fa3OMvZcg6CMDGL9P82VHvzKQylK4wCX7",
                  //LIVE LCIENT
                  //"AYUN02PxCTNM4_OUTyXUFhWkYcMgl_wSi7ssf72jEdKfzjqO4fQG0oKDBOdYG4V-lWYUqM5wZpnM09oA",
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
                              (subTotal.current - discount).toString(),
                            //LIVE
                            // "0.01",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                      if (details.status === "COMPLETED") {
                        console.log("Details: ", details);
                        handleBuyProducts(true);
                      }
                      if (details.payer.name) {
                        const name = details.payer.name.given_name;
                        // alert(`Transaction completed by ${name}`);
                        SuccesToast(`Transaction completed by ${name}`);
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
                    ErrorToast(t("paypal_cancel"));
                  }}
                />
              </PayPalScriptProvider>
            </Box>
          )}
        </Box>
      ) : (
        <HStack w="80%" my="50px">
          <Box flex="5">
            {cartProducts &&
              cartProducts.map((product, index) => {
                if (product.quantity) {
                  aux += product.quantity * product.price;
                  subTotal.current = Math.round(aux * 100) / 100;
                  count.current = product.quantity;
                }
                myAux.current = product.quantity;

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
                        <Box justifyContent="space-between" w="90%">
                          <Link
                            target={"_blank"}
                            to={`/product/${product.productUid}`}
                            className="text-Url"
                          >
                            <Text fontSize={"3xl"} w="100%">
                              {product.name}
                            </Text>
                          </Link>

                          <HStack
                            w="130"
                            alignItems={"center"}
                            justifyContent="space-around"
                          >
                            <Text>
                              {/* {t("cart_quantity")} <MB>{product.quantity}</MB> */}
                              {t("cart_quantity")} <MB>{myAux.current} </MB>
                            </Text>
                            {product.quantity && product.quantity > 1 && (
                              <Pressable
                                onPress={() => {
                                  if (product.quantity) {
                                    product.quantity -= 1;
                                    myAux.current -= 1;
                                    setAuxQuantity((myAux.current -= 1));
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
                                      product.quantity += 1;
                                      myAux.current += 1;
                                      setAuxQuantity((myAux.current += 1));
                                      console.log("Aux: ", myAux.current);
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
                              )}
                          </HStack>
                        </Box>
                        <Box
                          justifyContent={"space-between"}
                          alignItems="flex-end"
                        >
                          <Pressable
                            onPress={() => {
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
                    <Divider w={"100%"} thickness="2" bg="gray.300" />
                  </Box>
                );
              })}
            {cartProducts.length === 0 && (
              <Text fontSize={"xl"}>THE CART IS EMPTY</Text>
            )}
          </Box>
          {cartProducts.length !== 0 && (
            <Box
              h="290"
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
                <Text
                  color="black"
                  bold
                  fontFamily={"heading"}
                  italic
                  fontSize={"21"}
                  mb="15"
                >
                  {t("cart_total")}
                </Text>
                <Text
                  color="black"
                  bold
                  fontFamily={"heading"}
                  italic
                  fontSize={"21"}
                  mb="15"
                >
                  {subTotal.current - discount}
                </Text>
              </HStack>
              <button
                // disabled={cartProducts ? true : false}

                onClick={() => {
                  handleBuyProducts(false);
                }}
                className="button-cart"
              >
                {t("cart_confirm")} 
              </button>
              <Text alignSelf={"center"}>{t("another_pay")}</Text>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    //SANDBOX CLIENT
                    "AakzSsjVghPnwP40WgCb2hYcP4oPqoP9orP58P-fBVgQJg9Fa3OMvZcg6CMDGL9P82VHvzKQylK4wCX7",
                  //LIVE LCIENT
                  // "AYUN02PxCTNM4_OUTyXUFhWkYcMgl_wSi7ssf72jEdKfzjqO4fQG0oKDBOdYG4V-lWYUqM5wZpnM09oA",
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
                              (subTotal.current - discount).toString(),
                            //LIVE
                            // "0.01",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                      if (details.status === "COMPLETED") {
                        console.log("Details: ", details);
                        handleBuyProducts(true);
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
                    ErrorToast(t("paypal_cancel"));
                  }}
                />
              </PayPalScriptProvider>
            </Box>
          )}
        </HStack>
      )}
    </Center>
  );
};
