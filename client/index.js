/**
 * Created by allen on 02/06/2015.
 */
import Client from "./Client.js";
import page from "page"; // https://github.com/visionmedia/page.js

(() => {
    var bootstrap = () => {
        new Client();
        page(window.location.pathname + window.location.search);
    };

    if (document.addEventListener && !document.readyState) {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                bootstrap();
            },
            false);
    } else if (!(document.readyState === "complete" || document.readyState === "loaded")) {
        setTimeout(() => {
            bootstrap();
        }, 0);
    } else {
        bootstrap();
    }
})();
