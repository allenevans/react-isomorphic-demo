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

import App from "../components/App/App.js";

import DefaultLayout from "../components/layouts/DefaultLayout.js";
import IndexPage from "../components/pages/Index/IndexPage.js";

import componentRouter from "../components/componentRouter.js";

var handleRoute = (req, res) => {
    spawn(function* () {
        try {
            let component = yield componentRouter(req.url);
            let content = React.renderToString(<App content={component} />);
            let title = (component.props.page && component.props.page.props.title) || null;

            if (title === null) { console.warn("Document title should not be null."); }

            res.render("index", {
                title : title,
                content : content
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

app.use("/public", express.static(path.join(process.cwd(), "./build/server/public/")));
app.use("/public/*", (req, res) => {
    // prevent calls to static resources from carrying on to the component router.
    res.end();
});
app.get("*", handleRoute);

var port = process.env.PORT || 3434;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
