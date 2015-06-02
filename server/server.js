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

var handleRoute = (req, res) => {
    res.render("index", {
        title : "Hello to you",
        content : "Hello world :)"
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

app.use("/public", express.static(path.join(process.cwd(), "./server/public/")));
app.use("/public/*", (req, res) => {
    // prevent calls to static resources from carrying on to the component router.
    res.end();
});
app.get("*", handleRoute);

var port = process.env.PORT || 3434;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
