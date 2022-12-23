import { motion } from "framer-motion";
import { Box, Pressable, Image, Text } from "native-base";
import React from "react";
import { Iproducts } from "../../../interfaces/interface";

interface ICardProps {
  product: Iproducts;
  handleOnPress?: any;
}
export const CardProduct = ({ product, handleOnPress }: ICardProps) => {
  return (
    <Pressable
      // mr="5%"
      key={product.uid}
      mt="55"
      // p='0'
      mr="25"
      borderWidth={3}
      borderColor="gray.200"
      borderRadius={35}
      //   onHoverIn={() => {
      //     setHover({ value: true, index: index });
      //   }}
      //   onHoverOut={() => setHover(null)}
      onPress={handleOnPress}
    >
      <div className="card-container-menu">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          <Box
            w="220"
            h="290"
            // bg="green.600"
            // overflow="hidden"
            // _dark={{
            //   borderColor: "coolGray.600",
            //   backgroundColor: "gray.700",
            // }}
            // _light={{
            //   backgroundColor: "gray.50",
            // }}
          >
            <Box w="100%" p="2">
              <Image
                source={{
                  uri: product.img[0],
                }}
                fallbackSource={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FFallbackImg.jpg?alt=media&token=67f3837f-dfd2-42e8-8490-972b5ccb6f7d",
                }}
                alt={product.name}
                w="220"
                h="160"
                resizeMode="cover"
              />

              {/* <Box>
                       <Box
                         bg="violet.500"
                         _dark={{
                           bg: "violet.400",
                         }}
                         _text={{
                           color: "warmGray.50",
                           fontWeight: "700",
                           fontSize: "xs",
                         }}
                         position="absolute"
                         bottom="0"
                         px="3"
                         py="1.5"
                         borderRadius={35}
                       >
                         <Text> {category?.name}</Text>
                       </Box>
                       {product.sold > 15 && (
                         <Box
                           bg="red.500"
                           _dark={{
                             bg: "red.400",
                           }}
                           _text={{
                             color: "warmGray.50",
                             fontWeight: "700",
                             fontSize: "xs",
                           }}
                           position="absolute"
                           top="0"
                           right="0"
                           px="3"
                           py="1.5"
                           borderRadius={5}
                         >
                           <Text> Best Seller </Text>
                         </Box>
                       )}
                     </Box> */}
            </Box>
            <Box pl="3">
              <Text fontSize="2xl">
                {product.name.length > 16
                  ? `${product.name.substring(0, 15)}...`
                  : product.name}
              </Text>
              <Text fontSize="xl">{product.price}</Text>
              <Text>
                {product.desc.length > 30
                  ? `${product.desc.substring(0, 30)}...`
                  : product.desc}
              </Text>
            </Box>
          </Box>
        </motion.div>
      </div>
    </Pressable>
  );
};
