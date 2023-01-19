import { motion } from "framer-motion";
import { Avatar, Box, Button, HStack, Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { stack as Menu } from "react-burger-menu";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { Iproducts } from "../interfaces/interface";
import { getCartProductsByUser } from "../services/products";
// import "./Sidebar.css";

export const CartMenu = (pageWrap: any, outerContainer: any) => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState<Iproducts[] | null>(null);

  useEffect(() => {
    const cartProductsFunction = (products: Iproducts[]) => {
      if (products.length > 10) {
        products = products.slice(0, 10);
        setCartProducts(products);
      } else {
        setCartProducts(products);
      }
    };

    if (user) {
      getCartProductsByUser(user.uid, cartProductsFunction);
    }
  }, [user]);
  return (
    <Menu
      width={"300px"}
      right
      pageWrapId={pageWrap}
      outerContainerId={outerContainer}
      className="cartStyle"
    >
      <HStack pt="25" w="100%" alignItems={"center"} justifyContent="center">
        <Text ml="110" fontSize="xl" color="white" bold>
          {t("cart")}
        </Text>
      </HStack>
      {cartProducts &&
        cartProducts.map((product, index) => {
          return (
            <div
              //   whileHover={{ scale: 1.06 }}
              //   whileTap={{ scale: 0.95 }}
              key={product.uid}
              //   initial={{ x: 20, opacity: 0 }}
              //   animate={{ x: 0, opacity: 1 }}
              //   transition={{
              //     type: "spring",
              //     stiffness: 260,
              //     damping: 20,
              //   }}
            >
              <Link
                to={`/product/${product.productUid}`}
                className="menu-linkItem"
              >
                <Avatar
                  //   borderColor={colors[i]}
                  borderColor="#ff008c"
                  borderWidth="3"
                  source={{
                    uri: product?.img[0],
                  }}
                  size="lg"
                />
                <HStack
                  ml="3"
                  px="3"
                  py="1"
                  //   borderColor={colors[i]}
                  borderColor="#ff008c"
                  w="200px"
                  borderWidth="3"
                  borderRadius={35}
                  justifyContent="space-between"
                >
                  <Box w="70%">
                    <Text color="white" bold isTruncated>
                      {product?.name}
                    </Text>
                    <Text isTruncated color="white">
                      {product?.category}
                    </Text>
                    {/* <Text color="white">{product?.quantity}</Text> */}
                  </Box>

                  <Text color="white" bold>
                    ${product?.price}
                  </Text>
                </HStack>
              </Link>
            </div>
          );
        })}

      {cartProducts?.length === 0 && (
        <Box ml="45" mt="15">
          <Text fontSize={"2xl"} color="white">
            {t("cart_empty")}
          </Text>
        </Box>
      )}
      {cartProducts && cartProducts?.length > 0 && (
        <Link
          to="/cart/details"
          style={{
            textDecoration: "none",
            width: "75%",
            marginLeft: "50px",
            marginTop: "50px",
          }}
        >
          <Button bg="amber.400">
            <Text bold color="black">
              {t("cart_details")}
            </Text>
          </Button>
        </Link>
      )}
    </Menu>
  );
};
