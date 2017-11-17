import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class PostTitle extends React.Component {
    deletePost = () => {
        this.props.deletePost(this);
    }
    render() {
        return(
            <tr>
                <td>
                    <Link
                        to={"/posts/" + this.props.id}
                    >{this.props.title}</Link>
                </td>
                <td>
                    {this.props.author}
                </td>
                <td>
                <button className="btn btn-danger" onClick={this.deletePost}>
                    <i className="fa fa-trash" /> Delete</button>
                </td>
            </tr>
        )
    }
}

export default connect()(PostTitle)