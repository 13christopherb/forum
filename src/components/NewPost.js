import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'underscore';

class NewPost extends React.Component {

    state = {
        value: ''
    };

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    handleSubmit = (e) => {
        alert(this.state.value);
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.value} onChange={this.handleChange}></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default NewPost;