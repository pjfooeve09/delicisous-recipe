import React, {Component} from 'react';
import Category from './components/Category';
import Pages from './pages/Pages';
import {BrowserRouter} from 'react-router-dom';
import {APPWithRouter} from "./components/Search"

class App extends Component {
  render(){
    return (//we need to use BrowserRouter because we are using NavLink in Catgory.jsx and Route in Pages.jsx
      <div className="App">
        <BrowserRouter>
          <APPWithRouter />
          <Category />
          <Pages />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
