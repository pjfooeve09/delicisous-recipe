import React, { Component } from "react";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Cuisine from "./Cuisine";

class Pages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      //path is the url, element is the component we assign to (what page will be rendered), :type is a symbol we use for type of food
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
      </Routes>
    );
  }
}

export default Pages;
