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
import { Interface } from "readline";
import { Icategories } from "../../interfaces/interface";
import { getCategories } from "../../services/basicOperations";

export default function HomePage() {
  // const categories = useRef<Icategories[]>();

  const [categories, setCategories] = useState<Icategories[]>([]);
  const [hover, setHover] = useState<{
    value: boolean;
    index: number;
  } | null>();

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <Center>
      <Container
        alignSelf={"center"}
        display={"flex"}
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-around"
      >
        {categories?.map((category: Icategories, index) => (
          <Pressable
            onHoverIn={() => setHover({ value: true, index: index })}
            onHoverOut={() => setHover(null)}
            key={category.uid}
            borderRadius="30"
            borderColor="primary"
            borderWidth="3"
            mx="35"
            my="25"
            // w='120'
            // h='120'
          >
            {/* <Image
              source={{ uri: category.img }}
              alt="Alternate Text"
              size="2xl"
              borderRadius="30"
            /> */}

            {hover?.value && hover?.index === index && (
              <Box
              // position='absolute' top='40%' left='30%' bg='primary'
              >
                <Text fontSize="2xl" textAlign="center" color="white">
                  {category.name}
                </Text>
              </Box>
            )}
          </Pressable>
        ))}
      </Container>
    </Center>
  );
}
