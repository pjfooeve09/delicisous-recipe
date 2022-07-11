import React, { Component } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    const check = localStorage.getItem("popular");
    if (check) {
      this.setState({ recipes: JSON.parse(check) });
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ recipes: data.recipes });
          localStorage.setItem("popular", JSON.stringify(data.recipes));
        });
    }
  }
  render() {
    console.log(this.state.recipes);
    return (
      <Wrapper>
        <h2>Popular Recipes</h2>
        <Splide
          options={{
            perPage: 2,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {this.state.recipes.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 4rem 4rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
