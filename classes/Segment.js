import { Point } from './Point.js';
import { Line } from './Line.js';

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
};

export { Segment };