import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import VoteDisplay from './VoteDisplay.js';

class PostTitle extends React.Component {

    deletePost = () => {
        this.props.deletePost(this);
    }

    render() {
        return (
            <tr key={this.props.post.id}>
                <td>
                    <VoteDisplay post={this.props.post} type="post" />
                </td>
                <td>
                    <Link
                        to={"/posts/" + this.props.post.id}
                    ><h4>{this.props.post.title}</h4></Link>
                    <p><small>{moment(this.props.post.timestamp, 'x').from(Date.now())}</small></p>
                </td>
                <td>
                    <Link
                        to={"/u/" + this.props.post.author}
                    >{this.props.post.author}</Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.deletePost}>
                        <i className="fa fa-trash"/> Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default connect()(PostTitle)