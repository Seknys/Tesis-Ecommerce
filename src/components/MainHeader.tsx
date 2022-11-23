import { Box, Button, HStack, Pressable, Text, Image } from "native-base";
import React, { useState } from "react";

import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import menu2 from "react-useanimations/lib/menu2";
import radioButton from "react-useanimations/lib/radioButton";
import { stack as Menu } from "react-burger-menu";
import { GoThreeBars } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/LogoTest.png";

export default function MainHeader() {
  const [showMenu, setShowMenu] = useState(true);
  const [checked, setChecked] = useState(false);

  return (
    <HStack w="100%" h="60" alignItems={"center"} bg="#E84EAA">
      <Box flex={1}>
        <IconContext.Provider
          value={{
            color: "white",
            size: "2em",
            style: { alignSelf: "center" },
          }}
        >
          <GoThreeBars />
        </IconContext.Provider>
        <Menu width={300}>
          <OverlayMenu />
        </Menu>
      </Box>
      <HStack flex={7} alignItems={"center"}>
        <Text fontSize="2xl" color="white">
          Up World
        </Text>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-tesis.appspot.com/o/Junk%2FLogoT.png?alt=media&token=2857c39b-afd2-4bea-8a3a-569634c8a6ba",
          }}
          alt="Alternate Text"
          width={50}
          height={50}
          ml="25"
        />
        <Box ml='10%'>
          <IconContext.Provider
            value={{
              color: "white",
              size: "2em",
              style: { alignSelf: "center" },
            }}
          >
            <BiSearchAlt />
          </IconContext.Provider>
        </Box>
      </HStack>
      <HStack
        flex={2}
        alignItems={"center"}
        justifyContent="space-evenly"
        pr="5%"
      >
        <Box>
        <IconContext.Provider
          value={{
            color: "white",
            size: "2em",
            style: { alignSelf: "center" },
          }}
        >
          <MdShoppingCart />
        </IconContext.Provider>
        </Box>
     
        <IconContext.Provider
          value={{
            color: "white",
            size: "2em",
            style: { alignSelf: "center" },
          }}
        >
          <FaRegUser />
        </IconContext.Provider>
      </HStack>
    </HStack>
  );
}
