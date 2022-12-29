import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { getCartProductsByUser } from "../../services/products";
import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import { Box, Button, HStack, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState<Iproducts[] | null>(null);

  useEffect(() => {
    const cartProductsFunction = (products: Iproducts[]) => {
      console.log("CartProducts: ", products);
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
  }, []);

  return (
    <motion.ul variants={variants}>
      {cartProducts && (
        // itemIds.map((i) => <MenuItem i={i} key={i} />)
        <>
          {cartProducts.map((product, index) => (
            <>
              <MenuItem key={product.uid} i={index} product={product} />
            </>
          ))}

          <Link to="/cart/details" style={{ textDecoration: "none" }}>
            <Button bg="amber.400">
              <Text color="white">{t("cart_details")}</Text>
            </Button>
          </Link>
        </>
      )}
      {cartProducts === null && (
        <Box>
          <Text fontSize={"2xl"} color="white">
            {t("cart_empty")}
          </Text>
        </Box>
      )}
    </motion.ul>
  );
};

const itemIds = [0, 1, 2, 3, 4];
