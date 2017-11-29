import React, {Component} from "react";
import {connect} from 'react-redux';
import uuidv4 from 'uuid';
import * as CommentActions from '../../actions/comments.js';
import '../../App.css';

class NewComment extends React.Component {

    state = {
        author: '',
        body: '',
    }

    handleCommentChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            id: uuidv4(),
            author: this.state.author,
            body: this.state.body,
            parentId: this.props.parentId,
            voteScore: 1,
        };
        this.props.dispatch(CommentActions.postComment(comment));
        this.setState({
            author: '',
            body: '',
        })
    }

    render() {
        return (
            <section className="row">
                <div className="col-md-4">
                    <form onSubmit={this.handleCommentSubmit}>
                        <div className="form-group">
                            <label>
                                Author
                            </label>
                            <input
                                name="author"
                                type="text"
                                className="form-control"
                                value={this.state.author}
                                onChange={this.handleCommentChange}/>
                        </div>
                        <div className="form-group">
                            <label>
                                Comment</label>
                            <textarea
                                name="body"
                                className="form-control"
                                value={this.state.body}
                                rows="4"
                                onChange={this.handleCommentChange}></textarea>
                            <button className="btn btn-sm btn-success" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default connect()(NewComment)