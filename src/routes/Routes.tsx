import { Box, HStack, Text } from "native-base";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomeAdmin from "../admin/pages/Home/HomeAdmin";
import MainHeader from "../components/MainHeader";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HomePage from "../pages/home/Home";
import MainHome from "../pages/home/MainHome";
import ProductDisplay from "../pages/home/ProductDisplay";
import ProfileDisplay from "../pages/profile/ProfileDisplay";

export const RoutesClient = () => (
  <Box h="full">
    <Router>
      <MainHeader />
      <Switch>
        <Box zIndex={-1} bg="#8a2be2">
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
          <Route path="/profile" component={ProfileDisplay} />
        </Box>
      </Switch>
    </Router>
  </Box>
);

export const RoutesAdmin = () => (
  <Box h="full">
    <Router>
      <MainHeader />
      <Switch>
        <Box zIndex={-1}>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={HomeAdmin} />

          <Route path="/category/:id" component={MainHome} />
          <Route path="/product/:uid" component={ProductDisplay} />
          <Route path="/profile" component={ProfileDisplay} />
        </Box>
        {/* <Box bg="red.500">
        <Text fontSize="2xl">This is an admin text pls word</Text>
       <HomeAdmin/>
      </Box> */}
      </Switch>
    </Router>
  </Box>
);
