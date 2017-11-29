import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PostTitle from './index/PostTitle.js';
import Header from './Header.js';
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
        var posts = [];
        for (var post of this.props.posts) {
            posts.push(<PostTitle post={post} key={post.id} deletePost={this.deletePost}/>);
        }
        return (
            <div>
                <Header author={this.props.author} />
                <div className="row">
                    <div className="col-md-12">
                        <h2>{this.props.author}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <table className="table table-striped">
                            <tbody>
                            {posts}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3">
                        <h5>{this.props.totalScore} points</h5>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps({posts}, ownProps) {
    var author = ownProps.match.params.author
    var totalScore = 0;                            //Sum of the voteScore of all of this author's posts
    var posts = _.filter(posts.posts, (post) => {
        if (post.author === author) {
            totalScore += post.voteScore;
            return true;
        } else {
            return false;
        }
    });
    /* Sort by newest */
    posts.sort((a, b) => {
        return (a.timestamp > b.timestamp) ? -1 : 1
        return 0;
    })

    return {
        posts: posts,
        author: author,
        totalScore: totalScore
    }
}

export default connect(
    mapStateToProps
)(Author)