import * as React from "react";

import Modal from "@mui/material/Modal";
import { Button, Text, Modal as ModalNative, HStack } from "native-base";
import Box from "@mui/material/Box";
interface IModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  handleDeteleProduct: () => void;
}

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

export default function ModalConfirm({
  showModal,
  setShowModal,
  handleDeteleProduct,
}: IModalProps) {
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalNative.CloseButton onPress={handleClose} />

          <Text fontSize={"md"}>¿Esta Seguro de eliminar el Producto?</Text>
          <Text fontSize={"md"}>Esta acción no se puede deshacer</Text>
          <HStack justifyContent={"space-around"} mt="25">
            <Button
              bg="red.400"
              _hover={{
                bg: "red.600",
              }}
              onPress={() => {
                handleDeteleProduct();
                handleClose();
              }}
            >
              <Text color="white" fontSize={"xl"}>
                Eliminar
              </Text>
            </Button>
            <Button
              bg="blue.500"
              _hover={{
                bg: "blue.700",
              }}
              onPress={handleClose}
            >
              <Text color="white" fontSize={"xl"}>
                Cancelar
              </Text>
            </Button>
          </HStack>
        </Box>
      </Modal>
    </>
  );
}
