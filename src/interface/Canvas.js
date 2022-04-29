import { Manager } from "./testers/index.js";

class Canvas {
    constructor(id) {

        const element = document.getElementById(id);;
        const context = element.getRenderingContext('2d');

        this.element = element;
        this.context = context;

        this.manager = new Manager(element);
        this.draw = new Drawer(element, context);
    };

    // ----------------- Getters -------------------- //

    get ctx() {
        return this.context;
    };

    get width() {
        return this.element.width;
    };

    get height() {
        return this.element.height;
    };

    get bound() {
        return this.element.getBoundingClientRect();
    };

    // --------- Aliases and Redirections ------------- //

    // Alias for:
    control() {
        return this.manager.control();
    };
};

export { Canvas }