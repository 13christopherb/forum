import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ForumAPI from '../utils/ForumAPI.js';
import {editPost} from '../actions/actions'
import VoteDisplay from './VoteDisplay.js';

class PostTitle extends React.Component {

    deletePost = () => {
        this.props.deletePost(this);
    }

    /**
     * Handles a vote on the specific post. Should allow only a single vote
     * per page load. If a user has already voted once on this page load, a second vote
     * will change the vote count to effectively counteract the previous vote.
     * @param vote A string representing the vote: 'upVote' or 'downVote'
     */
    handleVote = (vote) => {
        let delVoteScore = this.state.voteScore;
        let voteResult = '';
        let voteValue = this.state.voteValue;

        if (vote === 'upVote') {
            if (this.state.voteValue === 1) {       //If the user has already upvoted the post
                delVoteScore = -1;
                voteResult = 'downVote';
                voteValue = 0;
            } else if (this.state.voteValue === 0){ //If the user hasn't voted on this post
                delVoteScore = 1;
                voteResult = 'upVote';
                voteValue = 1;
            } else {                                //If the user has already downvoted this post
                delVoteScore = 2;
                voteResult = 'upVote';
                voteValue = 1;
            }
        } else {
            if (this.state.voteValue === -1) {      //If the user has already downvoted the post
                delVoteScore = 1;
                voteResult = 'upVote';
                voteValue = 0;
            } else if (this.state.voteValue === 0){ //If the user hasn't voted on this post
                delVoteScore = -1;
                voteResult = 'downVote';
                voteValue = -1;
            } else {                                //If the user has alread upvoted this post
                delVoteScore = -2;
                voteResult = 'downVote';
                voteValue = -1;
            }
        }

        for (let i = 0; i < Math.abs(delVoteScore); i++) {
            ForumAPI.voteOnPost(this.props.post, voteResult);
        }

        this.props.dispatch(editPost(this.props.post));

        this.setState({
            voteScore: this.state.voteScore + delVoteScore,
            voteValue: voteValue
        })
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
                    >{this.props.post.title}</Link>
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