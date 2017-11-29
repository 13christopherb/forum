import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import PostTitle from './index/PostTitle.js';
import * as PostActions from '../actions/posts.js';
import _ from 'underscore';

class Author extends React.Component {

    componentDidMount() {
        this.props.dispatch(PostActions.fetchPosts(this.props.category));
    }

    deletePost = (post) => {
        this.props.dispatch(PostActions.deletePost(post.props.post));
    }

    render() {
        let posts = [];
        for (let post of this.props.posts) {
            posts.push(<PostTitle post={post} key={post.id} deletePost={this.deletePost}/>);
        }

        return (
            <div>
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

function mapStateToProps({posts}, ownProps) {
    var author = ownProps.match.params.author
    var posts = _.filter(posts.posts, (post) => {
       return post.author === author;
    });
    return {
        posts: posts,
        author: author
    }
}

export default connect(
    mapStateToProps
)(Author)