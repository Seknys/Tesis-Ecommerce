import { DocumentData } from "firebase/firestore";
import { Avatar, Box, Center, HStack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Iuser } from "../../../interfaces/interface";
import { getUsersByRole } from "../../../services/admin";

export const DisplayUsersShopping = () => {
  const [users, setUsers] = useState<Iuser[]>([]);
  useEffect(() => {
    const getUserByRoleSnap = (snapshot: DocumentData) => {
      const usersData = snapshot.docs.map((doc: DocumentData) => doc.data());
      console.log("USER CLIENTE:", usersData);
      setUsers(usersData);
    };
    getUsersByRole("client", getUserByRoleSnap);
  }, []);
  return (
    <>
      <Center my="50px">
        <Text fontFamily={"heading"} bold fontSize={"2xl"}>
          USUARIOS REGISTRADOS
        </Text>
      </Center>
      <Center
        mx="50px"
        // justifyContent={"space-around"}
        flexDir={"row"}
        flexWrap="wrap"
      >
        {users ? (
          <>
            {users.map((user, index) => {
              return (
                <Link
                  key={user.uid + user.name}
                  to={`/admin/purchase/${user.uid}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box
                    mx="15"
                    my="25"
                    shadow={8}
                    w="250px"
                    h="145px"
                    borderRadius={15}
                  >
                    {/* <Avatar size={"md"} source={{ uri: user.img }} /> */}
                    <Avatar
                      alignSelf={"center"}
                      bg="rgba(255,255,255,0.5)"
                      size="100px"
                      source={{
                        uri: user?.img
                          ? user.img
                          : "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FUserAsset.png?alt=media&token=436e30da-eea2-4dfd-a764-99f9f7e954b5",
                      }}
                    />
                    {/* <Box alignSelf={"center"} w="100%"> */}
                    <Text
                      mt="4"
                      fontSize={"xl"}
                      textAlign={"center"}
                      fontFamily="heading"
                      fontStyle={"italic"}
                      isTruncated
                      color="white"
                      borderRadius={15}
                      bg="rgba(0, 0, 0, 0.706)"
                    >
                      {user.name} {user.lastName}
                    </Text>
                    {/* </Box> */}
                  </Box>
                </Link>
              );
            })}
          </>
        ) : (
          <Text>No hay usuarios cliente aun</Text>
        )}
      </Center>
    </>
  );
};
