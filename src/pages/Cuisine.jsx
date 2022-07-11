import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//useParams allow us to pull out keyword from URL
import { Link, useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

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
    const getCuisine = (name) => {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ cuisine: data.results });
        });
    };
    getCuisine(this.props.params.type);
  }

  render() {
    return (
      <Grid>
        {this.state.cuisine.map((recipe) => (
          <Card key={recipe.id}>
            <img src={recipe.image} alt="" />
            <h4>{recipe.title}</h4>
          </Card>
        ))}
      </Grid>
    );
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default withParams(Cuisine);
