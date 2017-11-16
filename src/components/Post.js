import React, {Component} from "react";
import {connect} from 'react-redux';
import * as ForumAPI from '../utils/ForumAPI.js'

class Post extends React.Component {

    state = {
        post: {}
    }

    componentDidMount() {
        ForumAPI.getPost(this.props.match.params.id).then(data => {
                this.setState({post: data});
            }
        );
    }

    render() {
        return (
            <div>{this.state.post.body}</div>
        )
    }
}

export default connect()(Post)