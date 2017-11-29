import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import VoteDisplay from '../VoteDisplay.js';

class PostTitle extends React.Component {

    deletePost = (e) => {
        e.preventDefault();
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
                        to={'/' + this.props.post.category + '/' + this.props.post.id}
                    ><h4>{this.props.post.title}</h4></Link>
                    {/* Info/options links */}
                    <p><small>{this.props.post.commentCount + ' comments | '}</small>
                        <small>{moment(this.props.post.timestamp, 'x').from(Date.now())}</small>
                        <small> | </small>
                        <Link
                            to={'/' + this.props.post.category + '/' + this.props.post.id + '/' + 'edit'}
                        ><small>Edit Post</small></Link>
                        <small> | </small>
                        <a href="#" onClick={this.deletePost}><small>Delete</small></a>
                    </p>
                </td>
                <td>
                    <Link
                        to={"/u/" + this.props.post.author}
                    >{this.props.post.author}</Link>
                </td>
                <td>
                    {this.props.post.category}
                </td>
            </tr>
        )
    }
}

export default connect()(PostTitle)