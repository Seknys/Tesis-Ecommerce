import { DocumentData } from "firebase/firestore";
import {
  Box,
  HStack,
  Text,
  Image,
  Link as LinkNativeBase,
  Avatar,
  Button,
  useMediaQuery,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { Icategories } from "../interfaces/interface";
import { signOutUser } from "../services/auth";
import { getCategories } from "../services/basicOperations";

export default function OverlayMenu() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [isSmallScreen] = useMediaQuery({
    minWidth: 1,
    maxWidth: 490,
  });
  const [isMediumScreen] = useMediaQuery({
    minWidth: 491,
    maxWidth: 1200,
  });
  let url = "";

  useEffect(() => {
    url = window.location.href;

    const getCategoriesSnapshot = (snapshot: DocumentData) => {
      const categoriesData = snapshot.docs.map((doc: DocumentData) =>
        doc.data()
      );
      setCategories(categoriesData);
    };
    getCategories(getCategoriesSnapshot);
  }, []);

  //Get my url

  return (
    <Box p="15">
      <HStack alignItems={"center"}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-tesis.appspot.com/o/Junk%2FLogoT.png?alt=media&token=2857c39b-afd2-4bea-8a3a-569634c8a6ba",
          }}
          alt="MainLogo"
          width={50}
          height={50}
          ml="25"
        />

        <Text fontSize="xl" fontFamily={"heading"} fontWeight="500">
          Up World
        </Text>
      </HStack>
      {user && (
        <Box my="5">
          {/* <Text mb="2" fontSize={"md"}>
            {t("menu_welcome")}
          </Text> */}
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <HStack alignItems={"center"}>
              <Avatar
                // borderColor={"black"}
                // borderWidth={1}
                shadow={6}
                size="md"
                source={{
                  uri: user.img,
                }}
              />
              <Text ml="15" bold fontSize={"lg"} isTruncated w="90%">
                {user.name} {user.lastName}
              </Text>
            </HStack>
          </Link>
          <Link
            to="/cart/details"
            style={{
              textDecoration: "none",
              marginTop: "25px",
              width: "75%",
              backgroundColor: "#fc2",
              alignSelf: "center",
            }}
          >
            <Button bg="amber.400">
              <Text
                bold
                color="black"
                fontFamily={"heading"}
                fontStyle="italic"
              >
                {t("cart_details")}
              </Text>
            </Button>
          </Link>
        </Box>
      )}
      <Text fontSize={"lg"}>{t("menu_Language")}:</Text>
      <HStack my="3" justifyContent={"center"}>
        <LinkNativeBase href={`${url}?lng=en`}>
          <Image
            rounded={"md"}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FFlagEnglish.png?alt=media&token=6384115e-cef8-4f79-9ea5-7b3d6d543bbc",
            }}
            alt="MainLogo"
            h={30}
            w="50"
            resizeMode="cover"
            ml="25"
          />
        </LinkNativeBase>
        <LinkNativeBase href={`${url}?lng=es`}>
          <Image
            rounded={"md"}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FFlagSpain.png?alt=media&token=55233c4c-5c46-4e44-90fa-0a3f6b75001b",
            }}
            alt="MainLogo"
            h={30}
            w="50"
            resizeMode="cover"
            ml="25"
          />
        </LinkNativeBase>
      </HStack>

      {/* <HStack>
        <Box>
          <Text>Usuario</Text>
        </Box>
        <Text>Icon Here</Text>
      </HStack> */}

      {user?.role === "client" && (
        <Box shadow="8" borderRadius={15} mt="5">
          <Link
            style={{
              textDecoration: "none",
              width: "100%",
            }}
            to="/shopping-history"
          >
            <Text color="black" fontSize={"xl"} p="3" fontFamily="heading">
              {t("shopping-history")}
            </Text>
          </Link>
        </Box>
      )}

      {user?.role !== "admin" &&
        user?.role !== "analyst" &&
        (isSmallScreen || isMediumScreen) && (
          <>
            <Text>{t("label_categories")}</Text>
            <Box shadow="8" borderRadius={15} mt="5">
              {categories &&
                categories.map((category, index) => (
                  <Link
                    key={category.name + index}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                    }}
                    to={`/category/${category.uid}`}
                  >
                    <Text color="black" fontSize={"xl"} p="3">
                      {category.name}
                    </Text>
                  </Link>
                ))}
            </Box>
          </>
        )}

      {user && (
        <>
          <Button
            my="10"
            bg="gray.700"
            shadow={9}
            borderRadius="15"
            onPress={() => {
              signOutUser();
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            <Text color="white" fontSize={"xl"} fontFamily="heading">
              {t("btn_log_out")}
            </Text>
          </Button>
        </>
      )}
    </Box>
  );
}
