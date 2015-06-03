/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

import _Store from "../../../stores/_Store";

import TaskList from "../../shared/TaskList/TaskList";
import Anchor from "../../shared/elements/Anchor.js";

const defaultProps = {
    title : "The super mega awesome to do list",
    toDoStore : {}
};

export default React.createClass({
    getDefaultProps : () => defaultProps,

    componentDidMount : function () {
        let toDoStore = this.props.stores[0].toDoStore;

        toDoStore.on("change", function () {
            if (this.isMounted()) {
                this.setState({});
            }
        }.bind(this));
    },

    render : function() {
        let toDoStore = this.props.stores[0].toDoStore;

        return (
            <div className="container">
                <div className="page-header">
                    <h1>Super duper mega awesome to do list</h1>
                </div>

                <TaskList tasks={toDoStore.tasks} />

                <br/>
                <br/>
                <br/>
                <Anchor href="/new-todo">New To Do</Anchor>
            </div>
        );
    }
});