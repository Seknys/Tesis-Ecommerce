  import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Box, NativeBaseProvider, Text } from "native-base";
import "./index.css";

// extend the theme
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <Suspense fallback={<Text bg="black">Loading??????</Text>}>
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
