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
import App from "../components/App/App.js";

import DefaultLayout from "../components/layouts/DefaultLayout.js";
import IndexPage from "../components/pages/Index/IndexPage.js";

var handleRoute = (req, res) => {
    let component = <DefaultLayout page={<IndexPage />} />;
    let content = React.renderToString(<App content={component} />);
    let title = (component.props.page && component.props.page.props.title) || null;

    res.render("index", {
        title : title,
        content : content
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
app.get("*", handleRoute);

var port = process.env.PORT || 3434;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
