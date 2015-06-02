/**
 * Created by allen on 02/06/2015.
 */
import React from "react";
import Header from "../shared/Header/Header.js";
import Footer from "../shared/Footer/Footer.js";

export default React.createClass({
    getDefaultProps : () => {
        return {
            page : null
        }
    },

    render : function () {
        return (
            <div>
                <Header />
                {this.props.page}
                <Footer />
            </div>
        );
    }
});