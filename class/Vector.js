import { Line } from "../classes/Line.js";

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
        return this.y / this.x;
    }

    get acos() {
        return Math.acos(this.cos);
    };

    get asin() {
        return Math.asin(this.sin);
    };

    get atan() {
        return Math.atan(this.tan);
    };

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

    dot(vector) {
        return Vector.dot(this, vector);
    };

    rotate(radians) {
        return Vector.rotate(this, radians);
    };

    angle(vector) {
        return Vector.angle(this, vector);
    };

    relative(vector) {
        return Vector.relative(this, vector)
    };

    reflect(line) {
        return Vector.reflect(this, line);
    };

    static get origin() {
        return new Vector(0, 0);
    };

    static get xAxis() {
        return new Vector(1, 0);
    };

    static get yAxis() {
        return new Vector(0, 1);
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

    static relative(vectorA, vectorB) {
        return new Vector(vectorB.x - vectorA.x, vectorB.y - vectorA.y);
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
        let sine = (vector.sin * cos) + (sin * vector.cos * sign);
        let cosine = (vector.cos * cos) + (vector.sin * sin * -sign);

        let x = cosine * vector.length;
        let y = sine * vector.length;

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

    static dot(vectorA, vectorB) {
        return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    };

    static angle(vectorA, vectorB) {
        return Math.acos(vectorA.dot(vectorB) / (vectorA.length * vectorB.length));
    };
};

export { Vector };