import React, { Component } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Searched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedRecipes: [],
    };
  }

  componentDidMount() {
    this.getSearched(this.searchValue());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.search !== this.searchValue()) {
      this.getSearched(this.searchValue());
    }
  }

  getSearched(name) {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ searchedRecipes: data.results });
      });
  }

  searchValue() {
    const { params } = this.props;
    return params.search;
  }

  render() {
    const { searchedRecipes } = this.state;
    return (
      <Grid>
        {searchedRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <NavLink to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt="" />
              <h4>{recipe.title}</h4>
            </NavLink>
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
  margin-top: -20rem;
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
  return (props) => <Component {...props} params={useParams()} />;
};

export default withParams(Searched);
