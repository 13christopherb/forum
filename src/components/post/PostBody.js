import React, {Component} from "react";
import VoteDisplay from '../VoteDisplay.js';
import {Link} from 'react-router-dom';

class PostBody extends React.Component {

    render() {
        return (
            <div>
                <section className="row">
                    <div className="col-md-5">
                        <VoteDisplay post={this.props.post} type="post"/>
                        <h2>{this.props.post.title}</h2>
                        <p><Link to={'/u/' + this.props.post.author}>{this.props.post.author}</Link></p>
                    </div>
                    <div className="col-md-1 offset-md-4">
                        <button onClick={this.editingPost} className="btn btn-primary">Edit post
                        </button>
                    </div>
                    <div className="col-md-1">
                        <button onClick={this.deletePost} className="btn btn-danger">Delete</button>
                    </div>
                </section>

                <section className="row">
                    <div className="col-md-8 offset-md-2">
                        <article className="jumbotron">
                            {this.props.post.body}
                        </article>
                    </div>
                </section>

                <section className="row">
                    <div className="col-md-6"></div>
                </section>
            </div>
        )
    }
}

export default PostBody