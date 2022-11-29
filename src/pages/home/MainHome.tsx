import { DocumentData } from "firebase/firestore";
import { Box, Center, Container, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Icategories, Iproducts } from "../../interfaces/interface";
import { getOneCategory } from "../../services/basicOperations";
import { getProductsByCategory } from "../../services/products";

export default function MainHome() {
  const { id } = useParams<{ id: string }>();

  const [category, setCategory] = useState<Icategories>();

  const [products, setProducts] = useState<Iproducts[]>([]);

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
    <Center>
      <Container>
        <Text fontSize="2xl">{category?.name}</Text>
        {products?.map((product) => (
          <Box key={product.uid}>
            <Text>MIOOOO {product.name}</Text>
          </Box>
        ))}
      </Container>
    </Center>
  );
}
