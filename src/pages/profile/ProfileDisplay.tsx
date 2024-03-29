import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  HStack,
  IconButton,
  Pressable,
  Spinner,
  Text,
  useMediaQuery,
} from "native-base";
// import BoxMui as Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorToast, SuccesToast, ToastC } from "../../components/Toast";
import UserContext from "../../contexts/userContext";
import {
  reauthenticateUserActions,
  signOutUser,
  updateEmailAdress,
  updateImageUser,
  updatePassService,
  updateUser,
  uploadImageUser,
} from "../../services/auth";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import { FcEditImage } from "react-icons/fc";
import { RiEdit2Line } from "react-icons/ri";
import { Iuser } from "../../interfaces/interface";

import Dropzone from "react-dropzone-uploader";
import { getDownloadURL } from "firebase/storage";
import { BiLogOut } from "react-icons/bi";

export default function ProfileDisplay({ history }: any) {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const [editP, setEditP] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    lastName?: string;
    email?: string;
    pass?: string;
    confirmPass?: string;
    passAux?: string;
  }>({});

  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);

  const [name, setName] = useState("");

  const [lastName, setLastName] = useState("");

  const [passAux, setPassAux] = useState("");
  const [oldPass, setOldPass] = useState("");

  const [email, setEmail] = useState<string | undefined>("");
  const [img, setImg] = useState<any>();
  const [pass, setPass] = useState("");
  const [desc, setDesc] = useState("");
  const isValid = useRef(true);
  const [confirmPass, setConfirmPass] = useState("");
  const inputRef = useRef<any>(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const [isSmaillScreen] = useMediaQuery({
    minWidth: 10,
    maxWidth: 768,
  });

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    if (user) {
      setLoadingImg(true);
      uploadImageUser(user?.uid, fileObj)
        .then((res) => {
    
          getDownloadURL(res.ref).then((url) => {
            updateImageUser(user.uid, url).then((res) => {
          
              setLoadingImg(false);
              SuccesToast(t("profile_img"));
            });
          });
        })
        .catch((err) => {
          setLoadingImg(false);
          ErrorToast(t("profile_imgError"));
        });
    }
  };

  useEffect(() => {

    if (user) {
      setName(user.name);
      setLastName(user.lastName);
      setEmail(user.email);
      setImg(user.img);
      setDesc(user.bio);
    }
  }, [user]);

  const handleUpdateProfile = () => {
    setEditP(false);
    if (user) {
      const newUpdatedData: Iuser = {
        uid: user.uid,
        name: name,
        lastName: lastName,
        email: email,
        // img: img,
        bio: desc,
      };
      if (passAux !== "" && email) {
        reauthenticateUserActions(passAux)
          .then((res) => {
   
            updateEmailAdress(email)
              .then((res) => {
                updateUser(user.uid, newUpdatedData)
                  .then((res) => {
                    SuccesToast(t("profile_updated"));
                  })
                  .catch((err) => {
                    ErrorToast(t("profile_updateError"));
                    console.log("err", err);
                  });
              })
              .catch((err) => {
                ErrorToast(t("profile_updateError"));
                console.log("err", err);
              });
          })
          .catch((err) => {
            ErrorToast(t("profile_updateError"));
            console.log("err", err);
          });
      } else {
        if (oldPass !== "" && pass === confirmPass) {
          reauthenticateUserActions(oldPass)
            .then(() => {
              updatePassService(pass)
                .then((res) => {
               
                  updateUser(user.uid, newUpdatedData)
                    .then((res) => {
                      SuccesToast(t("profile_updated"));
                    })
                    .catch((err) => {
                      ErrorToast(t("profile_updateError"));
                      console.log("err", err);
                    });
                })
                .catch((err) => {
                  ErrorToast(t("profile_updateError"));
                  console.log("err", err);
                });
            })
            .catch(() => {
              ErrorToast(t("profile_updateError"));
            });
        } else {
          delete newUpdatedData.email;
          updateUser(user.uid, newUpdatedData)
            .then((res) => {
              SuccesToast(t("profile_updated"));
            })
            .catch((err) => {
              ErrorToast(t("profile_updateError"));
              console.log("err", err);
            });
        }
      }
    }
  };

  return (
    <>
      <ToastC />
      {!loading ? (
        !isSmaillScreen ? (
          <>
            <Box
              position="absolute"
              flexDir={"row-reverse"}
              w="100%"
              zIndex={1}
            >
              <Button
                // right="0px"
                w="180px"
                m="25"
                bg="blue.500"
                onPress={() => {
                  setLoading(true);

                  signOutUser();
                  // setLoading(false);
                  setTimeout(() => {
             
                    history.push("/home");
                  }, 1500);

                  // SuccesToast(t("log_out"));
                }}
                _hover={{
                  bg: "blue.600",
                }}
              >
                <Text bold color="white" fontSize={"2xl"} fontFamily="heading">
                  {t("btn_log_out")}
                </Text>
              </Button>
            </Box>

            <Center>
              <Container>
                <HStack mt="55px">
                  <Pressable
                    onPress={handleClick}
                    onHoverIn={() => {
                      setHover(true);
                    }}
                    onHoverOut={() => {
                      setHover(false);
                    }}
                  >
                    <Avatar
                      mx="50px"
                      bg="rgba(255,255,255,0.5)"
                      size="150px"
                      source={{
                        uri: user?.img
                          ? user.img
                          : "https://firebasestorage.googleapis.com/v0/b/ecommerce-epn.appspot.com/o/asset%2FUserAsset.png?alt=media&token=436e30da-eea2-4dfd-a764-99f9f7e954b5",
                      }}
                    />
                    {hover && (
                      <Box
                        rounded={"full"}
                        w="150px"
                        position="absolute"
                        top="0"
                        left="50"
                        right="0"
                        bottom="0"
                        bg="rgba(0,0,0,0.5)"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {!loadingImg ? (
                          <>
                            <input
                              style={{ display: "none" }}
                              ref={inputRef}
                              type="file"
                              accept="image/png, image/gif, image/jpeg"
                              onChange={handleFileChange}
                            />

                            {/* <button onClick={handleClick}> */}
                            <Box justifyContent="center" alignItems="center">
                              <FcEditImage className="iconImg" />
                              <Text color="white" fontSize="18" mt="2">
                                {t("change_img")}
                              </Text>
                            </Box>

                            {/* </button> */}
                          </>
                        ) : (
                          <Spinner
                            accessibilityLabel="Loading posts"
                            color="blue.500"
                            size="25px"
                          />
                        )}
                      </Box>
                    )}
                  </Pressable>

                  <Box>
                    <Text fontSize={"2xl"} mb="10px">
                      {t("profile")}
                    </Text>
                    <Text bold fontSize={"2xl"} mb="10px">
                      {user?.name} {user?.lastName}
                    </Text>
                    <Text
                      fontSize={"2xl"}
                      mb="10px"
                      fontFamily="heading"
                      fontWeight={"300"}
                      fontStyle="italic"
                    >
                      {user?.email}
                    </Text>
                  </Box>
                </HStack>
              </Container>

              <Box p="5" my="25" shadow={8} w="55%" rounded={15}>
                <Text mb="3" bold fontSize={"xl"}>
                  {t("edit_bio")}{" "}
                </Text>
                <Text>{user?.bio}</Text>
              </Box>
              <Box>
                <button
                  className="btn-editProfile"
                  onClick={() => {
                    setEditP(true);
                  }}
                >
                  <Text bold color="white" fontSize={"2xl"}>
                    {t("editProfile")}
                  </Text>
                  <RiEdit2Line />
                </button>
              </Box>

              {editP && (
                <Box w="55%" my="35">
                  <TextField
                    error={errors.name ? true : false}
                    id="filled-basic"
                    label={t("auth_name")}
                    variant="filled"
                    value={name}
                    helperText={errors.name ? errors.name : ""}
                    onChange={(text) => {
                      setName(text.target.value);
                      if (text.target.value.length <= 0) {
                        setErrors({ ...errors, name: `${t("validate")}` });
                        isValid.current = false;
                      } else {
                        setErrors({ ...errors, name: undefined });
                        isValid.current = false;
                      }
                    }}
                  />
                  <TextField
                    error={errors.lastName ? true : false}
                    id="filled-basic"
                    label={t("auth_lastName")}
                    variant="filled"
                    value={lastName}
                    helperText={errors.lastName ? errors.lastName : ""}
                    onChange={(text) => {
                      setLastName(text.target.value);
                      if (text.target.value.length <= 0) {
                        setErrors({ ...errors, lastName: `${t("validate")}` });
                        isValid.current = false;
                      } else {
                        setErrors({ ...errors, lastName: undefined });
                        isValid.current = false;
                      }
                    }}
                  />
                  <TextField
                    // error={errors.lastName ? true : false}
                    id="filled-basic"
                    label={t("edit_bio")}
                    variant="filled"
                    multiline
                    value={desc}
                    // helperText={errors.lastName ? errors.lastName : ""}
                    onChange={(text) => {
                      setDesc(text.target.value);
                      // if (text.target.value.length <= 0) {
                      //   setErrors({ ...errors, lastName: `${t("validate")}` });
                      //   isValid.current = false;
                      // } else {
                      //   setErrors({ ...errors, lastName: undefined });
                      //   isValid.current = false;
                      // }
                    }}
                  />
                  <Button
                    _hover={
                      updateEmail ? { bg: "red.500" } : { bg: "gray.600" }
                    }
                    bg={updateEmail ? "red.600" : "black"}
                    mt="5"
                    onPress={() => {
                      setUpdateEmail(!updateEmail);
                    }}
                  >
                    <Text fontSize={"2xl"} color="white">
                      {t("profile_updateEmail")}
                    </Text>
                  </Button>
                  {updateEmail && (
                    <>
                      <TextField
                        error={errors.email ? true : false}
                        id="filled-basic"
                        label={t("edit_email")}
                        variant="filled"
                        value={email}
                        helperText={errors.email ? errors.email : ""}
                        onChange={(text) => {
                          setEmail(text.target.value);
                          if (text.target.value.length <= 0) {
                            setErrors({ ...errors, email: `${t("validate")}` });
                            isValid.current = false;
                          } else {
                            setErrors({ ...errors, email: undefined });
                            isValid.current = false;
                          }
                        }}
                      />
                      <TextField
                        error={errors.passAux ? true : false}
                        id="filled-basic"
                        label={t("profile_enter_pass")}
                        variant="filled"
                        value={passAux}
                        helperText={errors.passAux ? errors.passAux : ""}
                        onChange={(text) => {
                          setPassAux(text.target.value);
                          if (text.target.value.length <= 0) {
                            setErrors({
                              ...errors,
                              passAux: `${t("validate")}`,
                            });
                            isValid.current = false;
                          } else {
                            setErrors({ ...errors, passAux: undefined });
                            isValid.current = false;
                          }
                        }}
                      />
                    </>
                  )}
                  <Button
                    _hover={updatePass ? { bg: "red.500" } : { bg: "gray.600" }}
                    bg={updatePass ? "red.600" : "black"}
                    my="5"
                    onPress={() => {
                      setUpdatePass(!updatePass);
                    }}
                  >
                    <Text fontSize={"2xl"} color="white">
                      {t("profile_updatePass")}
                    </Text>
                  </Button>
                  {updatePass && (
                    <>
                      <TextField
                        // error={errors.pass ? true : false}
                        id="filled-basic"
                        label={t("profile_oldPass")}
                        variant="filled"
                        value={oldPass}
                        helperText={t("profile_labelOldPass")}
                        onChange={(text) => {
                          setOldPass(text.target.value);
                          // if (text.target.value.length <= 0) {
                          //   setErrors({ ...errors, pass: `${t("validate")}` });
                          //   isValid.current = false;
                          // } else {
                          //   setErrors({ ...errors, pass: undefined });
                          //   isValid.current = false;
                          // }
                        }}
                      />
                      <TextField
                        error={errors.pass ? true : false}
                        id="filled-basic"
                        label={t("edit_pass")}
                        variant="filled"
                        value={pass}
                        helperText={errors.pass ? errors.pass : ""}
                        onChange={(text) => {
                          setPass(text.target.value);
                          if (text.target.value.length <= 0) {
                            setErrors({ ...errors, pass: `${t("validate")}` });
                            isValid.current = false;
                          } else {
                            setErrors({ ...errors, pass: undefined });
                            isValid.current = false;
                          }
                        }}
                      />
                      <TextField
                        error={errors.confirmPass ? true : false}
                        id="filled-basic"
                        label={t("edit_confirm_pass")}
                        variant="filled"
                        value={confirmPass}
                        helperText={
                          errors.confirmPass ? errors.confirmPass : ""
                        }
                        onChange={(text) => {
                          setConfirmPass(text.target.value);
                        

                          if (text.target.value.length <= 0) {
                            setErrors({
                              ...errors,
                              confirmPass: `${t("validate")}`,
                            });
                            isValid.current = false;
                          } else {
                            if (pass !== text.target.value) {
                              setErrors({
                                ...errors,
                                confirmPass: `${t("edit_pass_not_match")}`,
                              });
                              isValid.current = false;
                            } else {
                              setErrors({ ...errors, confirmPass: undefined });
                              isValid.current = false;
                            }
                          }
                        }}
                      />
                    </>
                  )}

                  <HStack my="25" mx="45" justifyContent={"space-between"}>
                    <button
                      className="btn-savedProfile"
                      onClick={handleUpdateProfile}
                    >
                      <Text bold color="white" fontSize={"2xl"}>
                        {t("update_profile")}
                      </Text>
                    </button>
                    <button
                      className="btn-cancelProfile"
                      onClick={() => {
                        setEditP(false);
                      }}
                    >
                      <Text bold color="white" fontSize={"2xl"}>
                        {t("cancel")}
                      </Text>
                    </button>
                  </HStack>
                </Box>
              )}
            </Center>
          </>
        ) : (
          <>
            <Box
              position="absolute"
              flexDir={"row-reverse"}
              w="100%"
              zIndex={1}
            >
              <Pressable
                onPress={() => {
                  setLoading(true);

                  signOutUser()
                  // SuccesToast(t("log_out"));

                  setTimeout(() => {
                    history.push("/home");
                  }, 1500);
                }}
              >
                <BiLogOut className="movil-icon-logOut" />
              </Pressable>
            </Box>
            <Center>
              <Pressable
                zIndex={10}
                mt="70"
                onPress={handleClick}
                onHoverIn={() => {
                  setHover(true);
                }}
                onHoverOut={() => {
                  setHover(false);
                }}
              >
                <Avatar
                  mx="50px"
                  bg="rgba(0,0,0,0.5)"
                  size="150px"
                  source={{
                    uri: user?.img,
                  }}
                />
                {hover && (
                  <Box
                    rounded={"full"}
                    w="150px"
                    position="absolute"
                    top="0"
                    left="50"
                    right="0"
                    bottom="0"
                    bg="rgba(0,0,0,0.5)"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!loadingImg ? (
                      <>
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={handleFileChange}
                        />

                        {/* <button onClick={handleClick}> */}
                        <Box justifyContent="center" alignItems="center">
                          <FcEditImage className="iconImg" />
                          <Text color="white" fontSize="18" mt="2">
                            {t("change_img")}
                          </Text>
                        </Box>

                        {/* </button> */}
                      </>
                    ) : (
                      <Spinner
                        accessibilityLabel="Loading posts"
                        color="blue.500"
                        size="25px"
                      />
                    )}
                  </Box>
                )}
              </Pressable>
              <Box mt="25">
                {/* <Text fontSize={"2xl"} mb="10px">
                  {t("profile")}
                </Text> */}
                <Text bold fontSize={"2xl"} mb="10px">
                  {user?.name} {user?.lastName}
                </Text>
                <Text fontSize={"2xl"} mb="10px">
                  {user?.email}
                </Text>
              </Box>
              <Box p="5" mb="25" shadow={8} w="85%" rounded={15}>
                <Text mb="3" bold fontSize={"xl"}>
                  {t("edit_bio")}{" "}
                </Text>
                <Text>{user?.bio}</Text>
              </Box>
              <Box>
                <button
                  className="btn-editProfile"
                  onClick={() => {
                    setEditP(true);
                  }}
                >
                  <Text bold color="white" fontSize={"2xl"}>
                    {t("editProfile")}
                  </Text>
                  <RiEdit2Line />
                </button>
              </Box>
              {editP && (
                <Box w="80%" my="35">
                  <TextField
                    error={errors.name ? true : false}
                    id="filled-basic"
                    label={t("auth_name")}
                    variant="filled"
                    value={name}
                    helperText={errors.name ? errors.name : ""}
                    onChange={(text) => {
                      setName(text.target.value);
                      if (text.target.value.length <= 0) {
                        setErrors({ ...errors, name: `${t("validate")}` });
                        isValid.current = false;
                      } else {
                        setErrors({ ...errors, name: undefined });
                        isValid.current = false;
                      }
                    }}
                  />
                  <TextField
                    error={errors.lastName ? true : false}
                    id="filled-basic"
                    label={t("auth_lastName")}
                    variant="filled"
                    value={lastName}
                    helperText={errors.lastName ? errors.lastName : ""}
                    onChange={(text) => {
                      setLastName(text.target.value);
                      if (text.target.value.length <= 0) {
                        setErrors({ ...errors, lastName: `${t("validate")}` });
                        isValid.current = false;
                      } else {
                        setErrors({ ...errors, lastName: undefined });
                        isValid.current = false;
                      }
                    }}
                  />
                  <TextField
                    // error={errors.lastName ? true : false}
                    id="filled-basic"
                    label={t("edit_bio")}
                    variant="filled"
                    multiline
                    value={desc}
                    // helperText={errors.lastName ? errors.lastName : ""}
                    onChange={(text) => {
                      setDesc(text.target.value);
                      // if (text.target.value.length <= 0) {
                      //   setErrors({ ...errors, lastName: `${t("validate")}` });
                      //   isValid.current = false;
                      // } else {
                      //   setErrors({ ...errors, lastName: undefined });
                      //   isValid.current = false;
                      // }
                    }}
                  />
                  <Button
                    _hover={
                      updateEmail ? { bg: "red.500" } : { bg: "gray.600" }
                    }
                    bg={updateEmail ? "red.600" : "black"}
                    mt="2"
                    onPress={() => {
                      setUpdateEmail(!updateEmail);
                    }}
                  >
                    <Text fontSize={"xl"} color="white">
                      {t("profile_updateEmail")}
                    </Text>
                  </Button>
                  {updateEmail && (
                    <>
                      <TextField
                        error={errors.email ? true : false}
                        id="filled-basic"
                        label={t("edit_email")}
                        variant="filled"
                        value={email}
                        helperText={errors.email ? errors.email : ""}
                        onChange={(text) => {
                          setEmail(text.target.value);
                          if (text.target.value.length <= 0) {
                            setErrors({ ...errors, email: `${t("validate")}` });
                            isValid.current = false;
                          } else {
                            setErrors({ ...errors, email: undefined });
                            isValid.current = false;
                          }
                        }}
                      />
                      <TextField
                        error={errors.passAux ? true : false}
                        id="filled-basic"
                        label={t("profile_enter_pass")}
                        variant="filled"
                        value={passAux}
                        helperText={errors.passAux ? errors.passAux : ""}
                        onChange={(text) => {
                          setPassAux(text.target.value);
                          if (text.target.value.length <= 0) {
                            setErrors({
                              ...errors,
                              passAux: `${t("validate")}`,
                            });
                            isValid.current = false;
                          } else {
                            setErrors({ ...errors, passAux: undefined });
                            isValid.current = false;
                          }
                        }}
                      />
                    </>
                  )}
                  <Button
                    _hover={updatePass ? { bg: "red.500" } : { bg: "gray.600" }}
                    bg={updatePass ? "red.600" : "black"}
                    my="2"
                    onPress={() => {
                      setUpdatePass(!updatePass);
                    }}
                  >
                    <Text fontSize={"xl"} color="white">
                      {t("profile_updatePass")}
                    </Text>
                  </Button>
                  {updatePass && (
                    <>
                      <TextField
                        // error={errors.pass ? true : false}
                        id="filled-basic"
                        label={t("profile_oldPass")}
                        variant="filled"
                        value={oldPass}
                        helperText={t("profile_labelOldPass")}
                        onChange={(text) => {
                          setOldPass(text.target.value);
                          // if (text.target.value.length <= 0) {
                          //   setErrors({ ...errors, pass: `${t("validate")}` });
                          //   isValid.current = false;
                          // } else {
                          //   setErrors({ ...errors, pass: undefined });
                          //   isValid.current = false;
                          // }
                        }}
                      />
                      <TextField
                        error={errors.pass ? true : false}
                        id="filled-basic"
                        label={t("edit_pass")}
                        variant="filled"
                        value={pass}
                        helperText={errors.pass ? errors.pass : ""}
                        onChange={(text) => {
                          setPass(text.target.value);
                          if (text.target.value.length <= 0) {
                            setErrors({ ...errors, pass: `${t("validate")}` });
                            isValid.current = false;
                          } else {
                            setErrors({ ...errors, pass: undefined });
                            isValid.current = false;
                          }
                        }}
                      />
                      <TextField
                        error={errors.confirmPass ? true : false}
                        id="filled-basic"
                        label={t("edit_confirm_pass")}
                        variant="filled"
                        value={confirmPass}
                        helperText={
                          errors.confirmPass ? errors.confirmPass : ""
                        }
                        onChange={(text) => {
                          setConfirmPass(text.target.value);
                    

                          if (text.target.value.length <= 0) {
                            setErrors({
                              ...errors,
                              confirmPass: `${t("validate")}`,
                            });
                            isValid.current = false;
                          } else {
                            if (pass !== text.target.value) {
                              setErrors({
                                ...errors,
                                confirmPass: `${t("edit_pass_not_match")}`,
                              });
                              isValid.current = false;
                            } else {
                              setErrors({ ...errors, confirmPass: undefined });
                              isValid.current = false;
                            }
                          }
                        }}
                      />
                    </>
                  )}

                  <HStack my="25" justifyContent={"space-between"}>
                    <button
                      className="btn-savedProfile"
                      onClick={handleUpdateProfile}
                    >
                      <Text bold color="white" fontSize={"2xl"}>
                        {t("update_profile")}
                      </Text>
                    </button>
                    <button
                      className="btn-cancelProfile"
                      onClick={() => {
                        setEditP(false);
                      }}
                    >
                      <Text bold color="white" fontSize={"2xl"}>
                        {t("cancel")}
                      </Text>
                    </button>
                  </HStack>
                </Box>
              )}
            </Center>
          </>
        )
      ) : (
        <Center w="100%" h="480" justifyItems={"center"}>
          <CircularProgress
            className="spinner-logout"
            size={150}
            // sx={{
            //   color: "gray",
            // }}
          />
          <Text mt="50" fontSize={"3xl"} bold>
            {t("log_out")}...
          </Text>
        </Center>
      )}
    </>
  );
}
