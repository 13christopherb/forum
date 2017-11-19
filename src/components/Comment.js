import React, {Component} from "react";
import VoteDisplay from './VoteDisplay.js';

class Comment extends React.Component {

    render() {
        return (
            <div className="row">
                <VoteDisplay post={this.props.comment} type="comment" />
                <div className="col-md-6">
                    <p>{this.props.comment.author}</p>
                    <div className="alert alert-primary">

                        <p>{this.props.comment.body}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment