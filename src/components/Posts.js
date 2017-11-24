import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {gotCategories, gotPosts, deletePost, sortPosts} from '../actions/actions'
import PostTitle from './PostTitle.js';
import CategoryName from './CategoryName.js';
import * as ForumAPI from '../utils/ForumAPI.js'

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
    }

    componentDidMount() {
        if (this.props.category) {
            ForumAPI.getFilteredPosts(this.props.category).then(data => {
                    this.props.dispatch(gotPosts(data));
                    this.props.dispatch(sortPosts('top'));
                }
            );
        } else {
            ForumAPI.getAllPosts().then(data => {
                    this.props.dispatch(gotPosts(data));
                    this.props.dispatch(sortPosts('top'));
                }
            );
        }

        ForumAPI.getCategories().then(data => {
            this.props.dispatch(gotCategories(data.categories));
        })
    }


    /**
     * If a new category has been selected, refetch the posts that match the category
     * @param nextProps The new props received
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.category !== nextProps.category) {
            if (nextProps.category) {
                ForumAPI.getFilteredPosts(nextProps.category).then(data => {
                        this.props.dispatch(gotPosts(data));
                        this.props.dispatch(sortPosts('top'));
                    }
                );
            } else {
                ForumAPI.getAllPosts().then(data => {
                        this.props.dispatch(gotPosts(data));
                        this.props.dispatch(sortPosts('top'));
                    }
                );
            }
        }
    }

    deletePost = (post) => {
        ForumAPI.deletePost(post.props.post.id)
        this.props.dispatch(deletePost(post.props.post));
    }

    sort = (e) => {
        this.props.dispatch(sortPosts(e.target.value))
    }

    render() {
        let posts = [];
        for (let post of this.props.posts) {
            posts.push(<PostTitle post={post} key={post.id} deletePost={this.deletePost}/>);
        }
        let categories = [];
        for (let category of this.props.categories) {
            categories.push(<CategoryName category={category} key={category.name}/>);
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <select onChange={this.sort}>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="newest">New</option>
                            <option value="oldest">Old</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        {categories}
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-primary" to="/new">Create post</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <tbody>
                            {posts}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({categories, posts}, ownProps) {
    return {
        categories: categories.categories,
        posts: posts.posts,
        category: ownProps.match.params.category
    }
}


export default connect(
    mapStateToProps,
)(Posts)