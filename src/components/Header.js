import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div>
                <Link className="btn btn-primary" to="/new">Create post</Link>
            </div>
        )
    }
}

export default Header;