import { Vector } from "./Vector.js";

class Segment {
    constructor(tail, tip) {
        this.tail = tail;
        this.tip = tip;
    };

    get mid() {
        return new Vector (
            (this.tip.x + this.tail.x) / 2,
            (this.tip.y + this.tail.y) / 2, 
        );
    };

    get vector() {
        return new Vector (
            this.tip.x - this.tail.x, 
            this.tip.y - this.tail.y
        );
    };

    get length() {
        return this.vector.length;
    };

    get cos() {
        return this.vector.cos;
    };

    get sin() {
        return this.vector.sin;
    };

    get tan() {
        return this.vector.tan;
    };

    get slope() {
        return this.vector.tan;
    }

    rotate(radians) {
        var { vector } = this;
        var { tail } = this;

        return new Segment(tail, vector.rotate(radians).add(tail))
    };

    move(vector) {
        var { tip } = this;
        var { tail } = this;

        return new Segment(tail.add(vector), tip.add(vector));
    };

    static intersect(segment) {
        
    };
};
export { Segment }