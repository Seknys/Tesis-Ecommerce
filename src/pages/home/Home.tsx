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
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Interface } from "readline";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getProductsByViews } from "../../services/admin";
import { getCategories } from "../../services/basicOperations";
import { ProductCarousel } from "./carousel/ProductCarousel";
import MainHome from "./MainHome";

export default function HomePage({ history }: any) {
  // const categories = useRef<Icategories[]>();

  let { path, url } = useRouteMatch();
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
      console.log("productsData: ", productsData);
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

            <Pressable
              onHoverIn={() => setHover({ value: true, index: index })}
              onHoverOut={() => setHover(null)}
              key={category.uid}
              borderRadius="30"
              borderColor="primary"
              borderWidth="3"
              my="25"

              // w='120'
              // h='120'
            >
              <Link to={`category/${category.uid}`}>
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
                  <Box position="absolute" top="38%" px="35" w="100%">
                    <Text
                      fontSize="2xl"
                      textAlign="center"
                      color="white"
                      bg="primary"
                      py="3"
                      borderRadius="35"
                    >
                      {category.name}
                    </Text>
                  </Box>
                )}
              </Link>
            </Pressable>
          ))}
        </Container>
        <Text>CAROUSEL</Text>
        {productsByView.length > 4 && (
          <Container alignItems="center">
            <Text>Productos más vistos</Text>
            <ProductCarousel history={history} products={productsByView} />
          </Container>
        )}
      </Center>
    </>
  );
}
