import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import VoteButton from './VoteButton.js';
import * as ForumAPI from '../utils/ForumAPI.js';

class PostTitle extends React.Component {

    state = {
        voteScore: this.props.post.voteScore,
        voteValue: 0
    }

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
            } else {                                //If the user has downvoted this post
                delVoteScore = 2;
                voteResult = 'upVote';
                voteValue = 1;
            }
        } else {
            if (this.state.voteValue === -1) {      //If the user has downvoted the post
                delVoteScore = 1;
                voteResult = 'upVote';
                voteValue = 0;
            } else if (this.state.voteValue === 0){ //If the user hasn't voted on this post
                delVoteScore = -1;
                voteResult = 'downVote';
                voteValue = -1;
            } else {                                //If the user has upvoted this post
                delVoteScore = -2;
                voteResult = 'downVote';
                voteValue = -1;
            }
        }

        for (let i = 0; i < Math.abs(delVoteScore); i++) {
            ForumAPI.voteOnPost(this.props.post, voteResult);
        }

        this.setState({
            voteScore: this.state.voteScore + delVoteScore,
            voteValue: voteValue
        })
    }

    render() {
        return (
            <tr key={this.props.post.id}>
                <td>
                    <VoteButton value="upVote" voteValue={this.state.voteValue} handleVote={this.handleVote}/>
                    {this.state.voteScore}
                    <VoteButton value="downVote" voteValue={this.state.voteValue} handleVote={this.handleVote}/>
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