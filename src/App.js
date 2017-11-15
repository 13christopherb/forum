import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import Posts from "./components/Posts.js";
import NewPost from "./components/NewPost";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Posts}/>
                <Route exact path="/new" component={NewPost}/>
            </div>
        );
    }
}

export default App;
