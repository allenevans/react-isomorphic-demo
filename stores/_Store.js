/*
 * File         :   _Store.js
 * Description  :   Store superclass.
 * ------------------------------------------------------------------------------------------------ */
import { canUseDOM } from "react/lib/ExecutionEnvironment";
import strings from "../utils/strings";

var storagePtr = Symbol();
export default class _Store {
    constructor() {
        this[storagePtr] = {};
        this.isInitialized = false;

        if (canUseDOM) {
            let stateElement = document.getElementById("stores-state");
            if (stateElement) {
                let storeState = (stateElement.innerText && JSON.parse(stateElement.innerText)) || {};
                let storeKey = this.constructor.name;
                let data = storeState[strings.lowerCaseFirst(storeKey)];

                data && this.hydrate(JSON.parse(data));
            }
        }
    }

    get storage_() {
        return this[storagePtr];
    }

    initialize() {
        return Promise.resolve();
    }

    hydrate(state) {
        this[storagePtr] = state || {};
        this.isInitialized = true;
    }

    serialize() {
        return JSON.stringify(this[storagePtr]);
    }
};