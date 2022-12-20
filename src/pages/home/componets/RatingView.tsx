import React from "react";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { HStack, Text } from "native-base";

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
const customIcons: {
  [index: number]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}
export const RatingCustomView = ({
  rating,
  setRating,
  isReadOnly,
}: IRatingProps) => {
  return (
    <HStack>
      <StyledRating
        name="highlight-selected-only"
        size="large"
        //   defaultValue={2}
        value={rating}
        readOnly={isReadOnly}
        onChange={(event, newValue) => {
          if (newValue && setRating) {
            console.log("RatingValue: ", newValue)
            setRating(newValue);
          }
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
      <Text ml="15" fontSize={"sm"}>
        {customIcons[rating].label}
      </Text>
    </HStack>
  );
};
