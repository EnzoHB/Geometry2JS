import { Point } from "./Point.js";
import { Segment } from "./Segment.js";
import { Angle } from "./Angle.js";

class Line {
    constructor(point, slope) {
        this.point = point;
        this.slope = slope instanceof Point? new Segment(point, slope).slope : slope
    };

    get yIntercept() {
        return this.point.y - this.slope * this.point.x;
    }

    get axis() {

        if (this.slope == -Infinity || 
            this.slope ==  Infinity || 0)
            return -1; // Parallel to the y axis

        if (this.slope == 0)
            return 1; // Parallel to the x axis
            return null; // Not parallel
    };

    get angle() {
        return new Angle(Math.atan(this.slope), 0, this.point);
    };

    y(y) {
        if (this.axis == 1)
            return;

        if (this.axis == -1)
            return new Point(this.point.x, y);
            return new Point((y - this.yIntercept) / this.slope, y)
    };

    x(x) {
        if (this.axis == -1)
            return;

        if (this.axis == 1)
            return new Point(x, this.point.y);
            return new Point(x, this.slope * x + this.yIntercept);
    };

    rotate(rotation) {};

    static 
    fromAngle(line, angle) {
        return new Line(line.point, Math.tan(line.angle.radians + angle.radians))
    };

    static
    intersection(lineA, lineB) {

        // Lines are parallel or overlap
        if (lineA.slope == lineB.slope) 
            return null;

        // Both lines are parallel to one axis
        if (lineA.axis && lineB.axis) {

            if (lineA.axis == 1) 

                return new Point(lineB.point.x, lineA.point.y)
                return new Point(lineA.point.x, lineB.point.y);
        };

        // One of the lines is parallel and the other isn't
        if (lineA.axis || lineB.axis) {

            const parallel = lineA.axis? lineA : lineB;
            const concurrent = lineA.axis? lineB : lineA;
            const opposite = parallel.axis == 1? 'y' : 'x';

            return concurrent[opposite](parallel.point[opposite]);
        };

        // Both lines are concurrent;
        const x = ( lineB.yIntercept - lineA.yIntercept ) / ( lineA.slope - lineB.slope );
        const y = lineA.slope * x + lineA.yIntercept;

        return new Point(x, y);
    };

    static 
    distance(line, point) {
        const slope = - 1 / line.slope;
        const perpendicular = new Line(point, slope);

        const intersection = Line.intersection(line, perpendicular);

        return new Segment(point, intersection);
    };

    static 
    parallel(lineA, lineB) {
        // Y Axis Edge case
        if (lineA.axis + lineB == -2) 
            return true;

        if (lineA.slope == lineB.slope) 
            return true;
    };
    
    static
    perpendicular(lineA, lineB) {
        // Y Axis Edge case
        if (lineA.axis == -lineB.axis)
            return true;

        if (lineA.slope == - 1 / lineB.slope)
            return true;
    };

    static 
    concurrent(lineA, lineB) {
        return !Line.parallel(lineA, lineB);
    };

    static 
    overlap(lineA, lineB) {
        // Parallel Axis Edge Case
        if ((lineA.axis + lineB.axis) ** 2 == 4) {
             const axis = lineA.axis == 1? 'x' : 'y';

            if (lineA.point[axis] == lineB.point[axis])
                return true;
        };

        if (lineA.slope == lineB.slope && 
            lineA.yIntercept == lineB.yIntercept)
            return true; 
    };

    static 
    clockSide(line, point) {
        let xAxis = new Line(point, 0);
        let intersection = Line.intersection(line, xAxis)?.decimalCorrection(5);

        if (!intersection)
             intersection = Point.origin;

        let greater = point.x > intersection.x;
        let equal = point.x == intersection.x;

        if (line.slope <= 0)
            return greater? -1 : equal? 0 :  1;
            return greater?  1 : equal? 0 : -1;
    };

    static 
    counterSide(line, point) {
        let yAxis = new Line(point, Infinity);
        let intersection = Line.intersection(line, yAxis)?.decimalCorrection(5);

        if (!intersection)
             intersection = Point.origin;

        let greater = point.y > intersection.y;
        let equal = point.y == intersection.y;

        if (line.slope <= 0)
            return greater?  1 : equal? 0 : -1;
            return greater? -1 : equal? 0 :  1;
    };
};

Line.xAxis = new Line(Point.origin, 0);
Line.yAxis = new Line(Point.origin, Infinity);

export { Line };