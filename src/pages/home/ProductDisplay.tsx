import { DocumentData } from "firebase/firestore";
import {
  Box,
  Center,
  Container,
  Text,
  Image,
  HStack,
  Button,
  Input,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import SideBarMenu from "../../components/SidebarMenu";
import UserContext from "../../contexts/userContext";
import { IComments, Iproducts } from "../../interfaces/interface";
import {
  addProductToCart,
  getCommetsbyProduct,
  getProductByUid,
  updateAddedToCart,
} from "../../services/products";
import { ImageSyncCarousel } from "./carousel/ProductCarousel";
import { ComentsView } from "./componets/ComentsView";
import { InputComent } from "./componets/InputComent";

export default function ProductDisplay({ history }: { history: any }) {
  const { t } = useTranslation();
  const { uid } = useParams<{ uid: string }>();
  const [product, setProduct] = useState<Iproducts>();
  const productName = useRef("");
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(1);
  const [comments, setComments] = useState<IComments[]>();

  useEffect(() => {
    console.log("mount");
    const getProductSnapshot = (snapshot: DocumentData) => {
      //   const productData

      setProduct(snapshot.data());
    };
    getProductByUid(uid, getProductSnapshot);

    if (product) {
      console.log("product");
      productName.current = product.name;
    }

    const commetsByProductFunction = (comments: IComments[]) => {
      setComments(comments);
    };
    getCommetsbyProduct(uid, commetsByProductFunction);
    return () => {
      console.log("unmount");
    };
  }, []);

  const addToCart = () => {
    if (user && product) {
      product["quantity"] = count;
      product["productUid"] = product.uid;
      // console.log("add to cart", user.uid);
      // console.log("Count", count);
      addProductToCart(user.uid, product);
      updateAddedToCart(product.uid, product?.addedToCart);
    }
  };

  return (
    <Box>
      <SideBarMenu isProduct historyProduct={history}>
        <Center>
          <Container>
            <Text fontSize="3xl" bold>
              {product?.name}
            </Text>
          </Container>
        </Center>
        <HStack flexDirection="row" w="100%">
          <Box flex={3}>
            <ImageSyncCarousel product={product} />
          </Box>
          <Box w="100%" flex={4} pl="3%">
            {/* <Text fontSize="2xl" color="white">
              {product?.name.toUpperCase()}
            </Text> */}
            <Text fontSize="sm">{t("product_desc")}</Text>
            <Text fontSize="2xl">{product?.desc}</Text>
            <Text fontSize="sm">{t("product_price")}</Text>
            <Text fontSize="2xl">${product?.price}</Text>
            <Text fontSize="sm">Stock</Text>
            <Text fontSize="2xl">{product?.stock}</Text>

            {product && product.stock > 0 && user ? (
              <Button
                bg="primary"
                w="25%"
                onPress={() => {
                  addToCart();
                }}
              >
                <Text>{t("add_cart")}</Text>
              </Button>
            ) : (
              <Text>{t("no_stock")} stock</Text>
            )}
            {product && product.feat && (
              <Box>
                <Text fontSize="sm" color="black">
                  {t("product_about")}
                </Text>

                {product.feat.map((feat, index) => (
                  <Text fontSize="2xl" color="black" key={index}>
                    *{feat}
                  </Text>
                ))}
              </Box>
            )}
            <HStack>
              <Input
                isDisabled
                _disabled={{
                  bg: "white",
                  color: "Black",
                  fontSize: "2xl",
                  fontWeight: "bold",
                }}
                type="number"
                value={count.toString()}
                onChangeText={(text) => setCount(parseInt(text))}
                color="white"
                fontSize="2xl"
                // _text={{
                //   color: "white",
                //   fontSize: "2xl",
                //   fontWeight: "bold",
                // }}
                w="25%"
              />
              {product && count < product?.stock && (
                <Button
                  bg="primary"
                  w="25%"
                  onPress={() => {
                    setCount(count + 1);
                  }}
                >
                  <Text bold fontSize={"2xl"}>
                    +
                  </Text>
                </Button>
              )}

              {count <= 1 ? (
                <Button
                  bg="primary"
                  w="25%"
                  // disabled={count <= 1}
                  onPress={() => {
                    setCount(count - 1);
                  }}
                >
                  <Text bold fontSize={"2xl"}>
                    Delete
                  </Text>
                </Button>
              ) : (
                <Button
                  bg="primary"
                  w="25%"
                  // disabled={count <= 1}
                  onPress={() => {
                    setCount(count - 1);
                  }}
                >
                  <Text bold fontSize={"2xl"}>
                    -
                  </Text>
                </Button>
              )}
            </HStack>
          </Box>
        </HStack>
      </SideBarMenu>

      <Center w="100%" mt="100">
        <Box>
          <Text fontSize={"2xl"} bold>
            {t("comments")}
          </Text>
        </Box>
        {user ? (
          <InputComent productUid={product?.uid} />
        ) : (
          <Text fontSize={"xl"} my="15px">
            {t("coments_noUser")}
          </Text>
        )}

        <Box
          mt="25"
          w="90%"
          display={"flex"}
          flexDirection="row"
          flexWrap="wrap"
        >
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              // <HStack
              //   key={index}
              //   w="60%"

              //   borderWidth={4}
              //   borderColor="black"
              //   borderRadius={20}
              //   p={4}
              // >
              //   <Box flex={2}>
              //     <Text fontSize={"2xl"} bold>
              //       name here
              //     </Text>
              //   </Box>
              //   <Box flex={7}>
              //     <Text textAlign="end" fontSize={"xl"} bold>
              //       {comment.date}
              //     </Text>
              //     <Text fontSize={"2xl"} bold>
              //       {comment.message}
              //     </Text>
              //   </Box>
              // </HStack>
              <ComentsView key={index} comment={comment} index={index} />
            ))
          ) : (
            <Center w="100%" mt="150px">
              <Text fontSize={"2xl"} bold>
                {t("no_comments")}
              </Text>
            </Center>
          )}
        </Box>
      </Center>
    </Box>
  );
}
