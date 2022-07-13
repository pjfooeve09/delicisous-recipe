import React, { Component } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.navigate("/searched/" + this.state.value);
  };

  //handleChange updates the value of setState
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <FormStyle onSubmit={this.handleSubmit}>
        <div>
          <FaSearch></FaSearch>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.value}
          />
        </div>
      </FormStyle>
    );
  }
}

const FormStyle = styled.form`
  margin: 0rem 1rem;
  position: relative;
  div {
    width: 100%;
    position: relative;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export const APPWithRouter = (props) => {
  const navigate = useNavigate();
  return <Search navigate={navigate}></Search>;
};

export default Search;
