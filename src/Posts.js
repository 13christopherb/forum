import React, { Component } from "react";
import $ from "jquery"

class Posts extends React.Component {

    componentDidMount() {
        $.ajax({
            type: 'GET',
            url: "http://localhost:3001/posts",
            dataType: 'json',
            contentType: 'json',
            headers: { 'Authorization': 'whatever-you-want' }
        }).then(posts => {
            console.log(posts);
        });
    }

    render() {
        return(
            <div>Hello world</div>
        )
    }
}

export default Posts;