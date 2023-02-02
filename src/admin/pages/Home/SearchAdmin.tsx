import { DocumentData } from "firebase/firestore";
import { Box, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import SideBarMenu from "../../../components/SidebarMenu";
import { Iproducts } from "../../../interfaces/interface";
import { CardProduct } from "../../../pages/home/componets/CardProduct";
import { getProductsSearch, updateViews } from "../../../services/products";

export const SearchHomeADMIN = ({ history }: any) => {
  const { value } = useParams<{ value: string }>();
  const [productsSearch, setProductsSearch] = useState<Iproducts[] | null>();
  const { t } = useTranslation();

  useEffect(() => {
    if (value) {

      //Value should be the attribute to fetch the data with a filter
      const getProductsBySearchSnapshot = (snapshot: DocumentData) => {
        const productsData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );

        setProductsSearch(productsData.length > 0 ? productsData : null);
      };
      // getProductsBySearch(value, getProductsBySearchSnapshot);
      const getProductsSearchSnapshot = (snapshot: DocumentData) => {
        const productsData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );

        value.toString().toLowerCase();
        const result = productsData.filter(
          (products: Iproducts) =>
            products.name.toString().toLowerCase().indexOf(value) > -1
        );

        setProductsSearch(result.length > 0 ? result : null);

      };

      getProductsSearch(getProductsSearchSnapshot);
    }
  }, [value]);

  return (
    <>
      <SideBarMenu isProduct historyProduct={history}>
        <Box w="100%">
          <Text bold textAlign="left" fontSize="2xl">
            {t("label_search")}: "{value}"
          </Text>
          <Box
            flexWrap="wrap"
            // justifyContent="space-around"
            flexDirection="row"
          >
            {productsSearch ? (
              productsSearch.map((product, index) => (
                // <CardProduct
                //   key={product.uid + index}
                //   product={product}
                //   handleOnPress={async () => {
                //     await updateViews(product.uid)
                //       .then(() => {
                //         history.push(`/product/${product.uid}`);
                //       })
                //       .catch((error) => {
                //         console.log("ViewsError", error);
                //       });
                //   }}
                // />
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/admin/edit-product/${product.uid}`}
                  key={product.uid}
                >
                  <CardProduct product={product} />
                </Link>
              ))
            ) : (
              <Center w="100%" h="350">
                <Text bold fontSize={"2xl"}>
                  {t("label_NoSearch")} 😥
                </Text>
              </Center>
            )}
          </Box>
        </Box>
      </SideBarMenu>
    </>
  );
};
