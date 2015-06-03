/**
 * Created by allen on 02/06/2015.
 */
"use strict";

require("source-map-support").install();
require("babel/polyfill");

import React from "react";
import express from "express";
import expressHandlebars from "express-handlebars";
import path from "path";
import spawn from "../utils/spawn.js";
import favicon from "serve-favicon";

import App from "../components/App/App.js";

import DefaultLayout from "../components/layouts/DefaultLayout.js";
import IndexPage from "../components/pages/Index/IndexPage.js";

import componentRouter from "../components/componentRouter.js";
import _Store from "../stores/_Store";

var handleRoute = (req, res) => {
    spawn(function* () {
        try {
            let component = yield componentRouter(req.url);
            let content = React.renderToString(<App content={component} />);
            let title = (component.props.page && component.props.page.props.title) || null;
            let page = component.props.page;
            let pageProps = (page && page.props) || false;
            let stores = pageProps.stores && pageProps.stores[0];
            let serializedStores = {};

            Object.keys(stores || {}).forEach((propKey) => {
                if (stores[propKey] instanceof _Store) {
                    let store = stores[propKey];
                    serializedStores[propKey] = store.serialize();
                }
            });

            if (title === null) { console.warn("Document title should not be null."); }

            res.render("index", {
                title : title,
                content : content,
                state : JSON.stringify(serializedStores)
            });
        } catch (x) {
            console.error(x, x.stack);
            throw x;
        }
    });
};

var app = express();
var handlebars = expressHandlebars.create({
    defaultLayout : "main",
    layoutsDir: "./server/views/layouts",
    partialsDir : [ "./server/views/partials" ]
});

app.set("views", path.join(process.cwd(), "server/views"));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// handle static file calls
app.use(favicon(path.join(process.cwd(), "server/public/favicon.ico")));
app.use("/public", express.static(path.join(process.cwd(), "./build/server/public/")));
app.use("/public/*", (req, res) => {
    // prevent calls to static resources from carrying on to the component router.
    res.end();
});

// catch all, pass to the component route handler.
app.get("*", handleRoute);

var port = process.env.PORT || 3434;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
