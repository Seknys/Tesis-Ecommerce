import { Box, Text } from "native-base";
import React, { ReactNode, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdOutlineExpandMore } from "react-icons/md";
import { pink } from "@mui/material/colors";
import { DocumentData } from "firebase/firestore";
import { getCategories } from "../services/basicOperations";
import { Icategories } from "../interfaces/interface";
import { AnimatePresence, motion } from "framer-motion";
import { ContentPlaceholder } from "./ContentPlaceholder";
import { Pressable } from "react-native";
import { SideBarContextProvider } from "../contexts/sideBarContext";

interface IProps {
  children?: ReactNode;
  isAdmin?: boolean;
  dataAdmin?: any;
  callBackParent?: any;
  returnCategories?: any;
  isProduct?: boolean;
  historyProduct?: any;
}

//const [sideValue, setSideValue] = useState<string | null>(null);

// let sideBarValue: string | null = null;

export default function SideBarMenu({
  children,
  isAdmin,
  dataAdmin,
  callBackParent,
  returnCategories,
  isProduct,
  historyProduct,
}: IProps) {
  // const [expanded, setExpanded] = useState<string | false>(false);
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [expanded, setExpanded] = useState<false | number>(0);
  // const [valueSide, setValueSide] = useState<string | null>(null);
  useEffect(() => {
    if (!isAdmin) {
      const getCategoriesSnapshot = (snapshot: DocumentData) => {
        const categoriesData = snapshot.docs.map((doc: DocumentData) =>
          doc.data()
        );
        setCategories(categoriesData);
      };
      getCategories(getCategoriesSnapshot);
    } else {
      setCategories(dataAdmin);
    }
  }, []);

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };

  return (
    <Box flexDirection="row" w="100%" mt="75" px="2%">
      <Box flex={1} mx="2%">
        {categories?.map((category: Icategories, index) => (
          <Accordion
            key={category.uid}
            i={index}
            expanded={expanded}
            setExpanded={setExpanded}
            isProduct={isProduct}
            historyProduct={historyProduct}
            category={category}
            callBackParent={callBackParent}
          />
        ))}
      </Box>

      <Box flex={6}>{children}</Box>
    </Box>
  );
}

interface IPropsA {
  i: any;
  expanded: any;
  setExpanded: any;
  category?: Icategories;
  callBackParent?: any;
  isProduct?: boolean;
  historyProduct?: any;
}

const Accordion = ({
  i,
  isProduct,
  expanded,
  setExpanded,
  category,
  callBackParent,
  historyProduct,
}: IPropsA) => {
  const isOpen = i === expanded;

  // const [value, setValue] = useState<string | null>(null);
  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <Box key={i}>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#E84EAA" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <Text fontSize="2xl" ml="25" bold color="white">
          {category?.name}
        </Text>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {/* <ContentPlaceholder /> */}
            <Pressable
              onPress={() => {
                if (isProduct) {
                  console.log("isProduct", isProduct);
                  historyProduct.push(`/category/${category?.uid}`);
                  return;
                }
                if (category) {
                  callBackParent(category);
                }
              }}
            >
              <Text fontSize="xl" ml="25" mb="19" pt="0" color="black">
                {category?.name}
              </Text>
            </Pressable>
          </motion.section>
        )}
      </AnimatePresence>
    </Box>
  );
};

// const Example = () => {
//   // This approach is if you only want max one section open at a time. If you want multiple
//   // sections to potentially be open simultaneously, they can all be given their own `useState`.
//   const [expanded, setExpanded] = useState<false | number>(0);

//   return accordionIds.map((i) => (
//     <Accordion i={i} expanded={expanded} setExpanded={setExpanded} />
//   ));
// };

// const accordionIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
