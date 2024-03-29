import { Box, Button, HStack, Input, Pressable, Text } from "native-base";
import React, { useContext, useState } from "react";
import UserContext from "../../../contexts/userContext";

import { IComments } from "../../../interfaces/interface";
import { addCommentToProduct } from "../../../services/products";

import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { RatingCustomView } from "./RatingView";
import { IconContext } from "react-icons";
import { BiSend } from "react-icons/bi";
import { useTranslation } from "react-i18next";

interface IInputComent {
  productUid: string | undefined;
}
export const InputComent = ({ productUid }: IInputComent) => {
  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const [focus, setFocus] = useState<boolean>(false);
  const submitComent = () => {
    const uidComment: any = uuidv4().substring(0, 8);

    if (user && message !== "" && productUid) {
      const newComment: IComments = {
        uid: uidComment,
        userUid: user.uid,
        userName: user.name,
        message: message,
        rating: rating,
        date: Timestamp.fromDate(new Date()),
        userImg: user.img ? user.img : "",
      };

      addCommentToProduct(productUid, newComment)
        .then(() => {
   
          setMessage("");
        })
        .catch((error) => {
          console.log("Error adding comment: ", error);
        });
    }
  };

  return (
    <HStack mt="25px">
      <Box w="250px" alignItems={"center"}>
        <Input
          mb="10px"
          bg="white"
          p={2}
          rounded="full"
          shadow={5}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          w="100%"
          // size={focus ? "2xl" : "sm"}
          placeholder="Añadir un comentario "
          onChangeText={setMessage}
          _input={{
            color: "black.600",
            fontSize: "md",
            bold: true,
          }}
          _focus={{
            borderColor: "black",
            bg: "gray.200",
          }}
          value={message}
          // InputRightElement={
          //   focus ? (
          //     <Pressable onPress={submitComent}>
          //       <Text>Enviar</Text>
          //     </Pressable>
          //   ) : (
          //     <div></div>
          //   )
          // }
        />
        <RatingCustomView
          rating={rating}
          setRating={setRating}
          isReadOnly={false}
        />
      </Box>

      <Button
        bg="gray.700"
        ml="10px"
        h="35px"
        // px="5"
        // py="0"
        onPress={submitComent}
        _hover={{
          bg: "gray.800",
        }}
      >
        <HStack alignItems={"center"}>
          <Text bold fontSize="md" color="white">
            {t("comment_send")}
          </Text>
          <IconContext.Provider
            value={{
              color: "white",
              size: "15px",
              style: { marginLeft: "5px" },
            }}
          >
            <BiSend />
          </IconContext.Provider>
        </HStack>
      </Button>
    </HStack>
  );
};
