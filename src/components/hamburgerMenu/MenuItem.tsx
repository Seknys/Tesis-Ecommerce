import * as React from "react";
import { motion } from "framer-motion";
import { Iproducts } from "../../interfaces/interface";
import { Avatar, Box, HStack, Text } from "native-base";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

interface IPropsMenuItem {
  i: number;
  product?: Iproducts;
}

export const MenuItem = ({ i, product }: IPropsMenuItem) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={style} /> */}
      <HStack
        w="100%"
        alignItems="center"

        // justifyContent="space-between"
      >
        <Avatar
          borderColor={colors[i]}
          borderWidth="3"
          source={{
            uri: product?.img,
          }}
          size="lg"
        />
        <HStack
          ml="3"
          px="3"
          py="1"
          borderColor={colors[i]}
          borderWidth="3"
          borderRadius={35}
        >
          <Box>
            <Text color="white" bold>
              {product?.name}
            </Text>
            <Text color="white">{product?.category}</Text>
            {/* <Text color="white">{product?.quantity}</Text> */}
          </Box>

          
             <Text color="white" bold>${product?.price}</Text>
          
        </HStack>
      </HStack>
    </motion.li>
  );
};
