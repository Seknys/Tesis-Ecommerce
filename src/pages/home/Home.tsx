import { DocumentData } from "firebase/firestore";
import { url } from "inspector";
import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Pressable,
  Text,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Interface } from "readline";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getProductsByViews } from "../../services/admin";
import { getCategories } from "../../services/basicOperations";
import { ProductCarousel } from "./carousel/ProductCarousel";
import MainHome from "./MainHome";
import "./style.css";

export default function HomePage({ history }: any) {
  // const categories = useRef<Icategories[]>();

  const { t } = useTranslation();
  const [productsByView, setProductsByView] = useState<Iproducts[]>([]);

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

        <Container
          alignSelf={"center"}
          display={"flex"}
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="space-around"
        >
          {categories?.map((category: Icategories, index) => (
            // <Link to={`${url}/${category.uid}`} key={category.uid}>
            <div key={`${category.uid}_${index}`} className="menu-container">
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
                    source={{ uri: category.img }}
                    alt="Alternate Text"
                    width="18vw"
                    height="300"
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
                      >
                        {category.name}
                      </Text>
                    </Box>
                  )}
                </Link>
              </Pressable>
            </div>
          ))}
        </Container>

        {productsByView.length > 4 && (
          <Container alignItems="center" my="25" shadow={6} borderRadius={10}>
            <Link
              to="/more-views/views?=true"
              style={{ textDecoration: "none" }}
            >
              <Text fontSize={"3xl"} bold pl="25" my="15" w="100%">
                {t("products_moreViewed")}
              </Text>
            </Link>

            <ProductCarousel history={history} products={productsByView} />
          </Container>
        )}
      </Center>
    </>
  );
}
