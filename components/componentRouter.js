/**
 * Created by allen on 02/06/2015.
 */
import React from "react";
import { canUseDOM } from "react/lib/ExecutionEnvironment";

// layouts
import DefaultLayout from "./layouts/DefaultLayout.js";

// pages
import IndexPage from "./pages/Index/IndexPage.js";
import CreatePage from "./pages/Create/CreatePage.js";
import NotFoundPage from "./pages/NotFound/NotFoundPage.js";

let routes = {
    "^/$" : {
        get : () => <DefaultLayout page={<IndexPage />} />
    },
    "^/new-todo" : {
        get : () => <DefaultLayout page={<CreatePage />}  />
    },
    "*" : {
        get : () => <DefaultLayout page={<NotFoundPage />} />
    }
};

export default (url) => new Promise((resolve, reject) => {
    let paths = Object.keys(routes);

    console.log("componentRouter", url);

    for (let path of paths) {
        if (
            (url === path || path === "*") ||   // exact match.
            (new RegExp(path, "i")).test(url)   // regex match.
        ) {
            let route = routes[path];
            resolve(route.get());

            return;
        }
    }

    // catch all route.
    resolve(routes["*"].get());
});