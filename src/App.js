import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import Posts from "./Posts.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Posts />
      </div>
    );
  }
}

export default App;
