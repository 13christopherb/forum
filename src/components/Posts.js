import React, {Component} from "react";
import {Link} from 'react-router-dom';
import _ from "underscore"
import {connect} from 'react-redux'
import $ from "jquery"
import {gotPosts} from '../actions/actions'
import Post from './Post.js'

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
    }

    componentDidMount() {
        fetch('http://localhost:3001/posts', {
            headers: {Authorization: 'whatever-you-want'}
        }).then(res => res.json())
            .then(data => {
                    this.props.dispatch(gotPosts(data));
                }
            );
    }

    render() {
        let posts = [];
        _.each(this.props.posts, (post) => {
            posts.push(<Post key={post.id} id={post.id}/>);
        });
        return (
            <div>
                <Link
                    to="/new"
                    className="btn"
                >New Post</Link>
                {posts}
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