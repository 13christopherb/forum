import React, {Component} from "react";
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router'
import uuidv4 from 'uuid'
import {addPost} from '../actions/actions'
import * as ForumAPI from '../utils/ForumAPI.js'

class NewPost extends React.Component {

    state = {
        value: {},
        created: false
    };

    /**
     * Saves the input values to the state to submit later
     * when button is pressed
     * @param e Input change event
     */
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * Posts the input values saved in the state
     * to the server.
     * @param e On click event
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            id: uuidv4(),
            timestamp: Date.now(),
            title: this.state['title'],
            body: this.state['body'],
            author: this.state['author'],
            category: 'react'
        };
        ForumAPI.addPost(post).then(() => {
            this.props.dispatch(addPost(post));
            this.setState({
                created: true,
                id: post.id
            });
        });
    }

    render() {
        return (
            <div>
                <Route exact path="/new" render={() => (
                    this.state.created ? (
                        <Redirect to={'/posts/' + this.state.id}/>
                    ) : <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Title
                                <input
                                    name="title"
                                    onChange={this.handleInputChange}></input>
                            </label>
                            <label>
                                Author
                                <input
                                    name="author"
                                    onChange={this.handleInputChange}></input>
                            </label>
                            <label>
                                Body
                                <textarea
                                    name="body"
                                    value={this.state.body} onChange={this.handleInputChange}></textarea>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}/>
            </div>
        )
    }
}

export default connect()(NewPost)