/*
 * File         :   TaskList.js
 * Description  :   .
 * ------------------------------------------------------------------------------------------------ */
import React from "react";

import _Store from "../../../stores/_Store.js";

const defaultProps = {
    tasks : [],
    heading : "To do"
};

export default React.createClass({
    propTypes : {
        tasks : React.PropTypes.array,
        heading : React.PropTypes.string
    },
    getDefaultProps : () => defaultProps,

    render : function() {
        let tasks = this.props.tasks || [];

        let taskElements = tasks.map((task, i) => <tr key={i}><td>{task}</td></tr>);

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>{this.props.heading}</th>
                </tr>
                </thead>
                <tbody>
                {taskElements}
                </tbody>
            </table>
        );
    }
});