import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Route, Redirect} from 'react-router';
import _ from "underscore"
import uuidv4 from 'uuid';
import {addComment, editPost, gotPosts, gotComments, deletePost, deleteComment, sortComments} from '../actions/actions';
import * as ForumAPI from '../utils/ForumAPI.js';
import Comment from './Comment.js';
import EditPost from './EditPost.js';
import VoteDisplay from './VoteDisplay.js';

class Post extends React.Component {

    state = {
        post: {},
        comments: [],
        commentAuthor: '',
        commentBody: '',
        editing: this.props.editing,
        voteValue: 0,
        deleted: false
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
            this.props.dispatch(sortComments('top'));
        });
        if (this.props.match.params.edit) {
            this.setState({
                editing: true
            });
        }
    }

    deleteChildComment = (comment) => {
        ForumAPI.deleteComment(comment)
        this.props.dispatch(deleteComment(comment));
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
            parentId: this.props.post.id,
            voteScore: 1,
        };
        ForumAPI.addComment(comment);
        this.props.dispatch(addComment(comment));
        this.setState({
            commentAuthor: '',
            commentBody: '',
        })
    }

    deletePost = () => {
        ForumAPI.deletePost(this.props.post.id)
        this.props.dispatch(deletePost(this.props.post));
        this.setState({
            deleted: true
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

    sort = (e) => {
        this.props.dispatch(sortComments(e.target.value))
    }

    render() {
        let comments = [];
        for (var comment of this.props.comments) {
            comments.push(<Comment key={comment.id} delete={this.deleteChildComment} comment={comment}/>)
        }
        return (
            <div>
                <Route path="/c/:category/:id/:edit?" render={() => (
                    this.state.deleted ? (
                        <Redirect to="/"/>
                    ) : (<div>
                        {!this.props.post.category} (
                        <Redirect to="/404"/>
                        ) : (
                        {!this.state.editing ? (
                            <div>
                                {/* Post */}
                                <section className="row">
                                    <div className="col-md-5">
                                        <VoteDisplay post={this.props.post} type="post"/>
                                        <h2>{this.props.post.title}</h2>
                                        <p><Link to={'/u/' + this.props.post.author}>{this.props.post.author}</Link></p>
                                    </div>
                                    <div className="col-md-1 offset-md-4">
                                        <button onClick={this.editingPost} className="btn btn-primary">Edit post
                                        </button>
                                    </div>
                                    <div className="col-md-1">
                                        <button onClick={this.deletePost} className="btn btn-danger">Delete</button>
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
                                {/* Comment input field */}
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
                            </div>
                        ) : (
                            <div>
                                <EditPost editPost={this.editPost} post={this.props.post}/>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-md-2">
                                <h4>Comments</h4>
                            </div>
                            <div className="col-md-2">
                                <select onChange={this.sort}>
                                    <option value="top">Top</option>
                                    <option value="bottom">Bottom</option>
                                </select>
                            </div>
                        </div>
                        <section className="row">
                            <div className="col-md-6">
                                {comments}
                            </div>
                        </section>

                    </div>))}/>
            </div>
        )
    }
}

function mapStateToProps({posts, comments}, ownProps) {
    let post = _.find(posts.posts, (p) => {
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

export default connect(mapStateToProps)(Post)