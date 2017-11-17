import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div>
                <Link to="/">Forum</Link>
            </div>
        )
    }
}

export default Header;