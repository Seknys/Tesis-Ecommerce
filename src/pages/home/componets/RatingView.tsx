import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Box, HStack, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { useUnmountEffect } from "framer-motion";

interface IRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  isReadOnly: boolean;
}
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

// function IconContainer(props: IconContainerProps) {
//   const { value, ...other } = props;
//   return <span {...other}>{customIcons[value].icon}</span>;
// }
export const RatingCustomView = ({
  rating,
  setRating,
  isReadOnly,
}: IRatingProps) => {
  const [hover, setHover] = React.useState(1);
  const { t } = useTranslation();
  const customIcons: {
    [index: number]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: t("rating_1"),
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: t("rating_2"),
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: t("rating_3"),
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: t("rating_4"),
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: t("rating_5"),
    },
  };
  useEffect(() => {}, [isReadOnly]);

  console.log("IsReadOnly: ", isReadOnly);
  console.log("HOver?: ", hover);
  return (
    // </HStack>
    <HStack w="100%">
      <Rating
        name="half-rating-read"
        value={rating}
        // precision={0.5}
        readOnly={isReadOnly}
        onChange={(event, newValue) => {
          if (newValue && setRating) {
            console.log("RatingValue: ", newValue);
            setRating(newValue);
          }
        }}
        onChangeActive={(event, newHover) => {
          console.log("newHover: ", newHover);
          setHover(newHover);
        }}
        getLabelText={(value: number) => customIcons[value].label}
      />
      {/* {hover > 0 ? (
        <Box ml="15" w="150">
          <Text bold fontSize={"sm"}>
            {customIcons[hover].label}
          </Text>
        </Box>
      ) : isReadOnly ? (
        <Box ml="15" w="150">
          <Text bold fontSize={"sm"}>
            READ {customIcons[rating].label}
          </Text>
        </Box>
      ) : (
        <Box ml="15" w="150">
          <Text bold fontSize={"sm"}>
            {customIcons[1].label}
          </Text>
        </Box>
      )} */}

      {isReadOnly ? (
        <Box ml="2" justifyContent={"center"} w="150">
          <Text  fontSize={"sm"} >
            {customIcons[rating].label}
          </Text>
        </Box>
      ) : hover > 0 ? (
        <Box ml="2" justifyContent={"center"} w="150">
          <Text bold fontSize={"sm"}>
            {customIcons[hover].label}
          </Text>
        </Box>
      ) : (
        <Box ml="2" justifyContent={"center"} w="150">
          <Text bold fontSize={"sm"}>
            {customIcons[1].label}
          </Text>
        </Box>
      )}
    </HStack>
  );
};
