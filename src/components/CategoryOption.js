import React, {Component} from "react";

class CategoryOption extends React.Component {
    render() {
        return (
            <option value={this.props.category.name}>{this.props.category.name}</option>
        )
    }
}

export default CategoryOption