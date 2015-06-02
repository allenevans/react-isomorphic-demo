/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

export default React.createClass({
    render : function () {
        let content = this.props.content;

        return (
            <div>
                {content}
            </div>
        );
    }
});