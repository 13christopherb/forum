import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'underscore';

class Post extends React.Component {
    render() {
        return(
            <div>{this.props.body}</div>
        )
    }
}

function mapStateToProps ({ posts }, ownProps) {
    let post = _.find(posts.posts, (p) => {
        return p.id === ownProps.id
    });

    return {
        id: post.id,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        voteScore: post.voteScore,
        deleted: post.deleted
    }
}

export default connect(
    mapStateToProps,
)(Post)