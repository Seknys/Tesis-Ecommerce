import { Box, HStack, Text } from "native-base";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AddAccountAnalist } from "../admin/pages/AddAccountAnalist/AddAccountAnalist";
import AddProduct from "../admin/pages/AddProduct/AddProduct";
import HomeAdmin from "../admin/pages/Home/HomeAdmin";
import { SearchHomeADMIN } from "../admin/pages/Home/SearchAdmin";
import { AnalysisxCat } from "../analyst/pages/AnalysisxCategory/AnalysisxCat";
import { AnalysisxProduct } from "../analyst/pages/AnalysisxProduct/AnalysisProduct";
import { HomeAnalyst } from "../analyst/pages/home/HomeAnalyst";
import MainHeader from "../components/MainHeader";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { CartDisplay } from "../pages/cart/CartDisplay";
import { Checkout } from "../pages/cart/Checkout";
import SpecialCategory from "../pages/home/DisplaySpecialCategory";

import HomePage from "../pages/home/Home";
import MainHome from "../pages/home/MainHome";
import ProductDisplay from "../pages/home/ProductDisplay";
import { SearchHome } from "../pages/home/SearchHome";
import ProfileDisplay from "../pages/profile/ProfileDisplay";
import { ShoppingHistory } from "../pages/profile/ShoppingHistory";

export const RoutesClient = () => (
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
          <Route path="/home" component={HomePage} />
          {/* <Route path="/home/:id" children={MainHome} /> */}
          {/* <Route path="/home/scanner_cat" component={Login} /> */}
          <Route path="/category/:id" component={MainHome} />
          <Route path="/more-views/:value" component={MainHome} />
          <Route path="/more-buy/:value" component={SpecialCategory} />
          <Route path="/product/:uid" component={ProductDisplay} />
          <Route path="/profile" component={ProfileDisplay} />
          <Route path="/cart/details" component={CartDisplay} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/shopping-history" component={ShoppingHistory} />
          <Route path="/search/:value" component={SearchHome} />
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
          {/* 
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */}
          <Route path="/home" component={HomeAdmin} />

          <Route path="/product/:uid" component={ProductDisplay} />
          <Route path="/profile" component={ProfileDisplay} />
          <Route path="/admin/add-product" component={AddProduct} />
          <Route path="/admin/edit-product/:uid" component={AddProduct} />
          <Route path="/admin/add-account" component={AddAccountAnalist} />
          <Route path="/admin/products/:admin" component={MainHome} />
          <Route path="/search/:value" component={SearchHomeADMIN} />
        </Box>
        {/* <Box bg="red.500">
        <Text fontSize="2xl">This is an admin text pls word</Text>
       <HomeAdmin/>
      </Box> */}
      </Switch>
    </Router>
  </Box>
);

export const RoutesAnalyst = () => (
  <Box h="full">
    <Router>
      <MainHeader />
      <Switch>
        <Box zIndex={-1}>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          {/* <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */}
          <Route path="/home" component={HomeAnalyst} />

          <Route path="/category/:id" component={MainHome} />

          <Route path="/profile" component={ProfileDisplay} />
          <Route path="/analyst/categories" component={AnalysisxCat} />
          <Route path="/analyst/products/:analyst" component={MainHome} />
          <Route path="/analyst/product/:uid" component={AnalysisxProduct} />
        </Box>
        {/* <Box bg="red.500">
        <Text fontSize="2xl">This is an admin text pls word</Text>
       <HomeAdmin/>
      </Box> */}
      </Switch>
    </Router>
  </Box>
);
