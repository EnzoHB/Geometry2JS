import { Point } from './Point.js';
import { Line } from './Line.js';
import { Angle } from './Angle.js';
import { Rotation } from './Rotation.js';
import { Circle } from './Circle.js';

class Segment {
    constructor(...points) {
        this.tail = points[0];
        this.tip = points[1];
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
        return new Line(this.tail, this.tip);
    };

    get slope() {
        return (
            ( this.tail.y - this.tip.y ) / 
            ( this.tail.x - this.tip.x )
        );
    };

    get rotation() {
        const enzo = Rotation.fromPoint(this.tip, this.tail)
        return enzo;
    };

    /*
    static fromLotation(rotation, length, segment) {

        const circle = new Circle(segment.tail, length);
        const line = new Line(segment.tail, rotation.tan);

        /*
        const l = length;
        const m = Math.tan(rotation.radians);
        const x = Math.sqrt(l*l / 1 + m*m);

        
        const intersection = Circle.intersection(circle, line);

        let right;
        let ninety = Math.PI / 2
        if (ninety > rotation.radians > -ninety) 
             right = intersection[0]
        else right = intersection[1]

        return new Segment(segment.tail, right)
    };
    */

    rotate(radians) {
        const rotation = this.rotation.add(radians);

        const x = rotation.cos * this.length;
        const y = rotation.sin * this.length;

        const x1 = this.tail.x + x;
        const y1 = this.tail.y + y;

        return new Segment(this.tail, new Point(x1, y1));
    };
};

export { Segment };