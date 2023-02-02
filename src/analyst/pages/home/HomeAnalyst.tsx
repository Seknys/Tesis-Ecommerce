import { motion } from "framer-motion";
import { Box, Pressable, Text } from "native-base";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconContext } from "react-icons";
import {
  FcBusinessman,
  FcInfo,
  FcInspection,
  FcStatistics,
  FcViewDetails,
} from "react-icons/fc";
import { Link } from "react-router-dom";

export const HomeAnalyst = () => {
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
      h="55vh"
    >
      <Pressable
   
        onHoverIn={() => setHover({ value: true, index: 1 })}
        onHoverOut={() => setHover(null)}
        my="150"
      >
        <Link to="/analyst/categories" style={{ textDecoration: "none" }}>
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
                  <FcInspection />
                </IconContext.Provider>
              </div>
              {hover?.value && hover?.index === 1 && (
                <Box mt="25">
                  <Text textAlign="center" w="175px" fontSize="2xl" bold>
                    {/* {t("admin_user")} */}
                    {t("analysis_category")}
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
        <Link
          to="/analyst/products/isAnalyst=true"
          style={{ textDecoration: "none" }}
        >
          <div>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <div className="admin-container">
                <IconContext.Provider
                  value={{
                    color: "black",
                    size: "9em",
                    style: { padding: 14 },
                  }}
                >
                  <FcStatistics />
                </IconContext.Provider>
              </div>
              {hover?.value && hover?.index === 2 && (
                <Box mt="25">
                  <Text textAlign="center" w="175px" fontSize="2xl" bold>
                    {/* {t("admin_create_product")} */}
                    {t("analysis_product")}
                  </Text>
                </Box>
              )}
            </motion.div>
          </div>
        </Link>
      </Pressable>
      <Pressable
   
        onHoverIn={() => setHover({ value: true, index: 3 })}
        onHoverOut={() => setHover(null)}
        my="150"
      >
        {/* <Link
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
                  <FcBusinessman />
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
        </Link> */}
      </Pressable>
    </Box>
  );
};
