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
  useMediaQuery,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBarMenu from "../../components/SidebarMenu";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getCategories, getOneCategory } from "../../services/basicOperations";
import {
  getProductsByCategory,
  updateProduct,
  updateViews,
} from "../../services/products";
import "./style.css";
import { motion } from "framer-motion";
import UserContext from "../../contexts/userContext";
import { CardProduct } from "./componets/CardProduct";
import { getProductsByBuy, getProductsByViews } from "../../services/admin";
import { useTranslation } from "react-i18next";

export default function SpecialCategory({ history }: any) {
  const { t } = useTranslation();
  const { value } = useParams<{ value: string }>();

  const { user } = useContext(UserContext);

  const [specialProducts, setSpecialProducts] = useState<Iproducts[]>([]);

  const getProductSnapshot = (snapshot: DocumentData) => {
    const productsData = snapshot.docs.map((doc: DocumentData) => doc.data());
    setSpecialProducts(productsData);
  };

  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 1200,
  });

  useEffect(() => {
    if (value) {
      //Value should be the attribute to fetch the data with a filter
      getProductsByBuy(getProductSnapshot);
    }
  }, []);

  return (
    <>
      {!isSmallScreen ? (
        <SideBarMenu isProduct historyProduct={history}>
          <>
            <Box w="100%">
              <Text bold textAlign="left" fontSize="2xl">
                {t("products_moreBuy")}
              </Text>
            </Box>
            <Box
              flexWrap="wrap"
              w="100%"
              // bg="yellow.400"
              // justifyContent="space-around"
              // justifyContent={"center"}
              flexDirection="row"
            >
              {value &&
                specialProducts?.map((product, index) => (
                  <CardProduct
                    key={product.uid + index}
                    product={product}
                    handleOnPress={async () => {
                      await updateViews(product.uid)
                        .then(() => {
                          history.push(`/product/${product.uid}`);
                        })
                        .catch((error) => {
                          console.log("ViewsError", error);
                        });
                    }}
                  />
                ))}
            </Box>
          </>
        </SideBarMenu>
      ) : (
        <Center w="100%" my="25">
          <Text bold fontSize="2xl">
            {t("label_moreView")}
          </Text>

          <Box
            flexWrap="wrap"
            justifyContent={"center"}
            // justifyContent="space-around"
            flexDirection="row"
          >
            {value &&
              specialProducts?.map((product, index) => (
                <CardProduct
                  key={product.uid + index}
                  product={product}
                  handleOnPress={async () => {
                    await updateViews(product.uid)
                      .then(() => {
               
                        history.push(`/product/${product.uid}`);
                      })
                      .catch((error) => {
                        console.log("ViewsError", error);
                      });
                  }}
                />
              ))}
          </Box>
        </Center>
      )}
    </>
  );
}
