import React, {Component} from "react";
import {connect} from 'react-redux';

class Post extends React.Component {

    state = {
        post: {}
    }

    componentDidMount() {
        console.log(this.props)
        fetch('http://localhost:3001/posts/' + this.props.match.params.id, {
            headers: {Authorization: 'whatever-you-want'}
        }).then(res => res.json())
            .then(data => {
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