/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

import Anchor from "../elements/Anchor.js";

export default React.createClass({

    render : function () {
        return <header className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <Anchor className="navbar-brand" href="/">Mega Awesome To Do List</Anchor>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><Anchor href="/new-todo">New To Do</Anchor></li>
                    </ul>
                </div>
            </div>
        </header>;
    }
});