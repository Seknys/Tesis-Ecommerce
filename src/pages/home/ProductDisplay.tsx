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
  Pressable,
  useMediaQuery,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
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
import { TbFileDescription } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { FaBoxes } from "react-icons/fa";
import {
  VscDebugBreakpointData,
  VscDebugBreakpointDataUnverified,
} from "react-icons/vsc";
import "./style.css";
import { SuccesToast, ToastC } from "../../components/Toast";
import { minWidth } from "@mui/system";

export default function ProductDisplay({ history }: { history: any }) {
  const { t } = useTranslation();
  const { uid } = useParams<{ uid: string }>();
  const [product, setProduct] = useState<Iproducts>();
  const productName = useRef("");
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(1);
  const [comments, setComments] = useState<IComments[]>();

  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 950,
  });

  interface ITags {
    label: string;
    value: string;
  }

  useEffect(() => {
    const getProductSnapshot = (snapshot: DocumentData) => {
      //   const productData

      console.log("snapshot", snapshot.data());
      setProduct(snapshot.data());
    };
    getProductByUid(uid, getProductSnapshot);

    if (product) {
      productName.current = product.name;
    }

    const commetsByProductFunction = (comments: IComments[]) => {
      setComments(comments);
    };
    getCommetsbyProduct(uid, commetsByProductFunction);
    return () => {};
  }, []);

  const addToCart = () => {
    if (user && product) {
      product["quantity"] = count;
      product["productUid"] = product.uid;
      // console.log("add to cart", user.uid);
      console.log("ADD TO CART: ", product);
      addProductToCart(user.uid, product).then((data) => {
        console.log("data¿", data);
        console.log("Add Messege");
        SuccesToast(t("cart_added"));
      });

      updateAddedToCart(product.uid, product?.addedToCart);
    }
  };

  return (
    <Box>
      <ToastC />
      {!isSmallScreen ? (
        <SideBarMenu isProduct historyProduct={history}>
          {product ? (
            <>
              <Center my="15">
                <Container>
                  <Text fontFamily="heading" fontSize="3xl" bold>
                    {product?.name}
                  </Text>
                </Container>
              </Center>
              <HStack w="100%">
                <Box h="490" flex={3} shadow={9} borderRadius={5}>
                  <ImageSyncCarousel product={product} />
                </Box>
                <Box w="100%" flex={4} pl="3%">
                  {/* <Text fontSize="2xl" color="white">
              {product?.name.toUpperCase()}
            </Text> */}
                  <HStack alignItems={"center"}>
                    <IconContext.Provider
                      value={{
                        color: "black",
                        size: "20px",
                        style: { marginRight: "5px" },
                      }}
                    >
                      <TbFileDescription />
                    </IconContext.Provider>

                    <Text
                      fontSize="sm"
                      fontFamily={"heading"}
                      fontStyle="italic"
                      fontWeight={"300"}
                    >
                      {t("product_desc")}
                    </Text>
                  </HStack>
                  <Text ml="17" fontSize="xl" fontWeight={"300"}>
                    {product?.desc}
                  </Text>
                  <HStack alignItems={"center"}>
                    <IconContext.Provider
                      value={{
                        color: "black",
                        size: "20px",
                        style: { marginRight: "5px" },
                      }}
                    >
                      <ImPriceTags />
                    </IconContext.Provider>

                    <Text
                      fontSize="sm"
                      fontFamily={"heading"}
                      fontStyle="italic"
                      fontWeight={"300"}
                    >
                      {t("product_price")}:{" "}
                    </Text>
                    <Text fontSize="2xl" fontWeight={"300"}>
                      {product?.price}$
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"} mb="15">
                    <IconContext.Provider
                      value={{
                        color: "black",
                        size: "20px",
                        style: { marginRight: "5px" },
                      }}
                    >
                      <FaBoxes />
                    </IconContext.Provider>

                    <Text
                      fontSize="sm"
                      fontFamily={"heading"}
                      fontStyle="italic"
                      fontWeight={"300"}
                    >
                      Stock:{" "}
                    </Text>
                    <Text fontSize="2xl" fontWeight={"300"}>
                      {product?.stock}
                    </Text>
                  </HStack>

                  {user ? (
                    product && product.stock > 0 ? (
                      <button
                        // bg="primary"
                        // w="25%"
                        className="btn-addCart"
                        onClick={() => {
                          addToCart();
                        }}
                      >
                        <Text fontSize={"18px"} color="black">
                          {t("add_cart")}
                        </Text>
                        <AiOutlineShoppingCart className="icon-cart" />
                      </button>
                    ) : (
                      <Text
                        fontFamily={"heading"}
                        fontStyle="italic"
                        fontWeight={"300"}
                      >
                        {t("no_stock")} stock
                      </Text>
                    )
                  ) : (
                    <Text
                      fontFamily={"heading"}
                      fontStyle="italic"
                      fontWeight={"300"}
                      fontSize={"18px"}
                      color="black"
                    >
                      {t("cart_noUser")}
                    </Text>
                  )}

                  {product && product.feat && (
                    <Box>
                      <Text
                        fontFamily={"heading"}
                        fontStyle="italic"
                        fontWeight={"300"}
                        mt="15"
                        mb="2"
                        fontSize="sm"
                        color="black"
                      >
                        {t("product_about")}
                      </Text>

                      {product.feat.map((feat, index) => (
                        <HStack
                          alignItems={"center"}
                          mb="15"
                          pl="3"
                          key={index}
                        >
                          <VscDebugBreakpointData />
                          <Text
                            fontWeight={"300"}
                            fontSize="xl"
                            color="black"
                            key={index}
                          >
                            {feat}
                          </Text>
                        </HStack>
                      ))}
                    </Box>
                  )}
                  <HStack alignItems={"center"}>
                    <Input
                      isDisabled
                      _disabled={{
                        bg: "white",
                        color: "Black",
                        fontSize: "2xl",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      type="number"
                      value={count.toString()}
                      onChangeText={(text) => setCount(parseInt(text))}
                      color="white"
                      fontSize="2xl"
                      w="75px"
                    />
                    {product && count < product?.stock && (
                      <Pressable
                        // bg="primary"
                        // w="25%"
                        ml="15px"
                        onPress={() => {
                          setCount(count + 1);
                        }}
                      >
                        <AiFillPlusCircle className="icon-minusCircle" />
                      </Pressable>
                    )}

                    {count <= 1 ? null : (
                      <Pressable
                        ml="15px"
                        // bg="primary"
                        // w="25%"
                        // disabled={count <= 1}
                        onPress={() => {
                          setCount(count - 1);
                        }}
                      >
                        <AiFillMinusCircle className="icon-minusCircle" />
                      </Pressable>
                    )}
                  </HStack>
                </Box>
              </HStack>
              <Text
                mt="25"
                fontSize={"xl"}
                color="gray.400"
                fontFamily={"heading"}
                fontStyle="italic"
                fontWeight={"300"}
              >
                Tags:
              </Text>
              <HStack w="80%">
                {product &&
                  product.tags &&
                  product?.tags.map((tag: any, index) => (
                    <Text
                      fontFamily={"heading"}
                      bg="gray.200"
                      shadow={9}
                      p="1"
                      m="1"
                      key={index}
                      fontSize="md"
                      color="black"
                      borderRadius={5}
                    >
                      {tag.label}
                    </Text>
                  ))}
              </HStack>
            </>
          ) : (
            <Center mt="150px">
              <Text bold fontSize={"2xl"} fontFamily="heading">
                {t("not_product")}
              </Text>
            </Center>
          )}
        </SideBarMenu>
      ) : (
        <>
          <Center my="25">
            <Text fontSize={"2xl"} bold>
              {product?.name}
            </Text>
            <Box w="85%" mb="50">
              <ImageSyncCarousel product={product} />
            </Box>
            <Box w="100%" px="25">
              {/* <Text fontSize="2xl" color="white">
              {product?.name.toUpperCase()}
            </Text> */}
              <HStack alignItems={"center"}>
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "20px",
                    style: { marginRight: "5px" },
                  }}
                >
                  <TbFileDescription />
                </IconContext.Provider>

                <Text fontSize="sm">{t("product_desc")}</Text>
              </HStack>
              <Text fontSize="2xl">{product?.desc}</Text>
              <HStack alignItems={"center"}>
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "20px",
                    style: { marginRight: "5px" },
                  }}
                >
                  <ImPriceTags />
                </IconContext.Provider>

                <Text fontSize="sm">{t("product_price")}: </Text>
                <Text fontSize="2xl">${product?.price}</Text>
              </HStack>
              <HStack alignItems={"center"} mb="15">
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "20px",
                    style: { marginRight: "5px" },
                  }}
                >
                  <FaBoxes />
                </IconContext.Provider>

                <Text fontSize="sm">Stock: </Text>
                <Text fontSize="2xl">{product?.stock}</Text>
              </HStack>

              {user ? (
                product && product.stock > 0 ? (
                  <button
                    // bg="primary"
                    // w="25%"
                    className="movil-btn-addCart"
                    onClick={() => {
                      addToCart();
                    }}
                  >
                    <Text fontSize={"18px"} color="black">
                      {t("add_cart")}
                    </Text>
                    <AiOutlineShoppingCart className="icon-cart" />
                  </button>
                ) : (
                  <Text>{t("no_stock")} stock</Text>
                )
              ) : (
                <Text fontSize={"18px"} color="black">
                  {t("cart_noUser")}
                </Text>
              )}

              {product && product.feat && (
                <Box>
                  <Text mt="15" mb="2" fontSize="sm" color="black">
                    {t("product_about")}
                  </Text>

                  {product.feat.map((feat, index) => (
                    <HStack alignItems={"center"} mb="15" pl="3" key={index}>
                      <VscDebugBreakpointData />
                      <Text fontSize="xl" color="black" key={index}>
                        {feat}
                      </Text>
                    </HStack>
                  ))}
                </Box>
              )}
              <HStack alignItems={"center"}>
                <Input
                  isDisabled
                  _disabled={{
                    bg: "white",
                    color: "Black",
                    fontSize: "2xl",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  type="number"
                  value={count.toString()}
                  onChangeText={(text) => setCount(parseInt(text))}
                  color="white"
                  fontSize="2xl"
                  w="75px"
                />
                {product && count < product?.stock && (
                  <Pressable
                    // bg="primary"
                    // w="25%"
                    ml="15px"
                    onPress={() => {
                      setCount(count + 1);
                    }}
                  >
                    <AiFillPlusCircle className="icon-minusCircle" />
                  </Pressable>
                )}

                {count <= 1 ? null : (
                  <Pressable
                    ml="15px"
                    // bg="primary"
                    // w="25%"
                    // disabled={count <= 1}
                    onPress={() => {
                      setCount(count - 1);
                    }}
                  >
                    <AiFillMinusCircle className="icon-minusCircle" />
                  </Pressable>
                )}
              </HStack>
            </Box>
          </Center>
        </>
      )}

      <Center w="100%" mt={isSmallScreen ? "0" : "100"}>
        <Box>
          <Text fontSize={"2xl"} bold fontFamily={"heading"}>
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
          justifyContent={"center"}
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
              <Text fontSize={"2xl"} bold fontFamily={"heading"}>
                {t("no_comments")}
              </Text>
            </Center>
          )}
        </Box>
      </Center>
    </Box>
  );
}
