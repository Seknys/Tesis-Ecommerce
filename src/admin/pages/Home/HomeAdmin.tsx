import { Box, Center, Container, HStack, Text, Pressable } from "native-base";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./style.css";
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";

import {
  FcBusinessman,
  FcDoughnutChart,
  FcPaid,
  FcShipped,
  FcViewDetails,
} from "react-icons/fc";
import { LinearGradient } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HomeAdmin() {
  const { t } = useTranslation();
  const [hover, setHover] = useState<{
    value: boolean;
    index: number;
  } | null>();

  return (
    <Box
      flexDirection="row"
      alignItems={"center"}
      justifyContent="space-evenly"
      // flexWrap={"wrap"}
      h="55vh"
    >
      <Pressable
        onPress={() => console.log("")}
        onHoverIn={() => setHover({ value: true, index: 1 })}
        onHoverOut={() => setHover(null)}
        my="150"
      >
        <Link to="admin/add-account" style={{ textDecoration: "none" }}>
          <div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <div className="admin-container">
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "9em",
                    style: { padding: 14 },
                  }}
                >
                  <FcBusinessman />
                </IconContext.Provider>
              </div>
              {hover?.value && hover?.index === 1 && (
                <Box mt="25">
                  <Text textAlign="center" w="175px" fontSize="2xl" bold>
                    {t("admin_user")}
                  </Text>
                </Box>
              )}
            </motion.div>
          </div>
        </Link>
      </Pressable>
      <Pressable
        onHoverIn={() => setHover({ value: true, index: 2 })}
        onHoverOut={() => setHover(null)}
        my="150"
      >
        <Link to="admin/add-product" style={{ textDecoration: "none" }}>
          <div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <div className="admin-container">
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "10em",
                  }}
                >
                  <FcPaid />
                </IconContext.Provider>
              </div>
              {hover?.value && hover?.index === 2 && (
                <Box mt="25">
                  <Text textAlign="center" w="175px" fontSize="2xl" bold>
                    {t("admin_create_product")}
                  </Text>
                </Box>
              )}
            </motion.div>
          </div>
        </Link>
      </Pressable>
      <Pressable
        onPress={() => console.log("Pressed")}
        onHoverIn={() => setHover({ value: true, index: 3 })}
        onHoverOut={() => setHover(null)}
        my="150"
      >
        <Link
          to="admin/products/isAdmin=true"
          style={{ textDecoration: "none" }}
        >
          <div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <div className="admin-container">
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "9em",
                    style: { padding: 10 },
                  }}
                >
                  <FcViewDetails />
                </IconContext.Provider>
              </div>
              {hover?.value && hover?.index === 3 && (
                <Box mt="25">
                  <Text textAlign="center" w="175px" fontSize="2xl" bold>
                    {t("admin_edit_product")}
                  </Text>
                </Box>
              )}
            </motion.div>
          </div>
        </Link>
      </Pressable>
      <Pressable
        onHoverIn={() => setHover({ value: true, index: 4 })}
        onHoverOut={() => setHover(null)}
        my="150"
      >
        <Link to="/admin/users-client" style={{ textDecoration: "none" }}>
          <div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <div className="admin-container">
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "9em",
                    style: { padding: 10 },
                  }}
                >
                  <FcShipped />
                </IconContext.Provider>
              </div>
              {hover?.value && hover?.index === 4 && (
                <Box mt="25">
                  <Text textAlign="center" w="175px" fontSize="2xl" bold>
                    {t("admin_usersHisotry")} 
                  </Text>
                </Box>
              )}
            </motion.div>
          </div>
        </Link>
      </Pressable>
    </Box>
  );
}
