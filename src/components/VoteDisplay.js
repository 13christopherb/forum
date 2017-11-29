import React, {Component} from "react";
import VoteButton from './VoteButton.js';
import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import * as PostActions from '../actions/posts.js';
import * as CommentActions from '../actions/comments.js';

class VoteDisplay extends React.Component {

    state = {
        voteScore: this.props.post.voteScore,
        voteValue: 0
    }

    /**
     * Handles a vote on the specific post/comment. Should allow only a single vote
     * per page load. If a user has already voted once on this page load, a second vote
     * will change the vote count to effectively counteract the previous vote.
     * Function then updates the voteCount for the post/comment and resorts them
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

        var post = {...this.props.post};
        post['voteScore'] = this.props.post.voteScore + delVoteScore


        if (this.props.type==='post') {
            this.props.dispatch(PostActions.postVote(post, delVoteScore, voteResult));
        } else if (this.props.type==='comment') {
            this.props.dispatch(CommentActions.commentVote(post, delVoteScore, voteResult));
        }

        this.setState({
            voteValue: voteValue
        })
    }

    render() {
        return (
            <div>
                <VoteButton value="upVote" type={this.props.type}
                            voteValue={this.state.voteValue}
                            handleVote={this.handleVote}/>
                {this.props.post.voteScore}
                <VoteButton vue="downVote" type={this.props.type}
                            voteValue={this.state.voteValue}
                            handleVote={this.handleVote}/>
            </div>
        )
    }
}

export default connect()(VoteDisplay)