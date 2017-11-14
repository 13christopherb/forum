import React, { Component } from "react";
import { connect } from 'react-redux'
import $ from "jquery"
import { getPosts } from './actions'

class Posts extends React.Component {

    componentDidMount() {
        $.ajax({
            type: 'GET',
            url: "http://localhost:3001/posts",
            dataType: 'json',
            contentType: 'json',
            headers: { 'Authorization': 'whatever-you-want' }
        }).then(posts => {
            this.props.dispatch(getPosts(posts));
        });
    }

    render() {
        return(
            <div>Hello world</div>
        )
    }
}

function mapStateToProps ({ posts }) {
    return {
        posts: posts
    }
}


export default connect(
    mapStateToProps,
)(Posts)