import React, {Component} from "react";
import {Link} from 'react-router-dom';
import _ from "underscore"
import {connect} from 'react-redux'
import {gotPosts, deletePost} from '../actions/actions'
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
                }
            );
    }

    deletePost = (post) => {
        ForumAPI.deletePost(post.props.id)
        this.props.dispatch(deletePost(post));
    }

    render() {
        let posts = [];
        _.each(this.props.posts, (post) => {
            console.log(post);
            posts.push(<PostTitle key={post.id} id={post.id} title={post.title} author={post.author}
                                  timestamp={post.timestamp} deletePost={this.deletePost}/>);
        });
        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                        {posts}
                    </tbody>
                </table>
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