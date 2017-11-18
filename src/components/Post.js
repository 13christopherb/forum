import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import uuidv4 from 'uuid';
import {editPost} from '../actions/actions';
import * as ForumAPI from '../utils/ForumAPI.js';
import Comment from './Comment.js';

class Post extends React.Component {

    state = {
        post: {},
        comments: [],
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
        ForumAPI.getCommentsFromPost(this.props.match.params.id).then(data => {
           this.setState({
              comments: data
           });
        });
    }

    editPost = (e) => {
        this.setState({editing: !this.state.editing})
    }

    handleCommentChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
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

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            id: uuidv4(),
            author: this.state.commentAuthor,
            body: this.state.commentBody,
            parentId: this.state.post.id,
        };
        ForumAPI.addComment(comment);
        let comments = [...this.state.comments];
        comments.push(comment);
        this.setState({
            comments: comments,
            commentAuthor: '',
            commentBody: '',
        })
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
        let comments = [];
        for (var comment of this.state.comments){
            comments.push(<Comment key={comment.id} author={comment.author} body={comment.body} id={comment.id}/>)
        }
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
                    <section className="row">
                        <div className="col-md-6"></div>
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
                <section className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.handleCommentSubmit}>
                            <label>
                                Comment
                                <textarea
                                    name="commentBody"
                                    value={this.state.commentBody}
                                    onChange={this.handleCommentChange}></textarea>
                            </label>
                            <label>
                                Author
                                <input
                                    name="commentAuthor"
                                    value={this.state.commentAuthor}
                                    onChange={this.handleCommentChange} />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </section>
                <section>{comments}</section>
            </div>
        )
    }
}

export default connect()(Post)