/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

export default React.createClass({
    getDefaultProps : () => {
        return {
            title : "Sorry, but this page cannot be found"
        }
    },

    render : function () {
        return (
            <div>
                <h1>404</h1>
            </div>
        );
    }
});