import { Box, Button, Center, Container, Text } from "native-base";
import React, { useContext } from "react";
import UserContext from "../../contexts/userContext";
import { signOutUser } from "../../services/auth";

export default function ProfileDisplay({ history }: any) {
  const { user } = useContext(UserContext);

  console.log("USer????", user);

  return (
    <Center>
      <Container>
        <Box>
          <Text>Profile</Text>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
        </Box>
        <Box>
          <Button
            onPress={() => {
              signOutUser();
              history.push("/home");
            }}
          >
            <Text>LOG OUT</Text>
          </Button>
        </Box>
      </Container>
    </Center>
  );
}
