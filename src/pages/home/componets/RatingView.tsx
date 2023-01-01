import React from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Box, HStack, Text } from "native-base";
import { useTranslation } from "react-i18next";

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
  return (
    // <HStack>
    //   <StyledRating
    //     name="highlight-selected-only"
    //     size="large"
    //     //   defaultValue={2}
    //     value={rating}
    //     readOnly={isReadOnly}
    //     onChange={(event, newValue) => {
    //       if (newValue && setRating) {
    //         console.log("RatingValue: ", newValue)
    //         setRating(newValue);
    //       }
    //     }}
    //     IconContainerComponent={IconContainer}
    //     getLabelText={(value: number) => customIcons[value].label}
    //     highlightSelectedOnly
    //   />
    //   <Text ml="15" fontSize={"sm"}>
    //     {customIcons[rating].label}
    //   </Text>
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
      {hover > 0 ? (
        <Box ml="15" w="150">
          <Text bold fontSize={"sm"}>
            {customIcons[hover].label}
          </Text>
        </Box>
      ) : (
        <Box ml="15" w="150">
          <Text bold fontSize={"sm"}>
            {customIcons[1].label}
          </Text>
        </Box>
      )}
    </HStack>
  );
};
