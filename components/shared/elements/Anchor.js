/**
 * Created by allen on 02/06/2015.
 */
import React from "react";
import page from "page";

export default React.createClass({
    /**
     * Navigate the CLIENT to the specified path using push state.
     */
    navigate : function (event) {
        event.preventDefault();

        if (window.location.pathname + window.location.search === this.props.href) {
            return;
        }

        // use page to navigate to the new state.
        page(this.props.href);
    },
    render : function () {
        return (<a href={this.props.href} className={this.props.className} onClick={ (event) => this.navigate(event) }>{this.props.children}</a>);
    }
});