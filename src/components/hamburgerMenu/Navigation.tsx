import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { getCartProductsByUser } from "../../services/products";
import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import { Box, Text } from "native-base";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => {
  const { user } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState<Iproducts[] | null>(null);

  useEffect(() => {
    const cartProductsFunction = (products: Iproducts[]) => {
      setCartProducts(products);
    };

    if (user) {
      getCartProductsByUser(user.uid, cartProductsFunction);
    }
  }, []);

  return (
    <motion.ul variants={variants}>
      {cartProducts ? (
        // itemIds.map((i) => <MenuItem i={i} key={i} />)
        cartProducts.map((product, index) => (
          <MenuItem key={product.uid} i={index} product={product} />
        ))
      ) : (
        <Box>
          <Text>No hay products aun </Text>
        </Box>
      )}
    </motion.ul>
  );
};

const itemIds = [0, 1, 2, 3, 4];
