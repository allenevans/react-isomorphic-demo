/**
 * Created by allen on 02/06/2015.
 */
import React from "react";
import page from "page";
import App from "../components/App/App.js";

import DefaultLayout from "../components/layouts/DefaultLayout.js";
import IndexPage from "../components/pages/Index/IndexPage.js";

export default class Client {
    constructor() {
        // route all push state page events through to the render method and let the component router handle routing.
        page("*", () => this.render());

        window.onpopstate = () => this.render(window.location.pathname + window.location.search);
    }

    render(url) {
        let mountElement = document.getElementById("react-mount");

        let component = <DefaultLayout page={<IndexPage />} />;
        let title = (component.props.page && component.props.page.props.title) || null;

        React.render((<App content={component} />), mountElement, () => {
            console.log("Client-side mounted.");
        });

        document.title = title;
    }
}