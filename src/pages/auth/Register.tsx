import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Input,
  Pressable,
  Text,
} from "native-base";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { RegisterWithEmail } from "../../services/auth";

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorToast, SuccesToast, ToastC } from "../../components/Toast";
import { auth } from "../../firebase/configFirebase";

interface IRegisterProps {
  history: any;
  isAdmin?: boolean;
}
export default function Register({ history, isAdmin }: IRegisterProps) {
  //Const

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bttnSubmit, setBttnSubmit] = useState(true);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const role = isAdmin ? "analyst" : "client";
  const [errors, setErrors] = useState<{
    email?: string;
    pass?: string;
    name?: string;
    lastName?: string;
  }>({});
  const isValid = useRef(true);

  //Translations
  const { t } = useTranslation();
  const auth_email: string = t("auth_email");
  const auth_pass: string = t("auth_pass");
  const auth_name: string = t("auth_name");
  const auth_lastName: string = t("auth_lastName");

  const onSubmit = () => {
    setBttnSubmit(false);
    let originalUser = auth.currentUser;


    if (isValid.current) {
      RegisterWithEmail(email, password, name, lastName, role)
        .then((res) => {
          // console.log("Test Front", res);
          if (isAdmin) {
            setTimeout(() => {
              SuccesToast(t("admin_register_success"));
              auth.updateCurrentUser(originalUser);
         
            }, 2000);
          } else {
   
            SuccesToast(t("auth_register_success"));
            setTimeout(() => {
              history.push("/home");
            }, 2000);
          }
          // SuccesToast(t("auth_register_success"));
          // setTimeout(() => {
          //   if (isAdmin) {
          //     history.goBack();
          //   } else {
          //     history.push("/login");
          //   }
          // }, 2000);
        })
        .catch((errCode) => {
   
          let message = "";
          switch (errCode.message) {
            case "auth/email-already-in-use":
              message = t("auth_email_already_in_use");
              break;
            case "auth/invalid-email":
              message = t("auth_invalid_email");
              break;
            case "auth/weak-password":
              message = t("auth_weak_password");
              break;
            default:
              message = t("auth_unknown_error");
              break;
          }
          ErrorToast(message);
        });
    }
    setTimeout(() => {
      setBttnSubmit(true);
    }, 2000);
  };

  return (
    <Center>
      <Container>
        <ToastC />
        <Box>
          {isAdmin ? (
            <Text w="300px" fontSize="3xl" mb="25%" color="primary" bold>
              {t("admin_create_user_Title")}
            </Text>
          ) : (
            <Text fontSize="5xl" mt="45%" mb="25%" color="primary" bold>
              {t("register")}
            </Text>
          )}
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
          <FormControl isRequired isInvalid={errors.name != undefined}>
            <Input
              size="xl"
              mb="19"
              borderBottomWidth="3"
              placeholder={auth_name}
              placeholderTextColor="black"
              onChangeText={(nameTxt: string) => {
                setName(nameTxt);
                if (nameTxt.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    name: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    name: undefined,
                  }));
                  isValid.current = true;
                }
              }}
              variant="underlined"
              borderColor="secondary"
            />
            {errors.name != undefined ? (
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={errors.lastName != undefined}>
            <Input
              size="xl"
              mb="19"
              borderBottomWidth="3"
              placeholder={auth_lastName}
              placeholderTextColor="black"
              onChangeText={(lastNameTxt: string) => {
                setLastName(lastNameTxt);
                if (lastNameTxt.length <= 0) {
                  setErrors((prevError) => ({
                    ...prevError,
                    lastName: `${t("validate")}`,
                  }));
                  isValid.current = false;
                } else {
                  setErrors((prevError) => ({
                    ...prevError,
                    lastName: undefined,
                  }));
                  isValid.current = true;
                }
              }}
              variant="underlined"
              borderColor="secondary"
            />
            {errors.lastName != undefined ? (
              <FormControl.ErrorMessage>
                {errors.lastName}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isRequired isInvalid={errors.pass != undefined}>
            <Input
              size="2xl"
              mb="19"
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
                  <Pressable
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
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
        </Box>
        <Box w="100%" my="10">
          {bttnSubmit ? (
            <Button bg="primary" onPress={onSubmit}>
              <Text fontSize="xl">{t("auth_create")}</Text>
            </Button>
          ) : (
            <Button
              bg="primary"
              isLoading
              isLoadingText={`${t("auth_create")}`}
            />
          )}
        </Box>
      </Container>
    </Center>
  );
}
