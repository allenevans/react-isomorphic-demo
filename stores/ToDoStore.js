/*
 * File         :   ToDoStore.js
 * Description  :   User identity store.
 * ------------------------------------------------------------------------------------------------ */
import _Store from "./_Store.js";
import { canUseDOM } from "react/lib/ExecutionEnvironment";

export default class ToDoStore extends _Store {
    constructor() {
        super();
    }

    get tasks() {
        this.storage_.tasks = this.storage_.tasks || [];

        return this.storage_.tasks;
    }

    set tasks(value) {
        this.storage_.tasks = value;
    }

    initialize() {
        if (this.isInitialized) {
            return;
        }

        this.isInitialized = true;
        return new Promise(function (resolve) {
            setTimeout(function () {
                this.tasks.push(
                    { task : "1. Write a super awesome to do list app" },
                    { task : "2. Write a presentation" },
                    { task : "3. Present presentation" },
                    { task : "--- End of list ---" }
                );

                resolve();
            }.bind(this), 100);
        }.bind(this));
    }
};