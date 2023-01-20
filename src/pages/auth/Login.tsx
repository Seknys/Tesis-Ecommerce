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
import { BsFillTelephoneFill, BsTwitter } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import {
  SaveUserToFireBase,
  signInWithGoogle,
  userLogin,
} from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ErrorToast, SuccesToast, ToastC } from "../../components/Toast";
import { ResetPasswordByEmail } from "./ResetPassword";
import { singInWithGitHub } from "../../services/GitHub";
import { singInWithTwitter } from "../../services/Twitter";

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
    setBttnSubmit(false);
    signInWithGoogle()
      .then((result) => {
        SuccesToast(t("auth_login_success"));
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        SaveUserToFireBase(
          user.uid,
          user.displayName,
          "",
          user.email,
          "client",
          user.photoURL
        );

        setTimeout(() => {
          history.push("/home");
        }, 2000);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;

        switch (errorCode) {
          case "auth/account-exists-with-different-credential":
            ErrorToast(t("auht_error_Different Credential"));
            break;
          case "auth/popup-closed-by-user":
            ErrorToast(t("auth_error-PopupClose"));
            break;
          default:
            ErrorToast(t("auth_unknown_error"));
        }
        // ErrorToast(t("auth_login_error"));

        setBttnSubmit(true);
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleGitHubLogin = () => {
    setBttnSubmit(false);
    singInWithGitHub()
      .then((result) => {
        SuccesToast(t("auth_login_success"));
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        SaveUserToFireBase(
          user.uid,
          user.displayName,
          "",
          user.email,
          "client",
          user.photoURL
        );
        setTimeout(() => {
          history.push("/home");
        }, 2000);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;

        switch (errorCode) {
          case "auth/account-exists-with-different-credential":
            ErrorToast(t("auht_error_Different Credential"));
            break;
          case "auth/popup-closed-by-user":
            ErrorToast(t("auth_error-PopupClose"));
            break;
          default:
            ErrorToast(t("auth_unknown_error"));
        }
        // ErrorToast(t("auth_login_error"));

        setBttnSubmit(true);
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleTwitterLogin = () => {
    setBttnSubmit(false);
    singInWithTwitter()
      .then((result) => {
        SuccesToast(t("auth_login_success"));
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        //const credential = TwitterAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        SaveUserToFireBase(
          user.uid,
          user.displayName,
          "",
          user.email,
          "client",
          user.photoURL
        );
        setTimeout(() => {
          history.push("/home");
        }, 2000);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;

        switch (errorCode) {
          case "auth/account-exists-with-different-credential":
            ErrorToast(t("auht_error_Different Credential"));
            break;
          case "auth/popup-closed-by-user":
            ErrorToast(t("auth_error-PopupClose"));
            break;
          default:
            ErrorToast(t("auth_unknown_error"));
        }
        // ErrorToast(t("auth_login_error"));

        setBttnSubmit(true);

        // The AuthCredential type that was used.
        // const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
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
              errorMessage = t("auth_login_error");
              break;
            case "auth/user-disabled":
              errorMessage = t("auth_user_disabled");
              break;
            case "auth/user-not-found":
              errorMessage = t("auth_user_not_found");
              break;
            case "auth/wrong-password":
              errorMessage = t("auth_login_error");
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
              value={password}
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
                setShowModal(true);
              }}
            >
              <Text fontFamily={"heading"} fontStyle="italic" textAlign="end">
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
              <Text bold fontFamily={"heading"} fontStyle="italic">
                {t("auth_register")}
              </Text>
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
            <Pressable onPress={handleTwitterLogin}>
              <IconContext.Provider
                value={{
                  size: "3em",
                  style: { alignSelf: "center" },
                }}
              >
                <BsTwitter />
              </IconContext.Provider>
            </Pressable>
            <Pressable onPress={handleGitHubLogin}>
              <IconContext.Provider
                value={{
                  size: "3em",
                  style: { alignSelf: "center" },
                }}
              >
                <BsGithub />
              </IconContext.Provider>
            </Pressable>
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
