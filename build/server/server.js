/**
 * Created by allen on 02/06/2015.
 */
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

require("source-map-support").install();
require("babel/polyfill");

var handleRoute = function handleRoute(req, res) {
    res.render("index", {
        title: "Hello to you",
        content: "Hello world :)"
    });
};

var app = (0, _express2["default"])();
var handlebars = _expressHandlebars2["default"].create({
    defaultLayout: "main",
    layoutsDir: "./server/views/layouts",
    partialsDir: ["./server/views/partials"]
});

app.set("views", _path2["default"].join(process.cwd(), "server/views"));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use("/public", _express2["default"]["static"](_path2["default"].join(process.cwd(), "./server/public/")));
app.use("/public/*", function (req, res) {
    // prevent calls to static resources from carrying on to the component router.
    res.end();
});
app.get("*", handleRoute);

var port = process.env.PORT || 3434;
app.listen(port, function () {
    console.log("Express server is listening on port " + port);
});
//# sourceMappingURL=../server/server.js.map