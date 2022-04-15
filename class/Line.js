import { Vector } from "./Vector.js";

class Line {
    constructor(point, vector) {
        this.point = point;
        this.vector = vector.normalized;
    };

    get slope() {
        return this.vector.tan;
    };

    get intercept() {

        var { point: { x, y } } = this;
        var { slope } = this;

        return y - slope * x;
    }

    get axis() {
        var { vector } = this;
        var { acos } = vector;

        if (acos % Math.PI == 0) 
            return 1;

        if (acos == Math.PI / 2)
            return -1;
            return null;
    };

    get perpendicular() {
        var { point } = this;
        var { vector } = this;

        return new Line(point, vector.rotate(Math.PI / 2));
    };
    
    x(x) {
        var { axis } = this;
        var { point } = this;

        if (axis == -1)
            return;

        if (axis == 1)
            return new Vector(x, point.y);
            return new Vector(x, this.slope * x + this.intercept); 
    };

    y(y) {
        var { axis } = this;
        var { point } = this;

        if (axis == 1)
            return;

        if (axis == -1)
            return new Vector(point.x, y);
            return new Vector((y - this.intercept) / this.slope, y); 
    };

    rotate(radians) {
        var { point } = this;
        var { vector } = this;

        return new Line(point, vector.rotate(radians));
    };

    move(motion) {
        var { point } = this;
        var { vector } = this;

        return new Line(point.add(motion), vector);
    };

    intersection(line) {
        return Line.intersection(this, line);
    };

    isParallel(line) {
        return Line.parallel(this, line)
    };

    isPerpendicular(line) {
        return Line.perpendicular(this, line)
    };

    isConcurrent(line) {
        return Line.concurrent(this, line)
    };

    static from(point, slope) {

        var atan = Math.atan(slope);
        var cos = Math.cos(atan);
        var sin = Math.sin(atan);

        return new Line(point, new Vector(cos, sin))
    };

    static parallel(a, b) {

        // Y Axis Edge case
        if (a.axis + b.axis == -2)
            return true;

        if (a.slope == b.slope) 
            return true;
            return false;
    };
    
    static perpendicular(lineA, lineB) {

        // Axis Edge case
        if (lineA.axis == -lineB.axis)
            return true;

        if (lineA.slope == - 1 / lineB.slope)
            return true;
            return false;
    };

    static concurrent(lineA, lineB) {
        return !Line.parallel(lineA, lineB);
    };

    static intersection(lineA, lineB) {

        if (lineA.slope == lineB.slope)
            return null;

        if (lineA.axis && lineB.axis) {
            
            let { point: { x } } = lineA.axis == 1? lineB : lineA;
            let { point: { y } } = lineA.axis == 1? lineA : lineB;  

            return new Vector(x, y);
        };

        if (lineA.axis || lineB.axis) {

            var concurrent = lineA.axis? lineB : lineA;
            var parallel = lineA.axis? lineA : lineB;
            var opposite = parallel.axis == 1? 'y' : 'x';

            return concurrent[opposite](parallel.point[opposite]);
        };

        
        let y = ( lineA.intercept - lineB.intercept ) / ( lineA.slope - lineB.slope );
        let x = ( y - lineA.intercept ) / lineA.slope;

        return new Vector(x, y);
    };
};

export { Line }