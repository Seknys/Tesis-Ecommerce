import { Box, Button, HStack, Pressable, Text, Image } from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";

import radioButton from "react-useanimations/lib/radioButton";
import { stack as Menu } from "react-burger-menu";
import { GoThreeBars } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import OverlayMenu from "./OverlayMenu";
import logo from "../assets/LogoTest.png";
import "./style.css";
// import { motion, useCycle } from "framer-motion";
// import { useDimensions } from "./hamburgerMenu/use-dimensions";
// import { Navigation } from "./hamburgerMenu/Navigation";
// import { MenuToggle } from "./hamburgerMenu/MenuToggle";
import "./hamburgerMenu/styleHamburger.css";
import UserContext from "../contexts/userContext";
import { Link } from "react-router-dom";
import { MenuSideIcon } from "./hamburgerMenu/Menu";

export default function MainHeader({ history }: any) {
  const [showMenu, setShowMenu] = useState(true);
  const [checked, setChecked] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    // console.log("User", user);
  }, []);

  return (
    <div className="headerStyle">
      <HStack w="100%" h="60" alignItems={"center"}>
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
          <Box ml="10%">
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
          justifyContent="space-between"
          // pr="5%"
          w="100%"
  
          // bg='yellow.600'
        >
          <Box >
            {user !== null ? (
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "2em",
                    style: { alignSelf: "center" },
                  }}
                >
                  <FaRegUser />
                </IconContext.Provider>
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "2em",
                    style: { alignSelf: "center" },
                  }}
                >
                  <FaRegUser />
                </IconContext.Provider>
              </Link>
            )}
          </Box>

          <Box>
            {/* <IconContext.Provider
              value={{
                color: "white",
                size: "2em",
                style: { alignSelf: "center" },
              }}
            >
              <MdShoppingCart />
            </IconContext.Provider> */}
            <div style={{ zIndex: 30,width:"100%" }}>
              {/* <MenuSideIcon /> */}
            </div>
          </Box>

          {/* <Pressable
          // onPress={() => {
          //   if (user) {
          //     console.log("YES");
          //     history.push("/profile");
          //   } else {
          //     console.log("NO");
          //     history.push("/login");
          //   }
          // }}
          >
            <IconContext.Provider
              value={{
                color: "white",
                size: "2em",
                style: { alignSelf: "center" },
              }}
            >
              <FaRegUser />
            </IconContext.Provider>
          </Pressable> */}
        </HStack>
      </HStack>
    </div>
  );
}
