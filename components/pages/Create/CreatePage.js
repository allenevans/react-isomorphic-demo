/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

const defaultProps = {
    title : "New To Do | Mega awesome To Do List"
};

export default React.createClass({
    getDefaultProps : () => defaultProps,

    render : function () {
        return (
            <div>
                <h1>Add a To Do</h1>
                <p>
                    <form>
                        <label>Title</label>
                        <input type="text" />
                    </form>
                </p>
            </div>
        );
    }
});