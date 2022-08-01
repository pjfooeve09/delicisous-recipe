import styled from "styled-components";
import { useParams } from "react-router-dom";

import React, { Component } from "react";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      activeTab: "instructions",
    };
  }

  componentDidMount() {
    this.fetchDetails(this.recipeId());
  }

  fetchDetails() {
    const { params } = this.props;
    fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ details: data });
      });
  }

  recipeId() {
    const { params } = this.props;
    return params.id;
  }

  render() {
    const { details } = this.state;
    const { activeTab } = this.state;
    return (
      <DetailWrapper>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt="" />
        </div>
        <Info>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => this.setState({ activeTab: "instructions" })}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => this.setState({ activeTab: "ingredients" })}
          >
            Ingredients
          </Button>
          {activeTab === "instructions" && (
            <div>
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients &&
                details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    );
  }
}

const DetailWrapper = styled.div`
  margin-top: -23rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  h3 {
    margin-top: 1rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 1rem;
  font-weight: 600;
`;
const Info = styled.div`
  margin-left: 10rem;
`;

const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

export default withParams(Recipe);
