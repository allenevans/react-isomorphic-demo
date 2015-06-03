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

// dispatcher
import dispatcher from "../infrastructure/dispatcher";

let routes = {
    "^/$" : {
        stores : [ToDoStore],
        get : (stores) => <DefaultLayout page={<IndexPage stores={stores}/>} />
    },
    "^/new-todo" : {
        stores : [ToDoStore],
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
                        let storeName = strings.lowerCaseFirst(store.constructor.name);

                        initializedStores[storeName] = initializedStores[storeName] || store;
                        dispatcher.stores[storeName] = initializedStores[storeName];

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