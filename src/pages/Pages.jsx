import React, { Component } from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import { Route, Routes } from "react-router-dom";

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
        <Route path="/searched/:search" element={<Searched />} />
      </Routes>
    );
  }
}

export default Pages;
