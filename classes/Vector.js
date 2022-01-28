import { Angle } from './Angle.js';
import { Basis } from './Basis.js';
import { Point } from './Point.js';
import { UnitVector } from './UnitVector.js';

class Vector extends UnitVector {
    constructor(x, y, basis) {
        super(x, y);
        this.basis = basis || Basis.cartesian;
    };

    get point() {
        var { ih, x, jh, y } = this;
        var { x, y } = Vector.add(ih.scale(x), jh.scale(y));

        return new Point(x, y);
    };

    get ih() {
        const { x, y } = this.basis.ih;
        return new UnitVector(x, y)
    };

    get jh() {
        const { x, y } = this.basis.jh;
        return new UnitVector(x, y)
    };

    scale(scalar) {
        var x = this.x * scalar;
        var y = this.y * scalar;

        return new Vector(x, y, this.basis);
    };

    rotate(angle) {

    };

    static add(va, vb) {
        if (va.basis != vb.basis) 
            return;
            return new Vector(va.x + vb.x, va.y + vb.y, va.basis)
    };

    static dot(va, vb) {
        if (va.basis != vb.basis) 
            return;
            return new Vector(va.x * vb.x, va.y * vb.y. va.basis);

    };

    static cross() {};

    static fromLangle(angle, length) {

    };

    static intersection(vectorA, vectorB) {
        return Angle.intersection([vectorA.line, vectorA.tip], [vectorB.line, vectorB.tip]);
    };
};

const vector = new Vector(4, -4);
const vector1 = new Vector(-4, 7);

console.log(degrify(Vector.intersection(vector, vector1)));

function degrify(angle) {
    return {
        radians: Angle.raddeg(angle.radians),
        rotation: Angle.raddeg(angle.rotation) 
    }
};