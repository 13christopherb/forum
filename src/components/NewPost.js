import React, {Component} from "react";
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router';
import uuidv4 from 'uuid';
import {addPost, gotCategories} from '../actions/actions';
import * as ForumAPI from '../utils/ForumAPI.js';
import CategoryOption from './CategoryOption.js';

class NewPost extends React.Component {

    state = {
        value: {},
        created: false
    };

    componentDidMount() {
        if (this.props.categories.length === 0) {
            ForumAPI.getCategories().then(data => {
                this.props.dispatch(gotCategories(data.categories));
            })
        }
    }

    /**
     * Saves the input values to the state to submit later
     * when button is pressed
     * @param e Input change event
     */
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * Posts the input values saved in the state
     * to the server.
     * @param e On click event
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            id: uuidv4(),
            timestamp: Date.now(),
            title: this.state['title'],
            body: this.state['body'],
            author: this.state['author'],
            category: this.state['category']
        };
        ForumAPI.addPost(post).then(() => {
            this.props.dispatch(addPost(post));
            this.setState({
                created: true,
                id: post.id
            });
        });
    }

    render() {
        let categories = [];
        for (let category of this.props.categories) {
            categories.push(<CategoryOption category={category} key={category.name}/>);
        }
        return (
            <div>
                <Route exact path="/new" render={() => (
                    this.state.created ? (
                        <Redirect to={'/c/' + this.state.category + '/' + this.state.id}/>
                    ) : <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Category
                            <select
                                name="category"
                                onChange={this.handleInputChange}>
                                {categories}
                            </select>
                            </label>
                            <label>
                                Title
                                <input
                                    name="title"
                                    onChange={this.handleInputChange}></input>
                            </label>
                            <label>
                                Author
                                <input
                                    name="author"
                                    onChange={this.handleInputChange}></input>
                            </label>
                            <label>
                                Body
                                <textarea
                                    name="body"
                                    value={this.state.body} onChange={this.handleInputChange}></textarea>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}/>
            </div>
        )
    }
}

function mapStateToProps({categories}) {
    return {
        categories: categories.categories
    }
}


export default connect(
    mapStateToProps,
)(NewPost)
