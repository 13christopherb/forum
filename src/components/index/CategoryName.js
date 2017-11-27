import React, {Component} from "react";
import {Link} from 'react-router-dom';

class CategoryName extends React.Component {
    render() {
        return (
            <Link className="btn btn-primary"
                to={'/' + this.props.category.path}
            >{this.props.category.name}</Link>
        )
    }
}

export default CategoryName