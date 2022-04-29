import { Staged } from "../../../utils/Staged.js";

class Control extends Staged {
    constructor() {
        super(Control);

        this.setter('name');
        this.setter('event');
        this.setter('element', {});
        this.setter('exec', () => {});
    };

    attach() {
        return this.build();
    };

    // ------------------------------ //

    enable() {
        this.only();
        this.element.addEventListener(this.event, this.exec);
    };

    disable() {
        this.only();
        this.element.removeEventListener(this.event, this.exec);
    };
};


export { Control };