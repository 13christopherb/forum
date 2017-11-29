import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-10">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">All</Link></li>
                        {this.props.category ? (
                            <li className="breadcrumb-item">
                                <Link to={'/' + this.props.category}>{this.props.category}</Link>
                            </li>
                        ) : (
                            <div></div>)}
                        {this.props.id ? (
                            <li className="breadcrumb-item">
                                <Link to={'/' + this.props.category + '/' + this.props.id}>{this.props.title}</Link>
                            </li>
                        ) : (
                            <div></div>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Header;