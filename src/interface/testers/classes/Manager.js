import { Control } from "./Control.js";

class Manager {
    constructor(element) {
        this.controllers = new Map;
        this.element = element;

        this.control = 
        this.control.bind(this);
    };

    get(name) {
        return this.controllers.get(name);
    };

    remove(name) {
        return this.controllers.delete(name);
    };

    control() {

        Control.done = instance => {

            // Anonymous Controllers
            if (!instance.name) return;

            // Later use;
            this.controllers.set(instance.name, instance);
        };

        return new Control().element(this.element);
    };
};

export { Manager }
