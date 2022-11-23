import React from "react";
import { NativeBaseProvider, Box, Button } from "native-base";
import MainHeader from "./components/MainHeader";
import Login from "./pages/auth/Login";
import {theme} from './theme'


export default function App() {
  return (
    <NativeBaseProvider theme={theme} >
      <MainHeader />
      <Login/>
    </NativeBaseProvider>
  );
}
