import { Box, Button, HStack, Pressable, Text, Image } from "native-base";
import React, { useContext, useEffect, useRef, useState } from "react";

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
import "./style.css";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./hamburgerMenu/use-dimentions";
import { Navigation } from "./hamburgerMenu/Navigation";
import { MenuToggle } from "./hamburgerMenu/MenuToggle";
import "./hamburgerMenu/styleHamburger.css";
import UserContext from "../contexts/userContext";
import { Link } from "react-router-dom";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function MainHeader({ history }: any) {
  const [showMenu, setShowMenu] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  return (
    <div className="headerStyle">
      <HStack w="100%" h="60" alignItems={"center"}>
        <Box flex={1}>
          {/* <IconContext.Provider
            value={{
              color: "white",
              size: "2em",
              style: { alignSelf: "center" },
            }}
          >
            <GoThreeBars />
          </IconContext.Provider> */}
          {/* <Menu width={300}>
            <OverlayMenu />
          </Menu> */}
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
          >
            <motion.div className="backgroundss" variants={sidebar} />
            <Navigation />
            <MenuToggle toggle={() => toggleOpen()} />
          </motion.nav>
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
