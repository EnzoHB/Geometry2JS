import { Line } from './Line.js';
import { Point } from './Point.js';
import { Rotation } from './Rotation.js';

class UnitVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    get tip() {
        return new Point(this.x, this.y)
    };

    get tail() {
        return Point.origin;
    };

    get length() {
        return Point.distance(this.tail, this.tip)
    };

    get pair() {
        return [ this.x, this.y ];
    };

    get rotation() {
        return Rotation.fromPoint(this.tip);
    };

    get slope() {
        return (
            ( this.tail.y - this.tip.y ) / 
            ( this.tail.x - this.tip.x )
        );
    };

    get line() {
        const { x, y, slope } = this;
        const point = new Point(x, y);

        return new Line(point, slope);
    };

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return new UnitVector(this.x *= scalar, this.y *= scalar)
    };

    rotate(radians) {
        const { rotation, length } = this;
        const { cos, sin } = rotation.add(radians);
        const x = cos * length;
        const y = sin * length;

        return new UnitVector(x, y);
    };
};

UnitVector.xAxis = new UnitVector(1, 0);
UnitVector.yAxis = new UnitVector(0, 1);

export { UnitVector }