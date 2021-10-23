import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

//components
import Login from './Components/Login/Login';
import Home from './Components/SuperAdmin/Home/Home';
import Subscription from './Components/SuperAdmin/Subscription/Subscription';
import SubscriptionPoint from './Components/SuperAdmin/Subscription/SubscriptionPoint';

function App() {
  return (
    <>
     <Switch>
       <Route exact path="/" component={Login}/>
       <Route exact path="/subscription" component={Subscription}/>
       <Route exact path="/home" component={Home}/>
       <Route exact path="/subscription-point" component={SubscriptionPoint}/>
     </Switch>
    </>
  );
}

export default App;
