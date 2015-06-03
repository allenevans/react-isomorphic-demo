/*
 * File         :   _Store.js
 * Description  :   Store superclass.
 * ------------------------------------------------------------------------------------------------ */
import { EventEmitter } from "events"
import { canUseDOM } from "react/lib/ExecutionEnvironment";
import strings from "../utils/strings";

var storagePtr = Symbol();
var eventPtr = Symbol();
var data = {};

export default class _Store {
    constructor() {
        this[storagePtr] = canUseDOM ? data : {};
        this[eventPtr] = new EventEmitter();
        this.isInitialized = false;

        if (canUseDOM) {
            let stateElement = document.getElementById("stores-state");
            if (stateElement) {
                let storeState = (stateElement.innerText && JSON.parse(stateElement.innerText)) || {};
                let storeKey = this.constructor.name;
                let data = storeState[strings.lowerCaseFirst(storeKey)];

                data && this.hydrate(JSON.parse(data));
                stateElement.innerText = "";
            }
        }
    }

    get storage_() {
        return this[storagePtr];
    }

    get eventEmitter_() {
        return this[eventPtr];
    }

    initialize() {
        return Promise.resolve();
    }

    hydrate(state) {
        if (!this.isInitialized) {
            console.log(this.constructor.name, "hydrating");
            this[storagePtr] = state || {};
        }
        this.isInitialized = true;
    }

    serialize() {
        return JSON.stringify(this[storagePtr]);
    }

    on(event, func) {
        console.log("listen to", event, this.constructor.name);
        this.eventEmitter_.on(event, func.bind(this));
    }
};