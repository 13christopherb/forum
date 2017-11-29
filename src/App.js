import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router';
import Posts from './components/index/Posts.js';
import NewPost from './components/post/NewPost';
import Post from './components/post/Post.js';
import NotFound from './components/NotFound.js';
import Author from './components/Author.js';

class App extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Switch>
                    <Route exact path="/" component={Posts}/>
                    <Route exact path="/u/:author" component={Author}/>
                    <Route exact path="/new" component={NewPost}/>
                    <Route exact path="/:category/:id/:edit?" component={Post}/>
                    <Route exact path="/:category" component={Posts}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
