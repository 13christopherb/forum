import React, {Component} from 'react';
import {Link} from 'react-router-dom';

function Header(props) {
    if (props.category && props.id) {
        return <PostPath category={props.category} title={props.title} id={props.id} />
    } else if (props.category && !props.id) {
        return <CategoryPath category={props.category} />
    } else if (props.author) {
        return <AuthorPath author={props.author} />
    }
    return <BasePath />
}

function BasePath(props) {
    return (
        <div className="row">
            <div className="col-md-10">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">All</Link></li>
                </ol>
            </div>
        </div>
    );
}

function CategoryPath(props) {
    return (
        <div className="row">
            <div className="col-md-10">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">All</Link></li>
                    <li className="breadcrumb-item">
                        <Link to={'/' + props.category}>{props.category}</Link>
                    </li>
                </ol>
            </div>
        </div>
    );
}

function PostPath(props) {
    return (
        <div className="row">
            <div className="col-md-10">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">All</Link></li>
                    <li className="breadcrumb-item">
                        <Link to={'/' + props.category}>{props.category}</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={'/' + props.category + '/' + props.id}>{props.title}</Link>
                    </li>
                </ol>
            </div>
        </div>
    );
}

function AuthorPath(props) {
    return (
        <div className="row">
            <div className="col-md-10">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">All</Link></li>

                    <li className="breadcrumb-item">
                        <Link to={'/'}>u</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={'/u/' + props.author}>{props.author}</Link>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Header;