import { Vector } from "../class/Vector.js";

class Velocity {
    constructor(velocity, tick) {
        this.velocity = velocity;
        this.tick = tick;
    };

    get cos() {
        return this.velocity.cos;
    };

    get sin() {
        return this.velocity.sin;
    };

    *apply() {
        let instant = 1 / this.tick;
        let resultant = new Vector(this.cos, this.sin).scale(instant * this.velocity.length);
                
        for (let i = 0;;i++)  
            yield resultant;
    };

    [Symbol.iterator]() {
        return this.apply();
    };
};

export { Velocity };