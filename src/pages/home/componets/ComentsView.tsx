import { HStack, Box, Text, Avatar } from "native-base";
import React from "react";
import { IComments } from "../../../interfaces/interface";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

interface ComentsProps {
  comment: IComments;
  index: number;
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
export const ComentsView = ({ comment, index }: ComentsProps) => {
  return (
    <Box
      key={index}
      w="300px"
      borderWidth={4}
      borderColor="black"
      borderRadius={20}
      bg="white"
      px={4}
      mx="35"
    >
      <Box>
        <HStack my="5">
          <Avatar
            bg="indigo.500"
            size="lg"
            source={{
              uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <Text ml="15" fontSize={"2xl"} bold>
            Userss
          </Text>
        </HStack>

        <HStack>
          <StyledRating
            name="highlight-selected-only"
            size="large"
            //   defaultValue={2}
            value={comment.rating}
            readOnly
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
          />
          <Text ml="15" fontSize={"sm"}>
            {customIcons[comment.rating].label}
          </Text>
        </HStack>
      </Box>
      <Box>
        <Text my="15" fontSize={"xl"}>
          {comment.message}
        </Text>
        <Text textAlign="end" fontSize={"md"}>
          {comment.date}
        </Text>
      </Box>
    </Box>
  );
};
