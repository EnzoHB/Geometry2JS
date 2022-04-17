import { Line } from "./Line.js";
import { Vector } from "./Vector.js";
import { Constant, Linear, Quadratic, minus, sum, plugin } from '../Math/Algebra.js';

class Arc {};
class Elipse {};

class Circle {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    };

    get equation() {
        let x = new Linear(1, -this.center.x).square()
        let y = new Linear(1, -this.center.y).square();
        let r = new Constant(this.radius).square();

        return { x, y, r };
    };

    y(y) {

    };

    x(x) {

    };

    static intersectingCircleLine() {

    };

    static intersectingCircles(...circles) {

        let f = 0;
        let s = 1;

        let st = circles[f].equation;
        let nd = circles[s].equation;

        let x = minus(st.x, nd.x);
        let y = minus(st.y, nd.y);
        let r = minus(st.r, nd.r);

        let eq = new Linear(-x.b / y.b, (r.c - x.c - y.c) / y.b);
        
        let yc = new Constant(st.y.c);
        let rc = new Constant(-st.r.c); // Passed R² to the other side

        let fn = sum(st.x, eq.square(), eq.multiply(st.y.b), yc, rc);

        let sl = fn.solve().map(x => new Vector(...plugin(x, eq)));

        console.log(fn.solve())


        /*

        let f = 0;
        let s = 1;

        let stEquation = circles[f].equation;
        let ndEquation = circles[s].equation;

        let xEquation = minus(stEquation.x, ndEquation.x);
        let yEquation = minus(stEquation.y, ndEquation.y);
        let rEquation = minus(stEquation.r, ndEquation.r);

        let equation = new Linear(-xEquation.b / yEquation.b, (rEquation.c - xEquation.c - yEquation.c) / yEquation.b);

        let testSquared = equation.square();
        let test = equation.multiply(stEquation.x.b);
        let t = new Constant(stEquation.x.c);
        
        let finalQuadratic = sum(stEquation.x, testSquared, test, t);

        finalQuadratic.solve();

        /*

        // Rearranging the independent terms from both circle equations;
        let fIndependent = circles[f].radius**2 - circles[f].center.x**2 - circles[f].center.y**2;
        let sIndependent = circles[s].radius**2 - circles[s].center.x**2 - circles[s].center.y**2;

        // Second degree terms cancel out, therefore we don't need to do anything;

        // Subtracting the first degree coefficients from both circle equations;
        let xFirstDegreeCoeficient = -2*circles[f].center.x - ( -2*circles[s].center.x );
        let yFirstDegreeCoeficient = -2*circles[f].center.y - ( -2*circles[s].center.y );

        // Subtracting the independent terms from both circle equations;
        let independentTerm = fIndependent - sIndependent;

        // When the y coeficcients cancel out, we must solve for x directly;
        if (!yFirstDegreeCoeficient) {

            let x = independentTerm / xFirstDegreeCoeficient;

            let a = 1;
            let b = -2 * circles[f].center.y;
            let c = ( x - circles[f].center.x )**2 + circles[f].center.y**2 - circles[f].radius**2;

            return solve2nd(a, b, c).map(y => {
                return new Vector(x, y);
            });
        };

        // When the x coefficients cancel out, we must solve for x directly;
        if (!xFirstDegreeCoeficient) {

            let y = independentTerm / yFirstDegreeCoeficient;

            let a = 1;
            let b = -2 * circles[f].center.x;
            let c = ( y - circles[f].center.y )**2 + circles[f].center.x**2 - circles[f].radius**2;

            return solve2nd(a, b, c).map(x => {
                return new Vector(x, y);
            });
        };

        // Solving the equation for Y
        let solvedForCoefficient = -xFirstDegreeCoeficient / yFirstDegreeCoeficient;
        let solvedForIndependent = independentTerm / yFirstDegreeCoeficient;

        // Expanding a trinomial expression for dealing with the y squared in the original equation;
        let [ ndDegree, stDegree, independent ] = expand(solvedForCoefficient, solvedForIndependent, 1);

        // Solving the second degree equation for X;
        let a = 1 + ndDegree;
        let b = -2 * circles[f].center.x + ( -2 * circles[f].center.y ) * ((independentTerm - xFirstDegreeCoeficient) / yFirstDegreeCoeficient ) + stDegree; 
        let c = circles[f].center.x**2 + circles[f].center.y**2 - circles[f].radius**2 + independent;

        return solve2nd(a, b, c).map(x => {
            return new Vector(x, solvedForCoefficient * x + solvedForIndependent);
        });

        */
    };

    // --------------- Movement ------------------- //

    move() {};
    rotate() {};

    // --------------- Lazy Methods ------------------- //

    static intersectingCirclesLazy(...circles) {
        return Vector.distance(
            circles[0].center, circles[1].center) <= 
            circles[0].radius + circles[1].radius;
    };

    static intersectingCircleLineLazy(circle, line) {
        return Line.distanceFromVector(line, circle.center) <= circle.radius;
    };
};

const c1 = new Circle(new Vector(1, 2), 1);
const c2 = new Circle(new Vector(2, 1), 1);

console.log(Circle.intersectingCircles(c1, c2));
export { Circle };