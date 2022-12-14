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
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBarMenu from "../../components/SidebarMenu";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getCategories, getOneCategory } from "../../services/basicOperations";
import { getProductsByCategory } from "../../services/products";
import "./style.css";
import { motion } from "framer-motion";
import UserContext from "../../contexts/userContext";

export default function MainHome({ history }: any) {
  const { id } = useParams<{ id: string }>();
  const [auxCategory, setAuxCategory] = useState<string>();
  const [adminCategory, setAdminCategory] = useState<Icategories>();

  const { user } = useContext(UserContext);
  const [category, setCategory] = useState<Icategories>();

  const [products, setProducts] = useState<Iproducts[]>([]);
  const [hover, setHover] = useState<{
    value: boolean;
    index: number;
  } | null>();

  const [isOpen, setIsOpen] = useState(false);
  const getProductSnapshot = (snapshot: DocumentData) => {
    const productsData = snapshot.docs.map((doc: DocumentData) => doc.data());
    setProducts(productsData);
  };

  const getCategorySnapshot = (snapshot: DocumentData) => {
    const categoryData = snapshot.docs.map((doc: DocumentData) => doc.data());
    setCategory(categoryData[0]);
  };

  useEffect(() => {
    if (user?.role !== "admin") {
      getProductsByCategory(id, getProductSnapshot);

      getOneCategory(id, getCategorySnapshot);
    } else {
      const getCategoriesSnapshot = (snapshot: DocumentData) => {
        const categoriesData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );

        // setAuxCategory(categoriesData[0].uid);
        if (categoriesData[0].uid) {
          console.log("CATEGORIES DATA: ", categoriesData[0].uid);
          getProductsByCategory(categoriesData[0].uid, getProductSnapshot);

          setCategory(categoriesData[0]);
        }
      };

      getCategories(getCategoriesSnapshot);
    }
  }, []);

  useEffect(() => {
    console.log("AUX CATEGORY: ", auxCategory);
    if (auxCategory) {
      getProductsByCategory(auxCategory, getProductSnapshot);
    }
  }, [auxCategory]);
  return (
    <>
      <SideBarMenu callBackParent={setAuxCategory}>
        <>
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
                mt="55"
                // p='0'
                mr="5%"
                borderRadius={35}
                onHoverIn={() => {
                  setHover({ value: true, index: index });
                }}
                onHoverOut={() => setHover(null)}
                onPress={() => {
                  setTimeout(() => {
                    setIsOpen(!isOpen);
                    history.push(`/product/${product.uid}`);
                  }, 300);
                }}
              >
                <div className="card-container-menu">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
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
            ))}
          </Box>
        </>
      </SideBarMenu>
    </>
  );
}
