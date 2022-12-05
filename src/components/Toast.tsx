import { Box } from "native-base";
import React from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";

export const SuccesToast = (message: string) => {
  toast.success(`${message}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,  
    theme: "dark",
  });
};

export const ErrorToast = (message: string) => {
  toast.error(`${message}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const ToastC = () => {
  return (
    // <Box zIndex={20} mt='75'>
    <ToastContainer
      transition={Zoom}
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    // </Box>
  );
};
