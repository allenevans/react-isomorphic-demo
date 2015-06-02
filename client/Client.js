/**
 * Created by allen on 02/06/2015.
 */

export default class Client {
    constructor() {
        // route all push state page events through to the render method and let the component router handle routing.
        page("*", () => this.render());

        window.onpopstate = () => this.render(window.location.pathname + window.location.search);
    }

    render(url) {
        let mountElement = document.getElementById("react-mount");

        console.log("REACT MOUNT", mountElement);
    }
}