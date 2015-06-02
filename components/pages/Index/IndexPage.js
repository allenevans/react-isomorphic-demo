/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

const defaultProps = {
    title : "The super mega awesome to do list"
};

export default React.createClass({
    getDefaultProps : () => defaultProps,

    render : function() {
        var tasks = [
            "1. Write a super awesome to do list app",
            "2. Write a presentation",
            "3. Present presentation",
            "--- End of list ---"
        ];

        let taskElements = tasks.map((task, i) => <tr key={i}><td>{task}</td></tr>);

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