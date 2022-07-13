import React, { Component } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

class Cuisine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: [],
    };
  }

  getCuisine(name) {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ cuisine: data.results });
      });
  }

  cuisineType() {
    const { params } = this.props;
    return params.type;
  }

  componentDidMount() {
    this.getCuisine(this.cuisineType());
  }

  componentDidUpdate(prevProps) {
    //in order to update setSate in componentDidUpdate, we need to use a conditional statement otherwise it will end up in a loop
    if (prevProps.params.type !== this.cuisineType()) {
      this.getCuisine(this.cuisineType());
    }
  }

  render() {
    const { cuisine } = this.state;
    return (
      <Grid>
        {cuisine.map((recipe) => (
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

const withParams = (Component) => {
  //useParams allow us to pull out keyword from URL. We are using it as a prop
  return (props) => <Component {...props} params={useParams()} />;
};

export default withParams(Cuisine);
