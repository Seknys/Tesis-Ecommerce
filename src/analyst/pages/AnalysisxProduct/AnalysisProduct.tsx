import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComments, Iproducts } from "../../../interfaces/interface";
import {
  getCommetsbyProduct,
  getProductByUid,
} from "../../../services/products";
import { Box, HStack, Text, Image, Center } from "native-base";
import ReactApexChart from "react-apexcharts";
import { Rating } from "@mui/material";
import "./style.css";
import { useTranslation } from "react-i18next";
import { MB } from "../../../components/MyComponents";

export const AnalysisxProduct = () => {
  const { uid } = useParams<{ uid: string }>();
  const [product, setProduct] = useState<Iproducts>();
  const [pieValues, setPieValues] = useState<any>([]);
  const [comments, setComments] = useState<IComments[]>([]);
  const [average, setAverage] = useState(0);
  const { t } = useTranslation();
  const roundHalf = (num: number) => {
    return Math.round(num * 2) / 2;
  };

  useEffect(() => {
    const getProductSnapshot = (snapshot: DocumentData) => {
      let pieValuesAux = [];
      let productsAux = { ...snapshot.data() };

      const createdAtS = snapshot.data().createdAt;
      const updatedAtS = snapshot.data().updatedAt;

      // productsAux.createdAt = new Date(
      //   createdAtS.seconds * 1000
      // ).toLocaleString();

      // productsAux.updatedAt = new Date(
      //   updatedAtS.seconds * 1000
      // ).toLocaleString();

      setProduct(productsAux);
      pieValuesAux.push(snapshot.data().views);
      pieValuesAux.push(snapshot.data().addedToCart);
      pieValuesAux.push(snapshot.data().removeToCart);
      pieValuesAux.push(snapshot.data().buy);

      const commetsByProductFunction = (comments: IComments[]) => {
        pieValuesAux.push(comments.length);
        let sum = 0;
        comments.forEach((comment) => {
          sum += comment.rating;
        });

        setAverage(roundHalf(sum / comments.length));
      };
      getCommetsbyProduct(uid, commetsByProductFunction);
      setPieValues(pieValuesAux);
    };
    getProductByUid(uid, getProductSnapshot);
  }, []);

  const pie = {
    series: pieValues,
    options: {
      chart: {
        width: 480,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      labels: [
        "Views",
        "Add to Cart",
        "Remove to Cart",
        "Times Buyed",
        "Comments",
      ],
      fill: {
        type: "gradient",
      },
      //   legend: {
      //     formatter: function (val: any, opts: any) {
      //       return val + " - " + opts.w.globals.series[opts.seriesIndex];
      //     },
      //   },
      title: {
        text: `Estadisticas generales del producto: ${product?.name}`,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <Center>
        <Text mt="50px" fontSize={"3xl"} bold>
          {product?.name}
        </Text>
      </Center>
      {/* <Text fontSize={"xl"} ml="5%">
        {t("analyst_createdAt")} <MB>{product?.createdAt}</MB>
      </Text>
      <Text fontSize={"xl"} ml="5%">
        {t("analyst_updatedAt")} <MB>{product?.updatedAt}</MB>
      </Text> */}

      <HStack mt="25px">
        <Box flex={4}>
          <Image
            shadow={9}
            source={{
              uri: product?.img[0],
            }}
            alt={product?.name}
            w="380"
            h="320"
            resizeMode="contain"
            alignSelf="center"
          />
        </Box>
        <Box flex={4} pl="3%">
          <ReactApexChart
            options={pie.options}
            series={pie.series}
            type="donut"
            width={480}
            className="pie-Charts"
          />
        </Box>
      </HStack>
      <HStack
        mt="50px"
        w="100%"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <div className="spakBox1 desc-container">
          <Text color="white" bold fontSize={"2xl"}>
            Numero de visitas: {product?.views}
          </Text>
        </div>
        <div className="spakBox2 desc-container">
          <HStack alignItems={"center"}>
            <Text color="white" bold fontSize={"2xl"}>
              Rating Promedio: {average}
            </Text>
            <Rating
              name="half-rating-read"
              value={average}
              precision={0.5}
              readOnly
            />
          </HStack>
        </div>
        <div className="spakBox3 desc-container">
          <Text color="white" bold fontSize={"2xl"}>
            Interacciones Totales:{" "}
            {product &&
              product.views +
                product.addedToCart +
                product.removeToCart +
                product.buy}
          </Text>
        </div>
        <div className="spakBox4 desc-container">
          <Text color="white" bold fontSize={"2xl"}>
            Interacciones con el carrito:{" "}
            {product && product.addedToCart + product.removeToCart}
          </Text>
        </div>
      </HStack>
      <Box w="100%" bg="red.400" alignItems={"center"}></Box>
    </>
  );
};
