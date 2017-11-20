import React, {Component} from "react";

class Category extends React.Component {

    vote = () => {
        this.props.handleVote(this.props.value);
    }

    render() {
        return (
            <option value={this.props.category.path}>{this.props.category.name}</option>
        )
    }
}

export default Category