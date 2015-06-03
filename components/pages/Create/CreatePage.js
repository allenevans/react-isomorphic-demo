/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

// dispatcher
import dispatcher from "../../../infrastructure/dispatcher";
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

    handleTaskAdd : function() {
        event.preventDefault();

        if (this.state.task) {
            console.log("Add:", this.state.task);
            dispatcher.handle("ADD_TASK", { task : this.state.task });
        }

        this.setState({
            task : ""
        });
    },

    render : function () {
        return (
            <div>
                <h1>Add a To Do</h1>
                <p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="taskText">Task:</label>
                            <input id="taskText" type="text" value={this.state.task}
                                   className="form-control"
                                   autoComplete="off"
                                   onChange={this.handleTaskChange} placeholder="Type your to do here..."/>
                        </div>
                        <button onClick={this.handleTaskAdd} className="btn btn-default">Add</button>
                    </form>
                </p>
            </div>
        );
    }
});