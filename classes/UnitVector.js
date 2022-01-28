import { Angle } from './Angle.js';
import { Line } from './Line.js';
import { Point } from './Point.js';

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

    get angle() {
        const a = this.tip; 
        const b = Line.xAxis.x(a.x);

        return Angle.intersection([this.line, a], [Line.xAxis, b]);
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

    rotate(angle) {

    };
};

UnitVector.xAxis = new UnitVector(1, 0);
UnitVector.yAxis = new UnitVector(0, 1);

export { UnitVector }