import { Vector } from "../class/Vector.js";

class Force extends Vector {
    constructor(x, y) {
        super(x, y);
    };

    [Symbol.iterator]() {
        return this.apply();
    };

    *apply() {
        while(true)
        yield this;
    };
}

export { Force }