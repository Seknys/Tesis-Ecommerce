import { DocumentData } from "firebase/firestore";
import {
  Box,
  Center,
  Container,
  Text,
  Image,
  HStack,
  Button,
  Input,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import SideBarMenu from "../../components/SidebarMenu";
import UserContext from "../../contexts/userContext";
import { Iproducts } from "../../interfaces/interface";
import { addProductToCart, getProductByUid } from "../../services/products";

export default function ProductDisplay() {
  const { t } = useTranslation();
  const { uid } = useParams<{ uid: string }>();
  const [product, setProduct] = useState<Iproducts>();
  const productName = useRef("");
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const getProductSnapshot = (snapshot: DocumentData) => {
      //   const productData

      setProduct(snapshot.data());
    };
    getProductByUid(uid, getProductSnapshot);

    if (product) {
      console.log("product");
      productName.current = product.name;
    }
  }, []);

  const addToCart = () => {
    if (user && product) {
      product["quantity"] = count;
      // console.log("add to cart", user.uid);
      // console.log("Count", count);
      addProductToCart(user.uid, product);
    }
  };

  return (
    <Box>
      <SideBarMenu>
        <Center>
          <Container>
            <Text fontSize="3xl">PRODUCTOOO {product?.name}</Text>
          </Container>
        </Center>
        <HStack flexDirection="row" w="100%">
          <Box flex={3}>
            <Image
              source={{
                uri: product?.name,
              }}
              alt={productName.current}
              w="380"
              h="320"
              resizeMode="contain"
              alignSelf="center"
            />
          </Box>
          <Box w="100%" flex={4} pl="3%">
            <Text fontSize="2xl" color="white">
              {product?.name.toUpperCase()}
            </Text>
            <Text fontSize="2xl" color="white">
              $ {product?.price}
            </Text>
            <Text fontSize="2xl" color="white">
              {product?.stock}
            </Text>

            <Text fontSize="2xl" color="white">
              {product?.desc}
            </Text>

            {product && product.stock > 0 && (
              <Button
                bg="primary"
                w="25%"
                onPress={() => {
                  addToCart();
                }}
              >
                <Text>{t("add_cart")}</Text>
              </Button>
            )}

            {product && product.feat && (
              <Box>
                <Text fontSize="2xl" color="white">
                  {t("menu_about")}
                </Text>
                {product.feat.map((feat, index) => (
                  <Text fontSize="2xl" color="white" key={index}>
                    * {feat}
                  </Text>
                ))}
              </Box>
            )}

            <HStack>
              <Input
                type="number"
                value={count.toString()}
                onChangeText={(text) => setCount(parseInt(text))}
                color="white"
                fontSize="2xl"
                // _text={{
                //   color: "white",
                //   fontSize: "2xl",
                //   fontWeight: "bold",
                // }}
                w="25%"
              />
              <Button
                bg="primary"
                w="25%"
                onPress={() => {
                  setCount(count + 1);
                }}
              >
                <Text bold fontSize={"2xl"}>
                  +
                </Text>
              </Button>
              {count <= 1 ? (
                <Button
                  bg="primary"
                  w="25%"
                  // disabled={count <= 1}
                  onPress={() => {
                    setCount(count - 1);
                  }}
                >
                  <Text bold fontSize={"2xl"}>
                    Delete
                  </Text>
                </Button>
              ) : (
                <Button
                  bg="primary"
                  w="25%"
                  // disabled={count <= 1}
                  onPress={() => {
                    setCount(count - 1);
                  }}
                >
                  <Text bold fontSize={"2xl"}>
                    -
                  </Text>
                </Button>
              )}
        
            </HStack>
          </Box>
        </HStack>
      </SideBarMenu>
    </Box>
  );
}
