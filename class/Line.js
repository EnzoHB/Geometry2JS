import { Vector } from "./Vector.js";
import { Constant, Linear, equals, system, plugin } from '../Math/Algebra.js';

class Line {
    constructor(m, b) {

        //  ( y, y0 ) = m ( x, x0 ) + b;
        this.m = m;
        this.b = b;
    };

    get equation() {
        let { m } = this;
        let { b } = this;

        let { infiniteSlope} = this;
        let { nullSlope } = this;

        if (infiniteSlope || nullSlope)
            return new Constant(b);
            return new Linear(m, b);
    };

    x(x) {

        let { infiniteSlope} = this;
        let { equation } = this; 

        // If it is constant, then the x argument does nothing;
        let y = equation.eval(x);

        if (infiniteSlope) 
            throw new Error(Line.cantDefine);
            return new Vector(x, y);
    };

    y(y) {
        let { infiniteSlope} = this;
        let { nullSlope } = this;
        let { equation } = this; 

        // When the slope is Infinity, it means B is the X coordinate;
        let { b } = this;
 
        // We have to solve for X because the main equation is solved for Y;
        let x = new Constant(y).equals(equation).solve().at();

        if (nullSlope) 
            throw new Error(Line.cantDefine);

        if (infiniteSlope) 
            return new Vector(b, y);
            return new Vector(x, y);
    };

    // ------------ Methods ------------ // 

    static intersectionPoint(a, b) {

        if (a.m === b.m) throw new Error(Line.cantDefine);

        if (a.infiniteSlope && b.nullSlope) return new Vector(a.equation.eval(), b.equation.eval());
        if (b.infiniteSlope && a.nullSlope) return new Vector(b.equation.eval(), a.equation.eval());

        if (a.infiniteSlope) return new Vector(...plugin(a.equation, b.equation));
        if (b.infiniteSlope) return new Vector(...system(a.equation, b.equation));
    
        return new Vector(...system(a.equation, b.equation));
    };
    
    static rotate() {

    };

    // ------------ Utility ------------ // 

    get infiniteSlope() {
        return Line.infiniteSlope(this.m);
    };

    get nullSlope() {
        return Line.nullSlope(this.m);
    };

    static infiniteSlope(m) {
        return Math.abs(m) === Infinity;
    };

    static nullSlope(m) {
        return Math.abs(m) === 0;
    };

    // ---------- Error Logs ---------- //

    static get cantDefine() {
        return `Can't define a vector point for the given line slope`;
    };

    // ---------- From Methods ----------- //

    static fromSlope(slope, vector) {
        return new Line(slope, vector.y)
    };

    static fromIntercept(intercept, vector) {
        return new Line(vector.tan, intercept);
    };

    static fromVectors(a, b) {
        let slope = ( a.y - b.y ) / ( a.x - b.x );
        let intercept = a.y - a.x * m;

        return new Line(slope, intercept);
    };

    // ------------------------------------ //

    static distanceFromVector(l, v) {

        let i;
        let p;
        let m = -1 / l.m;
        let b = v.y - v.x * m;

        if (Line.nullSlope(m)) b = v.y;
        if (Line.infiniteSlope(m)) b = v.x;

        p = Line.create(m, b);
        i = Line.intersectionPoint(l, p);

        return Vector.distance(v, i);
    };

    static create(m, b) {
        return new Line(m, b);
    }
};

export { Line }




/*
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

*/