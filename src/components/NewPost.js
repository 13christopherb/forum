import React, { Component } from "react";
import { connect } from 'react-redux';
import $ from "jquery"
import uuidv4 from 'uuid'
import { addPost } from '../actions/actions'

class NewPost extends React.Component {

    state = {
        value: {}
    };

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

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
        fetch(`http://localhost:3001/posts`, {
            method: 'POST',
            headers: {
                Authorization: 'whatever-you-want',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        /*
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3001/posts',
            data: JSON.stringify(post),
            headers: { 'Authorization': 'key',
                'Content-Type': 'application/json'}
        }).then(() => {
            this.props.dispatch(addPost(post));
        });*/
    }

    render() {
        return(
            <div>
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
        )
    }
}

export default connect()(NewPost)