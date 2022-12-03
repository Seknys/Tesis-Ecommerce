import { DocumentData } from "firebase/firestore";
import {
  Box,
  Center,
  Container,
  Text,
  Image,
  HStack,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import SideBarMenu from "../../components/SidebarMenu";
import { Iproducts } from "../../interfaces/interface";
import { getProductByUid } from "../../services/products";

export default function ProductDisplay() {
  const { t } = useTranslation();
  const { uid } = useParams<{ uid: string }>();
  const [product, setProduct] = useState<Iproducts>();

  useEffect(() => {
    const getProductSnapshot = (snapshot: DocumentData) => {
      //   const productData
      
      setProduct(snapshot.data());
    };
    getProductByUid(uid, getProductSnapshot);
  }, []);

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
                uri: product?.img,
              }}
              alt={product?.name}
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
              <Button bg="primary" w="25%">
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
          </Box>
        </HStack>
      </SideBarMenu>
    </Box>
  );
}
