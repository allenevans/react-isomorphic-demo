/**
 * Created by allen on 02/06/2015.
 */
require("babel/polyfill");

import React from "react";
import page from "page";
import App from "../components/App/App.js";
import spawn from "../utils/spawn.js";

import DefaultLayout from "../components/layouts/DefaultLayout.js";
import IndexPage from "../components/pages/Index/IndexPage.js";

import componentRouter from "../components/componentRouter.js";

export default class Client {
    constructor() {
        // route all push state page events through to the render method and let the component router handle routing.
        page("*", () => spawn(this.render));

        window.onpopstate = () => this.render(window.location.pathname + window.location.search);
    }
}

Client.prototype.render = function *() {
    let url = page.current || "/";

    let mountElement = document.getElementById("react-mount");
    let component = yield componentRouter(url);
    let title = (component.props.page && component.props.page.props.title) || null;

    React.render((<App content={component} />), mountElement, () => {
        console.log("Client-side mounted.");
    });

    document.title = title;
};