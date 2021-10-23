import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

//components
import Login from "./Components/Login/Login";
import Category from "./Components/SuperAdmin/Category/Category";
import SubCategory from "./Components/SuperAdmin/Category/SubCategory";
import Home from "./Components/SuperAdmin/Home/Home";
import Subscription from "./Components/SuperAdmin/Subscription/Subscription";
import SubscriptionPoint from "./Components/SuperAdmin/Subscription/SubscriptionPoint";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/subscription" component={Subscription} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/subscription-point" component={SubscriptionPoint} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/sub-category" component={SubCategory} />
      </Switch>
    </>
  );
}

export default App;
