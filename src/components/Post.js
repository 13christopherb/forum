import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from "underscore"
import uuidv4 from 'uuid';
import {addComment, editPost, gotPosts, gotComments} from '../actions/actions';
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
            let posts = [];
            posts.push(data);
            this.props.dispatch(gotPosts(posts));
            }
        );
        ForumAPI.getCommentsFromPost(this.props.match.params.id).then(data => {
            this.props.dispatch(gotComments(data));
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
        this.props.dispatch(addComment(comment));
        this.setState({
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
        ForumAPI.editPost(post)
        this.props.dispatch(editPost(post));
        this.setState({
            editing: false
        });
    }

    render() {
        let comments = [];
        for (var comment of this.props.comments) {
            comments.push(<Comment key={comment.id} author={comment.author} body={comment.body} id={comment.id}/>)
        }
            return (
                <div>
                    {!this.state.editing ? (
                        <div>
                            <section className="row">
                                <div className="col-md-5">
                                    <h3>{this.props.title}</h3>
                                    <p><Link to={'/u/' + this.props.post.author}>{this.props.post.author}</Link></p>
                                </div>
                                <div className="col-md-3 offset-md-4">
                                    <button onClick={this.editingPost} className="btn btn-primary">Edit post</button>
                                </div>
                            </section>
                            <section className="row">
                                <div className="col-md-8 offset-md-2">
                                    <article className="jumbotron">
                                        {this.props.post.body}
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
                                                onChange={this.handleCommentChange}/>
                                        </label>
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            </section>
                        </div>) : (
                        <div>
                            <EditPost editPost={this.editPost} post={this.props.post}/>
                        </div>

                    )}
                    <section>{comments}</section>
                </div>
            )
    }
}

function mapStateToProps({posts, comments}, ownProps) {
    console.log(comments);
    let post =_.find(posts.posts, (p) => {
       return p.id === ownProps.match.params.id
    });
    if (post) {
        return {
            post: post,
            comments: comments.comments
        }
    } else {
        return {
            post: {},
            comments: comments.comments
        }
    }
}

export default connect(
    mapStateToProps
)(Post)