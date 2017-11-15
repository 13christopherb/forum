import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'underscore';

class PostTitle extends React.Component {
    render() {
        return(
            <div><Link
                to={"/posts/" + this.props.id}
                className="btn"
            >New Post</Link>{this.props.title}</div>
        )
    }
}

export default connect()(PostTitle)