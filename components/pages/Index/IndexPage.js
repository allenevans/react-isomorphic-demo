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
            <tr key="0"><td>{"--- End of list ---"}</td></tr>
        ];

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
                    {tasks}
                    </tbody>
                </table>
            </div>
        );
    }
});