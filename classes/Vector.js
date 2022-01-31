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

    static fromRotation(rotation, length, basis) {

        const { point, sin, cos } = rotation;

        if (point != Point.origin) throw 'Creating a vector not centered at the origin';

        const x = point.x + cos * length;
        const y = point.y + sin * length;

        const tip = new Point(x, y);

        return new Vector(point, tip, basis);
    };

    static intersection(vectorA, vectorB) {
        return Angle.intersection([vectorA.line, vectorA.tip], [vectorB.line, vectorB.tip]);
    };

    static reflect(line, vector) {
        // Must return the vector corresponding 
    };

    static fromPoint(point, basis) {
        const { cos, sin } = Rotation.fromPoint(point);
        const length = Point.distance(point);

        const x = cos * length;
        const y = sin * length;

        return new Vector(x, y, basis);
    };
};

export { Vector }