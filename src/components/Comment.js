import React, {Component} from "react";

class Comment extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <p>{this.props.author}</p>
                    <div className="alert alert-primary">

                        <p>{this.props.body}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment