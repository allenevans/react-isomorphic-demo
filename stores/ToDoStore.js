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
        if (this.isInitialized || this.tasks.length) {
            return;
        }

        console.log("Initialize", this.constructor.name);

        this.isInitialized = true;
        return Promise.resolve();
    }

    addTask(task) {
        this.tasks.push(task);
        this.eventEmitter_.emit("change");
    }
};