import React, { useEffect, useState } from "react";
import SideBarMenu from "../../../../components/SidebarMenu";
import { Icategories, Iproducts } from "../../../../interfaces/interface";
import { Box, Text } from "native-base";
import { getProductsByCategory } from "../../../../services/products";
import { DocumentData } from "firebase/firestore";
import ApexCharts from "apexcharts";
import "./style.css";

export const AnalysisxCat = () => {
  const [categoryUid, setCategoryUid] = useState<string>();
  const [categories, setCategories] = useState<Icategories[]>();
  const [products, setProducts] = useState<Iproducts[]>();

  useEffect(() => {
    if (categoryUid) {
      const getProductSnapshot = (snapshot: DocumentData) => {
        const productsData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );
        setProducts(productsData);
        console.log(productsData);
      };
      getProductsByCategory(categoryUid, getProductSnapshot);
    }
  }, [categoryUid]);

  return (
    <div>
      <>
        <SideBarMenu callBackParent={setCategoryUid}>
          {/* <div>
            <h3>{categoryUid} trext</h3>
          </div> */}
          {categoryUid ? (
            <Box>
              <Text>{categoryUid}</Text>
            </Box>
          ) : (
            <Box>
              <Text>Seleccione una categoria</Text>
            </Box>
          )}
        </SideBarMenu>
      </>
    </div>
  );
};
