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
  useToast,
} from "native-base";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { userLogin } from "../../services/auth";

export default function Login() {
  const toast = useToast();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bttnSubmit, setBttnSubmit] = useState(true);
  const isValid = useRef(true);

  const [errors, setErrors] = useState<{
    email?: string;
    pass?: string;
  }>({});

  // const validate = () => {
  //   setErrors({});
  //   let isValid = true;
  //   if (email === "") {
  //     setErrors((prevError) => ({
  //       ...prevError,
  //       email: `${t("validate")}`,
  //     }));
  //     isValid = false;
  //   }
  //   if (password === "") {
  //     setErrors((prevError) => ({
  //       ...prevError,
  //       pass: `${t("validate")}`,
  //     }));
  //     isValid = false;
  //   } else if (password.length < 8) {
  //     console.log("password", password, " length", password.length);
  //     setErrors((prevError) => ({

  //       pass: `no ocorrect`,
  //     }));

  //     isValid = false;
  //   }

  //   return isValid;
  // };

  const onSubmit = () => {
    setBttnSubmit(false);

    if (isValid.current) {
      userLogin(email, password).catch((err) => {
        // render: () => {
        //   return (
        //     <Box
        //       p={2}
        //       px={3}
        //       py={2}
        //       rounded="md"
        //       bg="red.500"
        //       _text={{ color: "white" }}
        //     >
        //       {err}
        //     </Box>
        //   );
        // },
        // placement: "bottom",

        console.log("err FRONT", err);
      });
    }
    setTimeout(() => {
      setBttnSubmit(true);
    }, 2000);
  };
  const text1: string = t("auth_email");
  const text2: string = t("auth_pass");

  return (
    <Center>
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
              borderBottomWidth="3"
              placeholder={text1}
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
              placeholder={text2}
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
              /*  InputRightElement={
                <Box>
                   <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Box>
                        <IconContext.Provider
                          value={{
                            size: "2em",
                            style: { alignSelf: "center" },
                          }}
                        >
                          <AiFillEye />
                        </IconContext.Provider>{" "}
                      </Box>
                    ) : (
                      <div>
                        <IconContext.Provider
                          value={{
                            size: "2em",
                            style: { alignSelf: "center" },
                          }}
                        >
                        <AiFillEyeInvisible />
                        </IconContext.Provider>
                      </div>
                    )}
                  </Pressable> 
                </Box>
              }*/
            />

            {errors.pass != undefined ? (
              <FormControl.ErrorMessage>{errors.pass}</FormControl.ErrorMessage>
            ) : null}
          </FormControl>

          {/* Fix this component */}

          <Box position="absolute" top="55" left="190">
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Box>
                  <IconContext.Provider
                    value={{
                      size: "2em",
                      style: { alignSelf: "center" },
                    }}
                  >
                    <AiFillEye />
                  </IconContext.Provider>{" "}
                </Box>
              ) : (
                <div>
                  <IconContext.Provider
                    value={{
                      size: "2em",
                      style: { alignSelf: "center" },
                    }}
                  >
                    <AiFillEyeInvisible />
                  </IconContext.Provider>
                </div>
              )}
            </Pressable>
          </Box>
          <Box w="100%">
            <Pressable
              w="100%"
              my="3"
              onPress={() => {
                toast.show({
                  description: "MiTOAST",
                  placement: "top",
                });
                console.log("TOAST");
              }}
            >
              <Text bold textAlign="end">
                {t("auth_forgot")}
              </Text>
            </Pressable>
          </Box>
          <Box w="100%">
            {bttnSubmit ? (
              <Button bg="primary" onPress={onSubmit}>
                <Text fontSize="xl">{t("login")}</Text>
              </Button>
            ) : (
              <Button bg="primary" isLoading isLoadingText={`${t("login")}`} />
            )}
          </Box>
          <HStack my="15" alignItems="center" justifyContent="center" w="100%">
            <Text>{t("auth_dont")}</Text>
            <Button>
              <Text bold>{t("auth_register")}</Text>
            </Button>
          </HStack>
          <Text alignSelf="center">{t("auth_extra")}</Text>
          <HStack justifyContent="space-around" w="100%" mt="25">
            <Box>
              <IconContext.Provider
                value={{
                  size: "3em",
                  style: { alignSelf: "center" },
                }}
              >
                <FcGoogle />
              </IconContext.Provider>
            </Box>
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
      </Container>
    </Center>
  );

  // return (
  //   <>
  //   <Center>
  //     <Container>

  //       <Box>
  //         <Text fontSize="5xl" mt="45%" mb="25%" color="primary">
  //           {t("login")}
  //         </Text>
  //       </Box>
  //       <Box>
  // <FormControl isRequired isInvalid={errors.email != undefined}>
  //   <Input
  //     size="xl"
  //     borderBottomWidth="3"
  //     placeholder={t("auth_email")}
  //     placeholderTextColor="black"
  //     onChangeText={(emailTxt: string) => {
  //       setEmail(emailTxt);
  //       if (emailTxt.length <= 0) {
  //         setErrors((prevError) => ({
  //           ...prevError,
  //           email: `${t("validate")}`,
  //         }));
  //         isValid.current = false;
  //       } else {
  //         setErrors((prevError) => ({
  //           ...prevError,
  //           email: undefined,
  //         }));
  //         isValid.current = true;
  //       }
  //     }}
  //     variant="underlined"
  //     borderColor="secondary"
  //   />
  //   {errors.email != undefined ? (
  //     <FormControl.ErrorMessage>
  //       {errors.email}
  //     </FormControl.ErrorMessage>
  //   ) : null}
  // </FormControl>
  // <FormControl isRequired isInvalid={errors.pass != undefined}>
  //   <Input
  //     size="2xl"
  //     borderBottomWidth="3"
  //     placeholder={t("auth_pass")}
  //     placeholderTextColor="black"
  //     onChangeText={(passTxt: string) => {
  //       setPassword(passTxt);
  //       if (passTxt.length <= 0) {
  //         setErrors((prevError) => ({
  //           ...prevError,
  //           pass: `${t("validate")}`,
  //         }));
  //         isValid.current = false;
  //       } else if (passTxt.length < 8) {
  //         setErrors((prevError) => ({
  //           ...prevError,
  //           pass: `${t("valid_pass")}`,
  //         }));
  //         isValid.current = false;
  //       } else {
  //         setErrors((prevError) => ({
  //           ...prevError,
  //           pass: undefined,
  //         }));
  //         isValid.current = true;
  //       }
  //     }}
  //     variant="underlined"
  //     borderColor="secondary"
  //     type={showPassword ? "text" : "password"}
  //     InputRightElement={
  //       <Box>
  //         <Button onPress={() => setShowPassword(!showPassword)}>
  //           {showPassword ? (
  //             <IconContext.Provider
  //               value={{
  //                 size: "2em",
  //                 style: { alignSelf: "center" },
  //               }}
  //             >
  //               <AiFillEye />
  //             </IconContext.Provider>
  //           ) : (
  //             <IconContext.Provider
  //               value={{
  //                 size: "2em",
  //                 style: { alignSelf: "center" },
  //               }}
  //             >
  //               <AiFillEyeInvisible />
  //             </IconContext.Provider>
  //           )}
  //         </Button>
  //       </Box>
  //     }
  //   />
  //   {errors.pass != undefined ? (
  //     <FormControl.ErrorMessage>{errors.pass}</FormControl.ErrorMessage>
  //   ) : null}
  // </FormControl>
  //       </Box>
  // <Box w="100%">
  //   <Pressable
  //     w="100%"
  //     my="3"
  //     onPress={() => {
  //       toast.show({
  //         description: "MiTOAST",
  //         placement:"top"
  //       });
  //       console.log("TOAST");
  //     }}
  //   >
  //     <Text bold textAlign="end">
  //       {t("auth_forgot")}
  //     </Text>
  //   </Pressable>
  // </Box>
  // <Box w="100%">
  //   {bttnSubmit ? (
  //     <Button bg="primary" onPress={onSubmit}>
  //       <Text fontSize="xl">{t("login")}</Text>
  //     </Button>
  //   ) : (
  //     <Button bg="primary" isLoading isLoadingText={`${t("login")}`} />
  //   )}
  // </Box>
  // <HStack my="15" alignItems="center" justifyContent="center" w="100%">
  //   <Text>{t("auth_dont")}</Text>
  //   <Button>
  //     <Text bold>{t("auth_register")}</Text>
  //   </Button>
  // </HStack>
  // <Text alignSelf="center">{t("auth_extra")}</Text>
  // <HStack justifyContent="space-around" w="100%" mt="25">
  //   <Box>
  //     <IconContext.Provider
  //       value={{
  //         size: "3em",
  //         style: { alignSelf: "center" },
  //       }}
  //     >
  //       <FcGoogle />
  //     </IconContext.Provider>
  //   </Box>
  //   <Box>
  //     <IconContext.Provider
  //       value={{
  //         size: "3em",
  //         style: { alignSelf: "center" },
  //       }}
  //     >
  //       <BsFillTelephoneFill />
  //     </IconContext.Provider>
  //   </Box>
  //   <Box>
  //     <IconContext.Provider
  //       value={{
  //         size: "3em",
  //         style: { alignSelf: "center" },
  //       }}
  //     >
  //       <BsGithub />
  //     </IconContext.Provider>
  //   </Box>
  // </HStack>
  //     </Container>
  //   </Center>
  //   </>
  // );
}
