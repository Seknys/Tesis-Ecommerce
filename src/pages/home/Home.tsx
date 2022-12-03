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
import { Icategories } from "../../interfaces/interface";
import { getCategories } from "../../services/basicOperations";
import MainHome from "./MainHome";

export default function HomePage({ history }: any) {
  // const categories = useRef<Icategories[]>();

  let { path, url } = useRouteMatch();

  const [categories, setCategories] = useState<Icategories[]>([]);
  const [hover, setHover] = useState<{
    value: boolean;
    index: number;
  } | null>();

  useEffect(() => {
    const getCategoriesSnapshot = (snapshot: DocumentData) => {
      const categoriesData = snapshot.docs.map((doc: DocumentData) =>
        doc.data()
      );
      setCategories(categoriesData);
    };
    getCategories(getCategoriesSnapshot);
  }, []);

  return (
    <Center>
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
          <Link to={`category/${category.uid}`} key={category.uid}>
            <Pressable
              onHoverIn={() => setHover({ value: true, index: index })}
              onHoverOut={() => setHover(null)}
              key={category.uid}
              borderRadius="30"
              borderColor="primary"
              borderWidth="3"
              my="25"
              bg="white"

              // w='120'
              // h='120'
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
            </Pressable>
          </Link>
        ))}
      </Container>
    </Center>
  );
}
