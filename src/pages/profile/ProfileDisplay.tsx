import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  HStack,
  Text,
} from "native-base";
import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";
import { signOutUser } from "../../services/auth";

export default function ProfileDisplay({ history }: any) {
  const { user } = useContext(UserContext);

  console.log("USer????", user);

  return (
    <>
      {/* <Box w="100%" justifyContent={"flex-end"} flexDirection="row"> */}
      <Button
        zIndex={1}
        position="absolute"
        // right="0px"
        w="170px"
        m="25"
        bg="blue.500"
        onPress={() => {
          signOutUser();
          history.push("/home");
        }}
        _hover={{
          bg: "blue.600",
        }}
      >
        <Text bold color="white" fontSize={"2xl"}>
          Cerrar Sesion
        </Text>
      </Button>
      {/* </Box> */}
      <Center>
        <Container>
          <HStack mt="55px">
            <Avatar
              mx="50px"
              bg="amber.400"
              size="2xl"
              source={{ uri: user?.img }}
            />
            <Box>
              <Text fontSize={"2xl"} mb="10px">
                Profile
              </Text>
              <Text bold fontSize={"2xl"} mb="10px">
                {user?.name}
              </Text>
              <Text fontSize={"2xl"} mb="10px">
                {user?.email}
              </Text>
            </Box>
          </HStack>
        </Container>
      </Center>
    </>
  );
}
