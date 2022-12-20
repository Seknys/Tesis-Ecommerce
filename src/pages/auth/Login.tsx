import {
  Center,
  Container,
  Box,
  Text,
  FormControl,
  Input,
  Pressable,
  Button,
  HStack,
} from "native-base";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { signInWithGoogle, userLogin } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ErrorToast, SuccesToast, ToastC } from "../../components/Toast";
import { ResetPasswordByEmail } from "./ResetPassword";

export default function Login({ history }: any) {
  //Const

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bttnSubmit, setBttnSubmit] = useState(true);
  const isValid = useRef(true);
  const [errors, setErrors] = useState<{
    email?: string;
    pass?: string;
  }>({});

  //Translations
  const { t } = useTranslation();
  const auth_email: string = t("auth_email");
  const auth_pass: string = t("auth_pass");

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  const onSubmit = async () => {
    setBttnSubmit(false);

    if (isValid.current) {
      await userLogin(email, password)
        .then((res) => {
          if (res) {
            SuccesToast(t("auth_login_success"));
            // setTimeout(() => {
            history.push("/home");
            // }, 2000);
          }
        })
        .catch((err) => {
          const errorCode = err.code;
          let errorMessage = "";
          switch (errorCode) {
            case "auth/invalid-email":
              errorMessage = t("auth_invalid_email");
              break;
            case "auth/user-disabled":
              errorMessage = t("auth_user_disabled");
              break;
            case "auth/user-not-found":
              errorMessage = t("auth_user_not_found");
              break;
            case "auth/wrong-password":
              errorMessage = t("auth_wrong_password");
              break;
            default:
              errorMessage = t("auth_unknown_error");
              break;
          }
          ErrorToast(errorMessage);
        });
      // history.push("/home");
    }
    setTimeout(() => {
      setBttnSubmit(true);
    }, 2000);
  };

  return (
    <Center>
      <ToastC />
      <Container>
        <Box>
          <Text fontSize="5xl" mt="45%" mb="25%" color="primary">
            {t("login")}
          </Text>
        </Box>
        <Box>
          <FormControl isRequired isInvalid={errors.email != undefined}>
            <Input
              size="xl"
              mb="19"
              borderBottomWidth="3"
              placeholder={auth_email}
              placeholderTextColor="black"
              onChangeText={(emailTxt: string) => {
                setEmail(emailTxt);
                if (emailTxt.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    email: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    email: undefined,
                  }));
                  isValid.current = true;
                }
              }}
              variant="underlined"
              borderColor="secondary"
            />
            {errors.email != undefined ? (
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={errors.pass != undefined}>
            <Input
              size="2xl"
              borderBottomWidth="3"
              placeholder={auth_pass}
              placeholderTextColor="black"
              onChangeText={(passTxt: string) => {
                setPassword(passTxt);
                if (passTxt.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    pass: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else if (passTxt.length < 8) {
                  setErrors((prevError) => ({
                    ...prevError,
                    pass: `${t("valid_pass")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    pass: undefined,
                  }));
                  isValid.current = true;
                }
              }}
              variant="underlined"
              borderColor="secondary"
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <Box>
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Box>
                        <FontAwesomeIcon icon={faEye} size="lg" />
                      </Box>
                    ) : (
                      <Box>
                        <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                      </Box>
                    )}
                  </Pressable>
                </Box>
              }
            />

            {errors.pass != undefined ? (
              <FormControl.ErrorMessage>{errors.pass}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          <Box w="100%">
            <Pressable
              w="100%"
              my="3"
              onPress={() => {
                console.log("SHow modal");
                setShowModal(true);
              }}
            >
              <Text bold textAlign="end">
                {t("auth_forgot")}
              </Text>
            </Pressable>
          </Box>
          <Box w="100%">
            {bttnSubmit ? (
              <Button
                bg="primary"
                onPress={() => {
                  onSubmit();
                }}
              >
                <Text fontSize="xl">{t("login")}</Text>
              </Button>
            ) : (
              <Button bg="primary" isLoading isLoadingText={`${t("login")}`} />
            )}
          </Box>
          <HStack my="15" alignItems="center" justifyContent="center" w="100%">
            <Text>{t("auth_dont")}</Text>
            {/* <Button
              onPress={() => {
                <Link to="/register" />;
              }}
            >
              <Text bold>{t("auth_register")}</Text>
            </Button> */}
            <Link
              to="/register"
              style={{ textDecoration: "none", marginLeft: 14 }}
            >
              <Text bold>{t("auth_register")}</Text>
            </Link>
          </HStack>
          <Text alignSelf="center">{t("auth_extra")}</Text>
          <HStack justifyContent="space-around" w="100%" mt="25">
            <Pressable onPress={handleGoogleLogin}>
              <IconContext.Provider
                value={{
                  size: "3em",
                  style: { alignSelf: "center" },
                }}
              >
                <FcGoogle />
              </IconContext.Provider>
            </Pressable>
            <Box>
              <IconContext.Provider
                value={{
                  size: "3em",
                  style: { alignSelf: "center" },
                }}
              >
                <BsFillTelephoneFill />
              </IconContext.Provider>
            </Box>
            <Box>
              <IconContext.Provider
                value={{
                  size: "3em",
                  style: { alignSelf: "center" },
                }}
              >
                <BsGithub />
              </IconContext.Provider>
            </Box>
          </HStack>
        </Box>
        {showModal && (
          <ResetPasswordByEmail
            setModalVisible={setShowModal}
            modalVisible={showModal}
          />
        )}
      </Container>
    </Center>
  );
}
