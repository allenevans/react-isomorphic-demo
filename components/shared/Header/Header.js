/**
 * Created by allen on 02/06/2015.
 */
import React from "react";

export default React.createClass({

    render : function () {
        return <header className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Mega Awesome To Do List</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="/new-todo">New To Do</a></li>
                    </ul>
                </div>
            </div>
        </header>;
    }
});