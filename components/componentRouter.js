/**
 * Created by allen on 02/06/2015.
 */
import React from "react/addons";
import { canUseDOM } from "react/lib/ExecutionEnvironment";
import strings from "../utils/strings.js";

// layouts
import DefaultLayout from "./layouts/DefaultLayout.js";

// pages
import IndexPage from "./pages/Index/IndexPage.js";
import CreatePage from "./pages/Create/CreatePage.js";
import NotFoundPage from "./pages/NotFound/NotFoundPage.js";

// stores
import ToDoStore from "../stores/ToDoStore.js";

let routes = {
    "^/$" : {
        stores : [ToDoStore],
        get : (stores) => <DefaultLayout page={<IndexPage stores={stores}/>} />
    },
    "^/new-todo" : {
        get : () => <DefaultLayout page={<CreatePage />}  />
    },
    "*" : {
        get : () => <DefaultLayout page={<NotFoundPage />} />
    }
};

export default (url) => new Promise((resolve, reject) => {
    var initializedStores = {};
    let paths = Object.keys(routes);

    console.log("componentRouter", url);

    for (let path of paths) {
        if (
            (url === path || path === "*") ||   // exact match.
            (new RegExp(path, "i")).test(url)   // regex match.
        ) {
            let route = routes[path];
            let stores = route.stores || [];

            try {
                Promise.all(
                    stores.map((Store) => {
                        let store = new Store();
                        initializedStores[strings.lowerCaseFirst(store.constructor.name)] = store;

                        return store.initialize();
                    })
                ).
                    then(() => {
                        resolve(route.get([initializedStores || {}]));
                    }).
                    catch((error) => {
                        res.write(JSON.stringify(error));
                        res.end();
                    });
            } catch(x) {
                console.error(x);
            }

            return;
        }
    }

    // catch all route.
    resolve(routes["*"].get());
});