import { Box, Button, Input, Pressable, Text } from "native-base";
import React, { useContext, useState } from "react";
import UserContext from "../../../contexts/userContext";

import { IComments } from "../../../interfaces/interface";
import { addCommentToProduct } from "../../../services/products";

import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { RatingCustomView } from "./RatingView";

interface IInputComent {
  productUid: string | undefined;
}
export const InputComent = ({ productUid }: IInputComent) => {
  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const { user } = useContext(UserContext);

  const [focus, setFocus] = useState<boolean>(false);
  const submitComent = () => {
    const uidComment: any = uuidv4().substring(0, 8);

    console.log("IN");
    if (user && message !== "" && productUid) {
      console.log("Send Comment");
      const newComment: IComments = {
        uid: uidComment,
        userUid: user.uid,
        userName: user.name,
        message: message,
        rating: rating,
        date: Timestamp.fromDate(new Date()),
        userImg: user.img,
      };
      console.log("newComment:", newComment);
      addCommentToProduct(productUid, newComment)
        .then(() => {
          console.log("Comment added successfully");
        })
        .catch((error) => {
          console.log("Error adding comment: ", error);
        });
    }
  };

  return (
    <>
      <Input
        bg="white"
        p={2}
        rounded="md"
        shadow={2}
        onFocus={() => {
          setFocus(true);
          console.log("FOCUS:", focus);
        }}
        onBlur={() => {
          setFocus(false);
          console.log("OUT?:", focus);
        }}
        size={focus ? "md" : "sm"}
        placeholder="Escribe tu comentario"
        onChangeText={setMessage}
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
      <Button onPress={submitComent}>
        <Text color="white">Enviar</Text>
      </Button>
    </>
  );
};
