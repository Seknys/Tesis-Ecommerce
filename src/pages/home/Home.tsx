import { DocumentData } from "firebase/firestore";
import { url } from "inspector";
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Image,
  Pressable,
  Text,
  useMediaQuery,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTags } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Interface } from "readline";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getProductsByBuy, getProductsByViews } from "../../services/admin";
import { getCategories } from "../../services/basicOperations";

import { ProductCarousel } from "./carousel/ProductCarousel";
import MainHome from "./MainHome";
import "./style.css";

export default function HomePage({ history }: any) {
  // const categories = useRef<Icategories[]>();

  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 768,
  });
  const [isMediumScreen] = useMediaQuery({
    minWidth: 769,
    maxWidth: 1150,
  });

  const { t } = useTranslation();
  const [productsByView, setProductsByView] = useState<Iproducts[]>([]);
  const [productsBuy, setProductsBuy] = useState<Iproducts[]>([]);

  const [categories, setCategories] = useState<Icategories[]>([]);
  const [hover, setHover] = useState<{
    value: boolean;
    index: number;
  } | null>();

  useEffect(() => {
    const getProductsByViewsSnapshot = (snapshot: DocumentData) => {
      const productsData = snapshot.docs.map((doc: DocumentData) => doc.data());
      //set just 10 products
      if (productsData.length > 10) {
        productsData.length = 10;
      }

      setProductsByView(productsData);
    };
    getProductsByViews(getProductsByViewsSnapshot);
    const getProductsByBuySnapshot = (snapshot: DocumentData) => {
      const productsData = snapshot.docs.map((doc: DocumentData) => doc.data());

      if (productsData.length > 10) {
        productsData.length = 10;
      }
      console.log("BUY: ", productsData);

      setProductsBuy(productsData);
    };
    getProductsByBuy(getProductsByBuySnapshot);

    const getCategoriesSnapshot = (snapshot: DocumentData) => {
      const categoriesData = snapshot.docs.map((doc: DocumentData) =>
        doc.data()
      );
      setCategories(categoriesData);
    };
    getCategories(getCategoriesSnapshot);
  }, []);

  return (
    <>
      <Center my="25px">
        {/* <Switch>
        <Route exact path={path} children={MainHome} />
        <Route path={`${path}/:categoryId`} children={MainHome} />
      </Switch> */}

        {!isSmallScreen ? (
          <HStack w="70%" justifyContent={"space-around"}>
            <Link
              to="/more-views/views?=true"
              style={{ textDecoration: "none" }}
            >
              <HStack alignItems={"center"}>
                <Text
                  mr="3"
                  fontSize={"lg"}
                  color="gray.400"
                  fontFamily="heading"
                  fontWeight="300"
                  fontStyle={"italic"}
                >
                  {t("products_moreViewed")}
                </Text>
                <IoStatsChart className="icon-views" />
              </HStack>
            </Link>

            <Link to="/more-buy/buy?=true" style={{ textDecoration: "none" }}>
              <HStack alignItems={"center"}>
                <Text
                  mr="3"
                  fontSize={"lg"}
                  color="gray.400"
                  fontFamily="heading"
                  fontWeight="300"
                  fontStyle={"italic"}
                >
                  {t("products_moreBuy")}
                </Text>
                <FaTags className="icon-buy" />
              </HStack>
            </Link>
          </HStack>
        ) : (
          <HStack w="100%" justifyContent={"space-around"}>
            <Link
              to="/more-views/views?=true"
              style={{ textDecoration: "none" }}
            >
              <HStack alignItems={"center"}>
                <Text
                  mr="3"
                  fontSize={"lg"}
                  color="gray.400"
                  fontFamily="heading"
                  fontWeight="300"
                  fontStyle={"italic"}
                >
                  {t("label_MovilVIew")}
                </Text>
                <IoStatsChart className="icon-views" />
              </HStack>
            </Link>

            <Link to="/more-buy/buy?=true" style={{ textDecoration: "none" }}>
              <HStack alignItems={"center"}>
                <Text
                  mr="3"
                  fontSize={"lg"}
                  color="gray.400"
                  fontFamily="heading"
                  fontWeight="300"
                  fontStyle={"italic"}
                >
                  {t("label_MovilBuy")}
                </Text>
                <FaTags className="icon-buy" />
              </HStack>
            </Link>
          </HStack>
        )}

        {isSmallScreen && (
          <Text fontSize={"xl"} bold>
            {t("label_categories")}
          </Text>
        )}
        <Container
          alignSelf={"center"}
          display={"flex"}
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="space-around"
        >
          {categories?.map((category: Icategories, index) => {
            if (isSmallScreen) {
              return (
                <div
                  key={`${category.uid}_${index}`}
                  className="small-menu-container"
                >
                  <Pressable
                    shadow={8}
                    borderRadius="30"
                    // bg="cyan.600"
                    w="125"
                    h="100"
                  >
                    <Link
                      to={`category/${category.uid}`}
                      className="link-container"
                    >
                      <Image
                        source={{ uri: category.img }}
                        alt={category.uid}
                        width="125"
                        height="100"
                        resizeMode="cover"
                        borderRadius="30"
                      />
                    </Link>
                  </Pressable>
                  <Box w="100%">
                    <Text
                      fontSize={"md"}
                      alignSelf={"center"}
                      fontFamily="heading"
                      fontWeight="500"
                    >
                      {category.name}
                    </Text>
                  </Box>
                </div>
              );
            } else {
              return (
                // <Link to={`${url}/${category.uid}`} key={category.uid}>
                <div
                  key={`${category.uid}_${index}`}
                  className="menu-container"
                >
                  <Pressable
                    shadow={8}
                    borderRadius="30"
                    onHoverIn={() => setHover({ value: true, index: index })}
                    onHoverOut={() => setHover(null)}
                    key={category.uid}
                  >
                    <Link
                      to={`category/${category.uid}`}
                      className="link-container"
                    >
                      <Image
                        // bg="success.700"
                        source={{ uri: category.img }}
                        alt={category.uid}
                        width="18vw"
                        // height="300"
                        height={isMediumScreen ? "200px" : "275px"}
                        mx="10"
                        resizeMode="contain"
                        //   size='2xl'

                        borderRadius="30"
                      />

                      {hover?.value && hover?.index === index && (
                        // <div className={`text-contain text-${index} `}>
                        //   <Text
                        //     fontSize="2xl"
                        //     textAlign="center"
                        //     color="white"
                        //     bg="primary"
                        //     py="3"
                        //     borderRadius="35"
                        //   >
                        //     {category.name}
                        //   </Text>
                        // </div>
                        <Box position="absolute" top="38%" px="35" w="100%">
                          <Text
                            isTruncated
                            fontSize="2xl"
                            textAlign="center"
                            bg={"rgba(0,0,0, 0.7)"}
                            color="white"
                            py="3"
                            borderRadius="35"
                            fontFamily={"heading"}
                            fontWeight="700"
                          >
                            {category.name}
                          </Text>
                        </Box>
                      )}
                    </Link>
                  </Pressable>
                </div>
              );
            }
          })}
        </Container>

        {productsByView.length > 5 && (
          <Container alignItems="center" my="25" shadow={6} borderRadius={10}>
            <Link
              to="/more-views/views?=true"
              style={{ textDecoration: "none" }}
            >
              <Text
                textAlign={"center"}
                fontSize={"2xl"}
                pl="25"
                my="15"
                w="100%"
                fontFamily="heading"
                fontWeight="500"
              >
                {t("products_moreViewed")}
              </Text>
            </Link>

            <ProductCarousel history={history} products={productsByView} />
          </Container>
        )}

        {productsBuy.length > 5 && (
          <Container alignItems="center" my="25" shadow={6} borderRadius={10}>
            <Link to="/more-buy/buy?=true" style={{ textDecoration: "none" }}>
              <Text
                textAlign={"center"}
                fontSize={"3xl"}
                bold
                pl="25"
                my="15"
                w="100%"
                fontFamily="heading"
                fontWeight="500"
              >
                {t("products_moreBuy")}
              </Text>
            </Link>

            <ProductCarousel history={history} products={productsBuy} />
          </Container>
        )}
      </Center>
    </>
  );
}
