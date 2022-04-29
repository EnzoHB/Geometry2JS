import { Line } from "./Line.js";
import { Point } from "./Point.js";

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    get sin() {
        return this.y / this.length;
    };

    get cos() {
        return this.x / this.length;
    };

    get tan() {
        this.y / this.x;
    }

    get normalized() {
        return new Vector(this.cos, this.sin);
    };

    get length() {
        return Math.sqrt(
            this.x ** 2 +
            this.y ** 2
        );
    };

    get pair() {
        return [ this.x, this.y ]
    };

    get quadrant() {
        const sx = Math.sign(this.x);
        const sy = Math.sign(this.y);

        if (sx == 1) {
            if (sy == 1)
                return 1; 
                return 4; 
        } else {
            if (sy == 1) 
                return 2;
                return 3;
        }
    };

    scale(scalar) {
        return Vector.scale(this, scalar)
    };

    add(vector) {
        return Vector.add(this, vector);
    };

    rotate(radians) {
        return Vector.rotate(this, radians);
    };

    reflect(line) {
        return Vector.reflect(this, line);
    };

    static get origin() {
        return new Vector(0, 0);
    };

    static distance(a, b) {
        // Distance between two points formula
        return (
            Math.sqrt (
                (a.x - b.x) ** 2 +
                (a.y - b.y) ** 2
            )
        );
    };

    static from(cos, sin, length) {
        return new Vector(cos, sin).scale(length);
    };

    static add(vectorA, vectorB) {
        return new Vector(
            vectorA.x + vectorB.x,
            vectorA.y + vectorB.y
        );
    };

    static scale(vector, scalar) {
        return new Vector(
            vector.x * scalar,
            vector.y * scalar
        );
    };

    static rotate(vector, radians) {

        var sign = Math.sign(radians);
        var radians = Math.abs(radians);
        
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);

        // Trignometric Transformations
        sin = vector.sin * cos + sin * vector.cos * sign;
        cos = vector.cos * cos + vector.sin * sin * sign;

        let x = cos * vector.length;
        let y = sin * vector.length;

        return new Vector(x, y);
    };

    static reflect(vector, line) {

        line = line.normalized;


        // x = b2 - b1 / m1 - m2
        // y = m1x + b1

        let perpendicular = new Line(-1 / line.slope, vector);
        let intersection = Line.intersection(line, perpendicular);

        const x = intersection.x * 2 - vector.x;
        const y = intersection.y * 2 - vector.y;

        return new Vector(x, y);
    };
};

export { Vector };