import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import {
  FormControl,
  Input,
  Button,
  Text,
  Modal as ModalNative,
  VStack,
} from "native-base";
import { useTranslation } from "react-i18next";
import { sendEmailToResetPassword } from "../../services/auth";
import { ErrorToast, SuccesToast, ToastC } from "../../components/Toast";

interface IResetProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ResetPasswordByEmail = ({
  modalVisible,
  setModalVisible,
}: IResetProps) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const isValid = useRef<boolean | null>(false);
  const handleClose = () => setModalVisible(false);

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});
  const auth_email: string = t("auth_email");

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmitResetPass = () => {
    sendEmailToResetPassword(email)
      .then((res) => {
        console.log("reset success", res);
        SuccesToast(t("reset_success"));
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((err) => {
        console.log("reset error", err);
        ErrorToast(t("reset_error"));
      });
  };

  return (
    <>
      <ToastC />
      <Modal
        open={modalVisible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalNative.CloseButton onPress={handleClose} />
          <VStack mt="25">
            <Text bold fontSize="2xl" mb="15">
              {t("reset_pass")}
            </Text>
            <Text fontSize="xl">{t("reset_label")}</Text>
          </VStack>

          <FormControl isRequired isInvalid={errors.email != undefined}>
            <Input
              mt="25"
              size="2xl"
              placeholder={auth_email}
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
              placeholderTextColor="black"
            />
            {errors.email != undefined ? (
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button
            disabled={isValid.current == false}
            onPress={handleSubmitResetPass}
            mt="25"
            style={isValid.current == false ? { opacity: 0.5 } : { opacity: 1 }}
            bg="blue.500"
            _hover={{ bg: "#806b53" }}
          >
            <Text fontSize="2xl">{t("reset_send")}</Text>
          </Button>
        </Box>
      </Modal>
    </>
  );
};
