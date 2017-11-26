import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions';
import * as PostActions from '../../actions/posts.js';
import PostTitle from './PostTitle.js';
import CategoryName from './CategoryName.js';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}
    }

    componentDidMount() {
        this.props.dispatch(PostActions.fetchPosts(this.props.category));
        this.props.dispatch(actions.fetchCategories());
    }


    /**
     * If a new category has been selected, refetch the post that match the category
     * @param nextProps The new props received
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.category !== nextProps.category) {
            this.props.dispatch(PostActions.fetchPosts(nextProps.category));
        }
    }

    deletePost = (post) => {
        this.props.dispatch(PostActions.deletePost(post.props.post));
    }

    sort = (e) => {
        this.props.dispatch(PostActions.sortPosts(e.target.value))
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
    mapStateToProps
)(Posts)