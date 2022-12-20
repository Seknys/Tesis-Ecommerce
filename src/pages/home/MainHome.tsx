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
import {
  getProductsByCategory,
  updateProduct,
  updateViews,
} from "../../services/products";
import "./style.css";
import { motion } from "framer-motion";
import UserContext from "../../contexts/userContext";
import { CardProduct } from "./componets/CardProduct";

export default function MainHome({ history }: any) {
  const { id } = useParams<{ id: string }>();
  const { admin } = useParams<{ admin: string }>();
  const [auxCategory, setAuxCategory] = useState<string>();
  const [adminCategory, setAdminCategory] = useState<Icategories>();

  const { user } = useContext(UserContext);
  const [category, setCategory] = useState<Icategories>();

  const [products, setProducts] = useState<Iproducts[]>([]);
  // const [hover, setHover] = useState<{
  //   value: boolean;
  //   index: number;
  // } | null>();

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

  const handleOnPressProduct = (product: Iproducts) => {
    if (admin) {
      history.push(`/admin/add-product`);
      return;
    } else {
      setTimeout(() => {
        setIsOpen(!isOpen);
        history.push(`/product/${product.uid}`);
      }, 300);

      updateViews(product.uid, product.views);
    }
  };

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
            {products?.map((product) => {
              if (!admin) {
                return (
                  <CardProduct
                    key={product.uid}
                    product={product}
                    handleOnPress={handleOnPressProduct}
                  />
                );
              } else {
                console.log("Admin Exist: ", admin);
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/admin/edit-product/${product.uid}`}
                    key={product.uid}
                  >
                    <CardProduct product={product} />
                  </Link>
                );
              }
            })}
          </Box>
        </>
      </SideBarMenu>
    </>
  );
}
