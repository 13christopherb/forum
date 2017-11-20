import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router';
import Posts from './components/Posts.js';
import NewPost from './components/NewPost';
import Post from './components/Post.js';
import Header from './components/Header.js';

class App extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <Route exact path="/" component={Posts}/>
                <Route exact path="/c/:category" component={Posts}/>
                <Route exact path="/new" component={NewPost}/>
                <Route exact path="/posts/:id" component={Post}/>
            </div>
        );
    }
}

export default App;
