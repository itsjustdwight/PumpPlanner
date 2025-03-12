import React from "react";
//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
import HomeScreen from "./HomeScreen";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";
import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <Switch>
          <Route exact path="/" component={HomeScreen}/>
          <Route exact path="/login" component={ProductScreen}/>
          <Route exact path="/cart" component={CartScreen}/>
        </Switch>
        )
}

export default App