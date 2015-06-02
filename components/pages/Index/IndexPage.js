/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

import _Store from "../../../stores/_Store.js";

const defaultProps = {
    title : "The super mega awesome to do list",
    toDoStore : {}
};

export default React.createClass({
    getDefaultProps : () => defaultProps,

    render : function() {
        let toDoStore = this.props.stores[0].toDoStore;

        let taskElements = toDoStore.tasks && toDoStore.tasks.map((task, i) => <tr key={i}><td>{task}</td></tr>);

        return (
            <div className="container">
                <div className="page-header">
                    <h1>Super duper mega awesome to do list</h1>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>{"To do"}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {taskElements}
                    </tbody>
                </table>
            </div>
        );
    }
});