import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Box, Center, NativeBaseProvider, Spinner, Text } from "native-base";
import "./index.css";

// extend the theme
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <Suspense
        fallback={
          <Center h="500px" alignItems="center">
            <Text fontSize={"2xl"}>
              CARGANDO <br />
              CONTENIDOS ....
            </Text>
            <Spinner color={"pink.500"} size="lg" mt="35" />
          </Center>
        }
      >
        <div className="main-container">
          <App />
        </div>
      </Suspense>
    </NativeBaseProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
