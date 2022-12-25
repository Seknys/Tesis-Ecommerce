import { HStack, Box, Text, Avatar } from "native-base";
import React, { useContext } from "react";
import { IComments } from "../../../interfaces/interface";
import { styled } from "@mui/material/styles";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { RatingCustomView } from "./RatingView";
import UserContext from "../../../contexts/userContext";

interface ComentsProps {
  comment: IComments;
  index: number;
}

export const ComentsView = ({ comment, index }: ComentsProps) => {
  return (
    <Box
      key={index}
      //  w="275px"
      w="22%"
      borderWidth={4}
      borderColor="black"
      borderRadius={20}
      bg="white"
      px={4}
      mr="35"
      mb="25"
      minW={"250px"}
    >
      <Box>
        <HStack my="5">
          <Avatar
            bg="indigo.500"
            size="lg"
            source={{
              uri: comment.userImg,
            }}
          />
          <Text ml="15" fontSize={"2xl"} bold>
            {comment.userName}
          </Text>
        </HStack>
      </Box>
      <RatingCustomView rating={comment.rating} isReadOnly={true} />
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