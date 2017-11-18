import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import uuidv4 from 'uuid';
import {editPost} from '../actions/actions';
import * as ForumAPI from '../utils/ForumAPI.js';
import Comment from './Comment.js';
import EditPost from './EditPost.js';

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

    editingPost = (e) => {
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
    editPost = (post) => {
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
                            <button onClick={this.editingPost} className="btn btn-primary">Edit post</button>
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
                </div>) : (
                    <div>
                        <EditPost editPost={this.editPost} body={this.state.body} title={this.state.title} />
                    </div>

                )}
                <section>{comments}</section>
            </div>
        )
    }
}

export default connect()(Post)