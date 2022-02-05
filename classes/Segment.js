/**
 * Class Segment
 * The segment is the third building block. 
 * Can be defined as the conection 
 * between two points in the space
 * 
 */

import { Point } from './Point.js';
import { Line } from './Line.js';
import { Rotation } from './Rotation.js';

class Segment {
    constructor(tail, tip) {
        this.tail = tail;
        this.tip = tip;
    };

    get length() {
        const { tail, tip } = this;
    
        return Point.distance(tail, tip);
    };

    get middle() {
        const { tail, tip } = this;
        
        return new Point (
            ( tail.x + tip.x ) / 2 ,
            ( tail.y + tip.y ) / 2
        );
    };

    get line() {
        return new Line(this.slope, this.tail);
    };

    get slope() {
        return (
            ( this.tail.y - this.tip.y ) / 
            ( this.tail.x - this.tip.x )
        );
    };

    get rotation() {
        return Rotation.fromPoint(this.tip, this.tail)
    };

    rotate(radians) {
        
        var { rotation, length } = this;
        var rotation = rotation.add(radians);

        return Segment.fromRotation(rotation, length)
    };

    static fromRotation(rotation, length) {

        const { point, sin, cos } = rotation;

        const x = point.x + cos * length;
        const y = point.y + sin * length;

        const tip = new Point(x, y);

        return new Segment(point, tip);
    };
};

export { Segment };