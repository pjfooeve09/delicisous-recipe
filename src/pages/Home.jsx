import React, { Component } from "react";
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Veggie />
        <Popular />
      </div>
    );
  }
}

export default Home;
