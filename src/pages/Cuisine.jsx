import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//useParams allow us to pull out keyword from URL
import { Link, useParams } from "react-router-dom";

const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

class Cuisine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: [],
    };
  }

  componentDidMount() {
    const fetchData = (name) => {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ cuisine: data.results });
        });
    };
    fetchData(this.props.params.type);
    console.log(this.props);
  }

  render() {
    return <div>{<p>{this.props.match}</p>}</div>;
  }
}

export default withParams(Cuisine);
