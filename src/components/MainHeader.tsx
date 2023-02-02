import {
  Box,
  Button,
  HStack,
  Pressable,
  Text,
  Image,
  useMediaQuery,
  Input,
} from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";

import radioButton from "react-useanimations/lib/radioButton";
import { stack as Menu } from "react-burger-menu";
import { slide as MenuSide } from "react-burger-menu";
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
import { CartMenu } from "./CartMenu";
import { IoCloseSharp } from "react-icons/io5";

export default function MainHeader({ history }: any) {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [checked, setChecked] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { user } = useContext(UserContext);

  // const [isSmallScreen] = useMediaQuery({
  //   minWidth: 10,
  //   maxWidth: 915,
  // });
  const [isExtraSmall] = useMediaQuery({
    minWidth: 1,
    maxWidth: 490,
  });

  const [isSmallScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 605,
  });
  const [isSmallScreenAux] = useMediaQuery({
    minWidth: 491,
    maxWidth: 605,
  });

  const [isMediumScreen] = useMediaQuery({
    minWidth: 606,
    maxWidth: 1145,
  });

  useEffect(() => {

  }, []);

  return (
    <>
      <div
        className="AppS"
        id="outer-container"
        style={{
          backgroundColor: "#f2c94c",
        }}
      >
        {user?.role !== "analyst" && user?.role !== "admin" ? (
          !isSmallScreenAux && !isMediumScreen ? (
            !isExtraSmall && (
              <Pressable
                onPress={() => {
                  setShowMenu(!showMenu);
                }}
                position={"absolute"}
                zIndex="100"
                // w="50"
                // h="50"

                py="15"
                right={"10%"}
              >
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "2em",
                    style: { alignSelf: "center" },
                  }}
                >
                  {/* {showMenu ? <MdShoppingCart /> : <IoCloseSharp />} */}
                  <MdShoppingCart />
                </IconContext.Provider>
                <CartMenu
                  pageWrapId={"page-wrap"}
                  outerContainerId={"outer-container"}
                />
              </Pressable>
            )
          ) : isMediumScreen ? (
            <Pressable
              onPress={() => {
                setShowMenu(!showMenu);
              }}
              position={"absolute"}
              zIndex="100"
              // w="50"
              // h="50"

              py="15"
              right={"7%"}
            >
              <IconContext.Provider
                value={{
                  color: "white",
                  size: "2em",
                  style: { alignSelf: "center" },
                }}
              >
                {/* {showMenu ? <MdShoppingCart /> : <IoCloseSharp />} */}
                <MdShoppingCart />
              </IconContext.Provider>
              <CartMenu
                pageWrapId={"page-wrap"}
                outerContainerId={"outer-container"}
              />
            </Pressable>
          ) : (
            isSmallScreen && (
              <Pressable
                onPress={() => {
                  setShowMenu(!showMenu);
                }}
                position={"absolute"}
                zIndex="100"
                // w="50"
                // h="50"

                py="15"
                right={"3%"}
              >
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "2em",
                    style: { alignSelf: "center" },
                  }}
                >
                  {/* {showMenu ? <MdShoppingCart /> : <IoCloseSharp />} */}
                  <MdShoppingCart />
                </IconContext.Provider>
                <CartMenu
                  pageWrapId={"page-wrap"}
                  outerContainerId={"outer-container"}
                />
              </Pressable>
            )
          )
        ) : null}

        <div id="page-wrap">
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
                <MenuSide className="menuStyle" width={300}>
                  <OverlayMenu />
                </MenuSide>
              </Box>
              <HStack flex={7} alignItems={"center"}>
                <Link
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    textDecoration: "none",
                    alignItems: "center",
                  }}
                  to="/"
                >
                  {isSmallScreen ||
                    (!isMediumScreen && (
                      <Text fontSize="2xl" color="white" fontFamily={"heading"}>
                        Up World
                      </Text>
                    ))}

                  <Image
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-tesis.appspot.com/o/Junk%2FLogoT.png?alt=media&token=2857c39b-afd2-4bea-8a3a-569634c8a6ba",
                    }}
                    alt="MainLogo"
                    width={50}
                    height={50}
                  />
                </Link>

                <Pressable
                  onPress={() => {
                    setShowSearch(!showSearch);
                  }}
                  ml="15"
                >
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "2em",
                      style: { alignSelf: "center" },
                    }}
                  >
                    <BiSearchAlt />
                  </IconContext.Provider>
                </Pressable>
                {showSearch && (
                  <Input
                    placeholder="Search"
                    w={isSmallScreen ? "54%" : isMediumScreen ? "70%" : "70%"}
                    ml="5%"
                    bg="white"
                    borderRadius="10"
                    onKeyPress={(e: any) => {
                      if (e.key === "Enter") {
                 
                        window.location.href = `/search/${e.target.value}`;
                      }
                    }}
                    color="black"
                    _focus={{ borderColor: "black" }}
                    variant="filled"
                  />
                )}
              </HStack>
              <HStack
                flex={2}
                alignItems={"center"}
                justifyContent="space-between"
                // pr="5%"
                w="100%"

                // bg='yellow.600'
              >
                <Box>
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

                {/* {user?.role === "admin" || user?.role == "analyst"
            ? null
            : (!isSmallScreen || !isMediumScreen) && (
                // <Box>
                //   <div style={{ zIndex: 30, width: "100%" }}>

                //     <MenuSideIcon />
                //   </div>
                // </Box>
                <Box flex="2">
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "2em",
                      style: { alignSelf: "center" },
                    }}
                  >
                    <GoThreeBars />
                  </IconContext.Provider>
                </Box>
              )} */}
              </HStack>
            </HStack>
          </div>
        </div>
      </div>
    </>
  );
}
