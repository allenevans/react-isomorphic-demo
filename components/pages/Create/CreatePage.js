/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

import _Store from "../../../stores/_Store.js";

const defaultProps = {
    title : "New To Do | Mega awesome To Do List"
};

export default React.createClass({
    getDefaultProps : () => defaultProps,

    getInitialState : () => {
        return {
            task : ""
        }
    },

    handleTaskChange: function(event) {
        this.setState({task: event.target.value});
    },

    render : function () {
        return (
            <div>
                <h1>Add a To Do</h1>
                <p>
                    <form>
                        <label>Title</label>
                        <input type="text" value={this.state.task} onChange={this.handleTaskChange} />
                        {this.state.task}
                    </form>
                </p>
            </div>
        );
    }
});