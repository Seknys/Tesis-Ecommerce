import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Pressable, Text, Image } from "native-base";
import { Iproducts } from "../../../interfaces/interface";
import { CardProduct } from "../componets/CardProduct";
import { updateViews } from "../../../services/products";
import { motion } from "framer-motion";

interface ICarouselProps {
  products: Iproducts[];
  history: any;
}

export const ProductCarousel = ({ products, history }: ICarouselProps) => {
  var settings = {
    accessibility: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptativeHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
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
          <Box key={product.uid}>
            {/* <CardProduct
              key={product.uid}
              product={product}
              handleOnPress={async () => {
                console.log("VIew");

                await updateViews(product.uid, product.views)
                  .then(() => {
                    console.log("Views updated");
                    history.push(`/product/${product.uid}`);
                  })
                  .catch((error) => {
                    console.log("ViewsError", error);
                  });
              }}
            /> */}
            <Pressable
              w="220"
              shadow={7}
              borderRadius={15}
              onPress={async () => {
                console.log("VIew");

                await updateViews(product.uid, product.views)
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
                      <Text fontSize="2xl">
                        {product.name.length > 16
                          ? `${product.name.substring(0, 15)}...`
                          : product.name}
                      </Text>
                      <Text fontSize="xl">{product.price}</Text>
                      <Text>
                        {product.desc.length > 30
                          ? `${product.desc.substring(0, 30)}...`
                          : product.desc}
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
