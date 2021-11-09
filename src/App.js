import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

//components
import Login from "./Components/Login/Login";
import AddEmployee from "./Components/SuperAdmin/AddEmployee/AddEmployee";
import EmployeeList from "./Components/SuperAdmin/AddEmployee/EmployeeList";
import Category from "./Components/SuperAdmin/Category/Category";
import SubCategory from "./Components/SuperAdmin/Category/SubCategory";
import CreateGroup from "./Components/SuperAdmin/CreateGroup/CreateGroup";
import Home from "./Components/SuperAdmin/Home/Home";
import Subscription from "./Components/SuperAdmin/Subscription/Subscription";
import SubscriptionMonth from "./Components/SuperAdmin/Subscription/SubscriptionMonth";
import SubscriptionPoint from "./Components/SuperAdmin/Subscription/SubscriptionPoint";

//for notification
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import NewsType from "./Components/SuperAdmin/NewsType/NewsType";
import PostNews from "./Components/SuperAdmin/NewsType/PostNews";
import Statistics from "./Components/SuperAdmin/Statistics/Statistics";
import StatisticsUser from "./Components/SuperAdmin/Statistics/StatisticsUser";
import Productshow from "./Components/SuperAdmin/Productshow/Productshow";

function App() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/subscription" component={Subscription} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/subscription-point" component={SubscriptionPoint} />
        <Route exact path="/subscription-month" component={SubscriptionMonth} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/sub-category" component={SubCategory} />
        <Route exact path="/create-group" component={CreateGroup} />
        <Route exact path="/add-employee" component={AddEmployee} />
        <Route exact path="/employee-list" component={EmployeeList} />
        <Route exact path="/news-type" component={NewsType} />
        <Route exact path="/add-new-news" component={PostNews} />
        <Route exact path="/statistics" component={Statistics} />
        <Route exact path="/statistics-users" component={StatisticsUser} />
        <Route exact path="/product-review" component={Productshow} />
      </Switch>
    </>
  );
}

export default App;
