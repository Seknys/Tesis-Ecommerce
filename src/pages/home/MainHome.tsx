import { DocumentData } from "firebase/firestore";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Text,
  Image,
  Stack,
  Heading,
  HStack,
  Pressable,
  PresenceTransition,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBarMenu from "../../components/SidebarMenu";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getOneCategory } from "../../services/basicOperations";
import { getProductsByCategory } from "../../services/products";
import "./style.css";
import { motion } from "framer-motion";

export default function MainHome({ history }: any) {
  const { id } = useParams<{ id: string }>();

  const [category, setCategory] = useState<Icategories>();

  const [products, setProducts] = useState<Iproducts[]>([]);
  const [hover, setHover] = useState<{
    value: boolean;
    index: number;
  } | null>();

  const [isOpen, setIsOpen] = useState(false);

  //Array of 10 elements
  const arrayP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //   console.log("id", categoryId);

  useEffect(() => {
    const getProductSnapshot = (snapshot: DocumentData) => {
      const productsData = snapshot.docs.map((doc: DocumentData) => doc.data());

      setProducts(productsData);
    };
    getProductsByCategory(id, getProductSnapshot);

    const getCategorySnapshot = (snapshot: DocumentData) => {
      const categoryData = snapshot.docs.map((doc: DocumentData) => doc.data());

      setCategory(categoryData[0]);
    };
    getOneCategory(id, getCategorySnapshot);
  }, []);

  return (
    <>
      <SideBarMenu>
        <Box w="100%">
          <Text textAlign="left" fontSize="2xl">
            {category?.name}
          </Text>
        </Box>
        <Box
          flexWrap="wrap"
          // justifyContent="space-around"
          flexDirection="row"
        >
          {products?.map((product, index) => (
            <Pressable
              // mr="5%"
              key={product.uid}
              mt="25"
              onHoverIn={() => {
                setHover({ value: true, index: index });
              }}
              onHoverOut={() => setHover(null)}
              onPress={() => {
                setIsOpen(!isOpen);
                history.push(`/product/${product.uid}`);
              }}
            >
              <div className="example-container">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Box
                    w="220"
                    h="290"
                    // overflow="hidden"
                    _dark={{
                      borderColor: "coolGray.600",
                      backgroundColor: "gray.700",
                    }}
                    _light={{
                      backgroundColor: "gray.50",
                    }}
                  >
                    <Box w="100%" p="2">
                      <Image
                        source={{
                          uri: product.img,
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
                    <Box pl='3'> 
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
          ))}
        </Box>
      </SideBarMenu>
    </>
  );
}
