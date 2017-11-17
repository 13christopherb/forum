import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {editPost} from '../actions/actions'
import * as ForumAPI from '../utils/ForumAPI.js'

class Post extends React.Component {

    state = {
        post: {},
        title: '',
        body: '',
        editing: false
    }

    componentDidMount() {
        ForumAPI.getPost(this.props.match.params.id).then(data => {
                this.setState({
                    post: data,
                    title: data.title,
                    body: data.body
                });
            }
        );
    }

    editPost = (e) => {
        this.setState({editing: !this.state.editing})
    }

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
            ...this.state.post,
            ['title']: this.state.title,
            ['body']: this.state.body
        }
        ForumAPI.addPost(post).then(() => {
            this.props.dispatch(editPost(post));
            this.setState({
                post: post,
                editing: false
            });
        });
    }

    render() {
        return (
            <div>
                {!this.state.editing ? (
                <div>
                    <section className="row">
                        <div className="col-md-5">
                            <h3>{this.state.post.title}</h3>
                            <p><Link to={'/u/' + this.state.post.author}>{this.state.post.author}</Link></p>
                        </div>
                        <div className="col-md-3 offset-md-4">
                            <button onClick={this.editPost} className="btn btn-primary">Edit post</button>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col-md-8 offset-md-2">
                            <article className="jumbotron">
                                {this.state.post.body}
                            </article>
                        </div>
                    </section>
                </div>) : (
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Title
                            <input
                                name="title"
                                value={this.state.title}
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

                )}
            </div>
        )
    }
}

export default connect()(Post)