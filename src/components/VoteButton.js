import React, {Component} from "react";

class VoteButton extends React.Component {

    vote = () => {
        this.props.handleVote(this.props.value);
    }

    render() {
        var size;
        this.props.type === 'comment' ? size='btn-xs' : size='';
        return (
            <div>
                {this.props.value === 'upVote' ? (
                    <div>
                        {this.props.voteValue === 1 ? ( //If post has been upvoted by user, render has royal blue
                            <button className={'btn btn-primary ' + size} onClick={this.vote}>
                                <i className="fa fa-arrow-up" aria-hidden="true"></i>
                            </button>) : (
                            <button className={'btn btn-info ' + size} onClick={this.vote}>
                                <i className="fa fa-arrow-up" aria-hidden="true"></i>
                            </button>
                        )}
                    </div>
                ) : (
                    <div>
                        {this.props.voteValue === -1 ? (    //If post has been downvoted by user, render as dark red
                            <button className={'btn btn-danger ' + size} onClick={this.vote}>
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                            </button>) : (
                            <button className={'btn btn-warning ' + size} onClick={this.vote}>
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                            </button>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default VoteButton