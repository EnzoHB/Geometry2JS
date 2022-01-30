import { Angle } from './Angle.js';
import { Basis } from './Basis.js';
import { Point } from './Point.js';
import { Rotation } from './Rotation.js';
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

    rotate(radians) {
        const { rotation, length } = this;
        const { cos, sin } = rotation.add(radians);
        const x = cos * length;
        const y = sin * length;

        return new Vector(x, y, this.basis);
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

    static fromLotation(rotation, length, basis) {

        const l = length;
        const m = Math.tan(rotation.radians);
        const x = Math.sqrt(l*l / 1 + m*m);

        let ninety = Math.PI / 2
        if (ninety > rotation.radians > -ninety) 
            return new Vector(x, m *  x, basis || Basis.cartesian);
            return new Vector(-x, m * -x, basis || Basis.cartesian);
    };

    static intersection(vectorA, vectorB) {
        return Angle.intersection([vectorA.line, vectorA.tip], [vectorB.line, vectorB.tip]);
    };

    static reflect(line, vector) {
        // Must return the vector corresponding 
    };

    static fromPoint(point) {};
};

function degrify(vector) {
    const { angle, rotation } = vector;

    return {
        angle: {
            radians: Angle.raddeg(angle.radians),
            rotation: Angle.raddeg(angle.rotation.radians) 
        } ,
        rotation: Angle.raddeg(rotation.radians)
    }
};

const vector = Vector.fromLotation(new Rotation(0.1418970546041639), 7.0710678118654755);

// 0.1418970546041639
// 7.0710678118654755

//console.log(vector)

export { Vector }