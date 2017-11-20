import React, {Component} from "react";
import {Link} from 'react-router-dom';
import _ from "underscore"
import {connect} from 'react-redux'
import {gotPosts, deletePost, sortPosts} from '../actions/actions'
import PostTitle from './PostTitle.js'
import * as ForumAPI from '../utils/ForumAPI.js'
import "bootstrap/dist/css/bootstrap.css";
import Header from './Header.js';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
    }

    componentDidMount() {
        ForumAPI.getAllPosts().then(data => {
                this.props.dispatch(gotPosts(data));
                this.props.dispatch(sortPosts('top'))
            }
        );
    }

    deletePost = (post) => {
        ForumAPI.deletePost(post.props.post.id)
        this.props.dispatch(deletePost(post.props.post));
    }

    sort = (e) => {
        this.props.dispatch(sortPosts(e.target.value))
    }

    render() {
        let posts = [];
        _.each(this.props.posts, (post) => {
            posts.push(<PostTitle post={post} key={post.id} deletePost={this.deletePost}/>);
        });
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="col-md-2">
                            <select onChange={this.sort}>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="newest">New</option>
                                <option value="oldest">Old</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 offset-md-6">
                        <Link className="btn btn-primary" to="/new">Create post</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <tbody>
                                {posts}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return {
        posts: posts.posts
    }
}


export default connect(
    mapStateToProps,
)(Posts)