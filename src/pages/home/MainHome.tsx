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
import { getProductsByViews } from "../../services/admin";
import { useTranslation } from "react-i18next";

export default function MainHome({ history }: any) {
  const { t } = useTranslation();
  const { value } = useParams<{ value: string }>();
  const { id } = useParams<{ id: string }>();
  const { admin } = useParams<{ admin: string }>();
  const { analyst } = useParams<{ analyst: string }>();
  const [auxCategory, setAuxCategory] = useState<Icategories>();
  const [adminCategory, setAdminCategory] = useState<Icategories>();

  const { user } = useContext(UserContext);
  const [category, setCategory] = useState<Icategories>();

  const [products, setProducts] = useState<Iproducts[]>([]);
  const [productsByView, setProductsByView] = useState<Iproducts[]>([]);
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
    if (value) {
      console.log("value", value);
      //Value should be the attribute to fetch the data with a filter
      const getProductsByViewsSnapshot = (snapshot: DocumentData) => {
        const productsData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );
        console.log("productsData", productsData);

        setProductsByView(productsData);
      };
      getProductsByViews(getProductsByViewsSnapshot);
    } else {
      if (user?.role !== "admin" && user?.role !== "analyst") {
        getProductsByCategory(id, getProductSnapshot);

        getOneCategory(id, getCategorySnapshot);
      } else {
        const getCategoriesSnapshot = (snapshot: DocumentData) => {
          const categoriesData = snapshot.docs.map((doc: DocumentData) =>
            doc.data()
          );

          // setAuxCategory(categoriesData[0].uid);
          if (categoriesData[0].uid) {
            getProductsByCategory(categoriesData[0].uid, getProductSnapshot);

            setCategory(categoriesData[0]);
          }
        };

        getCategories(getCategoriesSnapshot);
      }
    }
  }, []);

  useEffect(() => {
    if (auxCategory) {
      getProductsByCategory(auxCategory.uid, getProductSnapshot);
    }
    return () => {
      setProducts([]);
    };
  }, [auxCategory]);

  return (
    <>
      <SideBarMenu callBackParent={setAuxCategory}>
        <>
          <Box w="100%">
            {auxCategory ? (
              <Text bold textAlign="left" fontSize="2xl">
                {auxCategory.name}
              </Text>
            ) : (
              <Text bold textAlign="left" fontSize="2xl">
                {category?.name}
              </Text>
            )}
            {value && (
              <Text bold textAlign="left" fontSize="2xl">
                {t("label_moreView")}
              </Text>
            )}
            {/* <Text bold textAlign="left" fontSize="2xl">
              {category?.name}
            </Text> */}
          </Box>
          <Box
            flexWrap="wrap"
            // justifyContent="space-around"
            flexDirection="row"
          >
            {admin &&
              products?.map((product) => (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/admin/edit-product/${product.uid}`}
                  key={product.uid}
                >
                  <CardProduct product={product} />
                </Link>
              ))}
            {analyst &&
              products?.map((product) => (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/analyst/product/${product.uid}`}
                  key={product.uid}
                >
                  <CardProduct product={product} />
                </Link>
              ))}
            {id &&
              products?.map((product, index) => (
                <CardProduct
                  key={product.uid + index}
                  product={product}
                  handleOnPress={async () => {
                    await updateViews(product.uid, product.views)
                      .then(() => {
                        console.log("Views updated");
                        history.push(`/product/${product.uid}`);
                      })
                      .catch((error) => {
                        console.log("ViewsError", error);
                      });
                  }}
                />
              ))}
            {value &&
              productsByView?.map((product, index) => (
                <CardProduct
                  key={product.uid + index}
                  product={product}
                  handleOnPress={async () => {
                    await updateViews(product.uid, product.views)
                      .then(() => {
                        console.log("Views updated");
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
    </>
  );
}
