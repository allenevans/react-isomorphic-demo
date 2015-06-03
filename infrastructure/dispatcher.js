/**
 * Created by allen on 03/06/2015.
 */
class Dispatcher {
    constructor() {
        this.stores = {
            toDoStore: {}
        };
    }

    handle(event, payload) {
        if (event === "ADD_TASK") {
            this.stores.toDoStore.addTask(payload);
        }
    }
}

let dispatcher = new Dispatcher();
export default dispatcher;