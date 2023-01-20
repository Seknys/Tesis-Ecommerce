import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Pressable, Text, Image, useMediaQuery } from "native-base";
import { Iproducts } from "../../../interfaces/interface";
import { CardProduct } from "../componets/CardProduct";
import { updateViews } from "../../../services/products";
import { motion } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { MB } from "../../../components/MyComponents";

interface ICarouselProps {
  products: Iproducts[];
  history: any;
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.8 }}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: 20,
      }}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.8 }}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: 20,
      }}
    />
  );
}

export const ProductCarousel = ({ products, history }: ICarouselProps) => {
  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 768,
  });

  // const [isMediumScreen] = useMediaQuery({
  //   minWidth: 481,
  //   maxWidth: 768,
  // });

  const [isLargeScreen] = useMediaQuery({
    minWidth: 769,
    maxWidth: 1024,
  });

  const [isExtraLargeScreen] = useMediaQuery({
    minWidth: 1025,
    maxWidth: 1280,
  });

  var settings = {
    accessibility: true,
    arrows: !isSmallScreen,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptativeHeight: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1395,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  return (
    <Box w="90%">
      <Slider {...settings}>
        {products.map((product, index) => (
          <Box key={product.uid} py="25" ml="5">
            <Pressable
              w="220"
              shadow={8}
              borderRadius={15}
              onPress={async () => {
                await updateViews(product.uid)
                  .then(() => {
                    console.log("Views updated");
                    history.push(`/product/${product.uid}`);
                  })
                  .catch((error) => {
                    console.log("ViewsError", error);
                  });
              }}
            >
              <div className="card-container-menu">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Box w="220" h="290">
                    <Box w="100%" p="2">
                      <Image
                        source={{
                          uri: product.img[0],
                        }}
                        fallbackSource={{
                          uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FFallbackImg.jpg?alt=media&token=67f3837f-dfd2-42e8-8490-972b5ccb6f7d",
                        }}
                        alt={product.name}
                        w="220"
                        h="160"
                        resizeMode="cover"
                      />
                    </Box>
                    <Box pl="3">
                      <Text
                        fontSize="2xl"
                        fontFamily="heading"
                        fontWeight="500"
                        isTruncated
                      >
                        {product.name}
                      </Text>
                      <Text
                        fontSize="xl"
                        fontFamily="heading"
                        fontStyle={"italic"}
                        fontWeight={"500"}
                      >
                        {product.price}
                        <MB color="red.500">$</MB>
                      </Text>
                      <Text isTruncated fontFamily="body" fontWeight={"300"}>
                        {product.desc}
                      </Text>
                    </Box>
                  </Box>
                </motion.div>
              </div>
            </Pressable>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

interface IImageSyncCarouselProps {
  product: Iproducts | undefined;
}

export const ImageSyncCarousel = ({ product }: IImageSyncCarouselProps) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  var settings1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,

    speed: 500,
    fade: true,
    asNavFor: nav2,
    ref: (slider: any) => setNav1(slider),
  };
  var settings2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    asNavFor: nav1,
    ref: (slider: any) => setNav2(slider),
    dots: true,
    centerMode: true,
    focusOnSelect: true,
  };
  var settings3 = {
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    asNavFor: nav1,
    ref: (slider: any) => setNav2(slider),
    dots: true,
    centerMode: true,
    focusOnSelect: true,
  };

  useEffect(() => {
    console.log("HOW MANY TIMES???");
  }, []);

  return (
    <Box py="15">
      <Slider {...settings1}>
        {product?.img.map((img, index) => {
          return (
            <Image
              key={index}
              shadow={3}
              rounded={"lg"}
              mb="25"
              source={{
                uri: img,
              }}
              alt={`${product?.name}_${index}`}
              w="380"
              h="320"
              resizeMode="contain"
              alignSelf="center"
            />
            // <Zoom>

            //   <img
            //     alt={`${product?.name}_${index}`}
            //     width="380"
            //     height="320"
            //     src={img}
            //     style={{ objectFit: "contain" }}
            //   />
            // </Zoom>
          );
        })}
      </Slider>
      {product && product.img.length > 2 ? (
        <Slider {...settings2}>
          {product?.img.map((img, index) => {
            console.log("INDEX:? ", index);

            return (
              <Box paddingLeft={10} key={index}>
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Image
                    // borderColor={index === 0 ? "red.500" : "gray.200"}
                    // borderWidth={index === 0 ? 2 : 1}
                    borderColor={"gray.300"}
                    borderWidth={1}
                    rounded={"lg"}
                    source={{
                      uri: img,
                    }}
                    alt={product?.name}
                    w="80"
                    h="60"
                    resizeMode="contain"
                    alignSelf="center"
                  />
                </motion.div>
              </Box>
            );
          })}
        </Slider>
      ) : product && product.img.length == 2 ? (
        <Slider {...settings3}>
          <Box paddingLeft={20} w="80px">
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.8 }}>
              <Image
                // borderColor={index === 0 ? "red.500" : "gray.200"}
                // borderWidth={index === 0 ? 2 : 1}
                borderColor={"gray.300"}
                borderWidth={1}
                rounded={"lg"}
                source={{
                  uri: product?.img[0],
                }}
                alt={product?.name}
                w="80px"
                h="60px"
                resizeMode="contain"
                alignSelf="center"
              />
            </motion.div>
          </Box>

          <Box w="80">
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.8 }}>
              <Image
                // borderColor={index === 0 ? "red.500" : "gray.200"}
                // borderWidth={index === 0 ? 2 : 1}
                borderColor={"gray.300"}
                borderWidth={1}
                rounded={"lg"}
                source={{
                  uri: product?.img[1],
                }}
                alt={product?.name}
                w="80px"
                h="60px"
                resizeMode="contain"
                alignSelf="center"
              />
            </motion.div>
          </Box>
        </Slider>
      ) : null}
    </Box>
  );
};
