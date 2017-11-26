import React, {Component} from "react";
import {connect} from 'react-redux';
import VoteDisplay from '../VoteDisplay.js';
import * as actions from '../../actions/actions';
import * as CommentActions from '../../actions/comments.js';
import '../../App.css';

class Comment extends React.Component {

    state = {
        body: this.props.comment.body,
        editing: false,
        deleting: false
    }

    /**
     * Deletes the comment while requiring confirmation
     * @param e Onclick event
     */
    delete = (e) => {
        if (!this.state.deleting) {
            this.setState({
                deleting: true
            });
        } else if (this.state.deleting) {
            if (e.target.name === 'yes') {
                this.props.delete(this.props.comment);
            } else {
                this.setState({
                    deleting: false
                })
            }
        }
    }

    editing = (e) => {
        e.preventDefault();
        this.setState({
            editing: !this.state.editing
        })
    }

    /**
     * Saves the input values to the state to submit later
     * when button is pressed
     * @param e Input change event
     */
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            ...this.props.comment,
            ['body']: this.state.body
        }
        this.props.dispatch(CommentActions.updateComment(comment));
        this.setState({
            editing: false
        });
    }

    render() {
        return (
            <div className="bs-callout bs-callout-info">
                <div className="row">
                    <div className="col-md-2">
                        <VoteDisplay type="comment" post={this.props.comment}/>
                    </div>
                    <div className="col-md-10">
                        <p>{this.props.comment.author}</p>
                        <div>
                            {!this.state.editing ? (
                                <p>{this.props.comment.body}</p>) : (
                                <form onSubmit={this.handleSubmit}>
                                        <textarea
                                            name="body"
                                            value={this.state.body} onChange={this.handleInputChange}></textarea>
                                    <button className="btn btn-sm btn-primary" type="submit">Submit</button>
                                    <button className="btn btn-sm btn-primary" onClick={this.editing}>Cancel</button>
                                </form>
                            )}
                            <a href="#" className="comment-link" onClick={this.editing}>Edit</a>
                            {!this.state.deleting ? (
                            <a href="#" className="comment-link" onClick={this.delete}>Delete</a>
                            ) : (
                                <span>
                                    <a href="#" name="yes" className="comment-link" onClick={this.delete}>Yes</a>
                                    <a href="#" name="no" className="comment-link" onClick={this.delete}>No</a>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default connect()(Comment)