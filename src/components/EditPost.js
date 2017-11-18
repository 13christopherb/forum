import React, {Component} from "react";

class EditPost extends React.Component {

    state = {
        body: this.props.body,
        title: this.props.title,
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

    handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            ...this.state.post,
            ['title']: this.state.title,
            ['body']: this.state.body
        }
        this.props.editPost(post);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title
                        <input
                            name="title"
                            value={this.state.title}
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
        )
    }
}

export default EditPost