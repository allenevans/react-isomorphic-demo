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
        return (
            <div>
                <h1>Super duper mega awesome to do list.</h1>
            </div>
        );
    }
});