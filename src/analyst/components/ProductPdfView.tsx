import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Iproducts } from "../../interfaces/interface";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});
interface IPropsPdf {
  product: Iproducts | undefined;
}

// Create Document Component
export const PdfViewProduct = ({ product }: IPropsPdf) => {
  console.log("PRoduct FPDF: ", product);

  return (
    <Document>
      {product && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section {product.name}</Text>
            <Image
              source={{
                uri: product.img[0],
                method: "GET",
                headers: {},
                body: "",
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};

// const styles = StyleSheet.create({
//   body: {
//     paddingTop: 35,
//     paddingBottom: 65,
//     paddingHorizontal: 35,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: "center",
//     fontFamily: "Oswald",
//   },
//   author: {
//     fontSize: 12,
//     textAlign: "center",
//     marginBottom: 40,
//   },
//   subtitle: {
//     fontSize: 18,
//     margin: 12,
//     fontFamily: "Oswald",
//   },
//   text: {
//     margin: 12,
//     fontSize: 14,
//     textAlign: "justify",
//     fontFamily: "Times-Roman",
//   },
//   image: {
//     marginVertical: 15,
//     marginHorizontal: 100,
//   },
//   header: {
//     fontSize: 12,
//     marginBottom: 20,
//     textAlign: "center",
//     color: "grey",
//   },
//   pageNumber: {
//     position: "absolute",
//     fontSize: 12,
//     bottom: 30,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     color: "grey",
//   },
// });

// ReactPDF.render(<Quixote />);
