// import logo from "./logo.svg";
// import {
//   Box,
//   Image,
//   Text,
//   Link,
//   HStack,
//   Heading,
//   Switch,
//   useColorMode,
//   VStack,
//   Button,
//   Pressable,
//   useToast,
// } from "native-base";

// function App() {
//   const { colorMode } = useColorMode();
//   const toast = useToast();

//   return (
//     <Box
//       bg={colorMode === "light" ? "coolGray.50" : "coolGray.900"}
//       minHeight="100vh"
//       justifyContent="center"
//       px={4}
//     >
//       <VStack space={5} alignItems="center">
//         <Image
//           source={{ uri: logo }}
//           resizeMode="contain"
//           size={220}
//           alt="NativeBase logo"
//         />
//         <Heading size="lg">Welcome to NativeBase</Heading>
//         <Text>
//           Edit{" "}
//           <Box
//             _text={{
//               fontFamily: "monospace",
//               fontSize: "sm",
//             }}
//             px={2}
//             py={1}
//             _dark={{ bg: "blueGray.800" }}
//             _light={{ bg: "blueGray.200" }}
//           >
//             src/pages/index.js
//           </Box>{" "}
//           and save to reload.
//         </Text>
//         <Link href="https://docs.nativebase.io" isExternal>
//           <Text color="primary.500" underline fontSize={"xl"}>
//             Learn NativeBase
//           </Text>
//         </Link>
//         <Pressable
//           onPress={() => {
//             console.log("Button pressed");
//             toast.show({
//               description: "Button pressed",
//             });
//           }}
//         >
//           <Text>HOla soy un buttoon</Text>
//         </Pressable>
//         <ToggleDarkMode />
//       </VStack>
//     </Box>
//   );
// }

// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2}>
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === "light"}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }

// export default App;

import React from "react";
import { NativeBaseProvider, Box, Button, Text } from "native-base";
import MainHeader from "./components/MainHeader";
import Login from "./pages/auth/Login";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Register from "./pages/auth/Register";
import HomePage from "./pages/home/Home";
import { toast, ToastContainer } from "react-toastify";
import MainHome from "./pages/home/MainHome";
import ProductDisplay from "./pages/home/ProductDisplay";

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

export default function App() {
  return (
    <React.Fragment>
      <Box w="100%" position="sticky" top={"0px"} zIndex={10}>
        <MainHeader />
      </Box>

      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={HomePage} />
          {/* <Route path="/home/:id" children={MainHome} /> */}
          {/* <Route path="/home/scanner_cat" component={Login} /> */}
          <Route path="/category/:id" component={MainHome} />
          <Route path="/product/:uid" component={ProductDisplay} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
