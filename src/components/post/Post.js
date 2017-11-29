import React, {Component} from "react";
import {Route, Redirect} from 'react-router';
import * as PostActions from '../../actions/posts.js';
import * as CommentActions from '../../actions/comments.js';
import Comment from '../comments/Comment.js';
import EditPost from './EditPost.js';
import PostBody from './PostBody.js';
import _ from 'underscore';
import {connect} from 'react-redux';
import NotFound from '../NotFound';
import NewComment from '../comments/NewComment.js';
import Header from '../Header.js';


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
        this.props.dispatch(PostActions.fetchPost(this.props.match.params.id));
        if (this.props.match.params.edit) {
            this.setState({
                editing: true
            });
        }
    }

    deleteChildComment = (comment) => {
        this.props.dispatch(CommentActions.deleteComment(comment));
    }

    editingPost = (e) => {
        this.setState({editing: !this.state.editing})
    }


    deletePost = () => {
        this.props.dispatch(PostActions.deletePost(this.props.post));
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
        this.props.dispatch(PostActions.updatePost(post));
        this.setState({
            editing: false
        });
    }

    sort = (e) => {
        this.props.dispatch(CommentActions.sortComments(e.target.value))
    }

    render() {
        let comments = [];
        for (var comment of this.props.comments) {
            comments.push(<Comment key={comment.id} delete={this.deleteChildComment} comment={comment}/>)
        }
        let post;
        this.props.post ? post = this.props.post : post = {};
        return (
            <div>
                <Route path="/:category/:id/:edit?" render={() => (
                    this.state.deleted ? (
                        <Redirect to="/"/>
                    ) : (
                        <div>
                            {!post.category ? (
                                <NotFound/>
                            ) : (
                                <div>
                                    <Header category={this.props.post.category}
                                            title={this.props.post.title}
                                            id={this.props.post.id}
                                    />
                                    {!this.state.editing ? (
                                        <div>
                                            <PostBody editingPost={this.editingPost} deletePost={this.deletePost}
                                                      post={post}/>
                                            <NewComment parentId={this.props.post.id}/>

                                        </div>
                                    ) : (
                                        <div>
                                            <EditPost editPost={this.editPost} post={post}/>
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
    return {
        post: _.filter(posts.posts, (post) => {
            return post.id === ownProps.match.params.id;
        })[0],
        comments: comments.comments
    }
}

export default connect(mapStateToProps)(Post)