import React, {Component} from "react";
import {Route, Redirect} from 'react-router';
import uuidv4 from 'uuid';
import {addComment, editPost, gotPosts, fetchPost,
    gotComments, fetchCommentsFromPost, deletePost, deleteComment, sortComments} from '../../actions/actions';
import * as ForumAPI from '../../utils/ForumAPI.js';
import Comment from '../comments/Comment.js';
import EditPost from './EditPost.js';
import PostBody from './PostBody.js';
import _ from 'underscore';
import {connect} from 'react-redux';
import NotFound from "../NotFound";


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
        this.props.dispatch(fetchPost(this.props.match.params.id));
        this.props.dispatch(fetchCommentsFromPost(this.props.post.id));
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
     * post the input values saved in the state
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
                    ) : (
                        <div>
                            {!this.props.post.category ? (
                                <NotFound/>
                            ) : (
                                <div>
                                    {!this.state.editing ? (
                                        <div>
                                            <PostBody post={this.props.post}/>
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
                                </div>)}

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