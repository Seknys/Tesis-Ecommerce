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

interface IProps {
  children?: ReactNode;
}

// const Accordion = styled((props: AccordionProps) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<MdOutlineExpandMore />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(232, 78, 170, .05)"
      : "rgba(232, 78, 170 .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(232, 78, 170, .125)",
}));

export default function SideBarMenu({ children }: IProps) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [categories, setCategories] = useState<Icategories[]>([]);

  useEffect(() => {
    const getCategoriesSnapshot = (snapshot: DocumentData) => {
      const categoriesData = snapshot.docs.map((doc: DocumentData) =>
        doc.data()
      );
      setCategories(categoriesData);
    };
    getCategories(getCategoriesSnapshot);
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      flexDirection="row"
      w="100%"
      mt='75'
    //   justifyContent="space-around"
   
      px='2%'
    >
      <Box flex={1}  mx='2%'>
        {/* <Example/> */}
        {/* {categories?.map((category: Icategories, index) => (
          <Accordion
            key={category.uid}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
            >
              <Typography>{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Link To</Typography>
            </AccordionDetails>
          </Accordion>
        ))} */}
      </Box>
      <Box flex={6} >
        {children}
      </Box>
    </Box>
  );
}

interface IPropsA {
  i:any;
  expanded:any;
  setExpanded:any;
}

const Accordion = ({ i, expanded, setExpanded }:IPropsA) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ContentPlaceholder />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

 const Example = () => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState<false | number>(0);

  return accordionIds.map((i) => (
    <Accordion i={i} expanded={expanded} setExpanded={setExpanded} />
  ));
};

const accordionIds = [0, 1, 2, 3];
