/**
 * Class Line
 * The fourth building block of all geometry. 
 * A line can be simply defined be an equation
 * y = mx + b
 * 
 */

import { Point } from "./Point.js";
import { Segment } from "./Segment.js";
import { Rotation } from "./Rotation.js";
import { Angle } from "./Angle.js";

class Line {
    constructor(slope, point) {

        this.point = point || Point.origin;
        this.slope = slope || 0
    };

    get yIntercept() {

        // Y Intercept is defined by "When x is 0, y is what?"
        return this.point.y - this.slope * this.point.x;
    }

    get axis() {

        if (this.slope == -Infinity || 
            this.slope ==  Infinity || 0)
            return -1; // Parallel to the y axis

        if (this.slope == 0)
            return 1; // Parallel to the x axis
            return null; // Not parallel to any axis
    };

    get tan() {
        // Alias for slope
        return this.slope;
    }

    get angle() {
        return new Angle(Math.atan(this.tan), new Rotation(0, this.point));
    };

    get normalized() {
        return new Line(this.slope, Point.origin);
    };
    
    y(y) {
        // When the line is parallel
        // to the xAxis, y can't vary

        if (this.axis == 1)
            return;

        // If the line is parallel to the yAxis
        // given any y, x is always the same

        if (this.axis == -1)
            return new Point(this.point.x, y);

        // Given the line equation, find X
        return new Point((y - this.yIntercept) / this.slope, y)
    };

    x(x) {
        if (this.axis == -1)
            return;

        if (this.axis == 1)
            return new Point(x, this.point.y);
            return new Point(x, this.slope * x + this.yIntercept);
    };

    rotate(radians) {

        const { tan, point } = this;

        const rotation = Math.atan(tan) + radians;
        const slope = new Rotation(rotation).tan;
        
        return new Line(slope, point);
    };

    static fromRotation({ point, tan }) {
        return new Line(tan, point)
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

        // Perpendicular lines have always inverse reciprocals as slopes
        const slope = - 1 / line.slope;
        const perpendicular = new Line(slope, point);

        // Intersection
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

        // Imagine a line parallel to the xAxis
        // Everything below it is right 
        // Everyhting above it is left 
        // Returns if the point is right or left; 

        let xAxis = new Line(0, point);
        let intersection = Line.intersection(line, xAxis)?.decimalCorrection(5);

        let greater = point.x > intersection.x;
        let equal = point.x == intersection.x;

        if (line.slope <= 0)
            return greater? -1 : equal? 0 :  1;
            return greater?  1 : equal? 0 : -1;
    };

    static 
    counterSide(line, point) {

        // Imagine a line parallel to the yAxis
        // Returns if the point is right of left

        let yAxis = new Line(Infinity, point);
        let intersection = Line.intersection(line, yAxis)?.decimalCorrection(5);

        let greater = point.y > intersection.y;
        let equal = point.y == intersection.y;

        if (line.slope <= 0)
            return greater?  1 : equal? 0 : -1;
            return greater? -1 : equal? 0 :  1;
    };
};

Line.xAxis = new Line(0, Point.origin);
Line.yAxis = new Line(Infinity, Point.origin);

export { Line };