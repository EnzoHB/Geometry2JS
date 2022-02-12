import { Vector } from "./Vector.js";

class Angle {
    constructor(point, a, b) {
        this.point = point;
        this.vectorA = a.normalized;
        this.vectorB = b.normalized;
    };

    get bisector() {
        //return this.vectorA.rotate(this.radians / 2);
    };

    get radians() {
        var { vectorA } = this;
        var { vectorB } = this;

        return Vector.angle(vectorA, vectorB);
    };

    move(motion) {
        var { point } = this;
        var { vectorA } = this
        var { vectorB } = this;

        return new Angle(point.add(motion), vectorA, vectorB);
    };

    rotate(radians) {
        var { point } = this;
        var { vectorA } = this
        var { vectorB } = this;

        return new Angle(point, vectorA.rotate(radians), vectorB.rotate(radians));
    };

    static from(point, vector, radians) {
        return new Angle(point, vector, vector.rotate(radians)); 
    };
};

export { Angle }