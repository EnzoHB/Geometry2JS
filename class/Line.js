import { Vector } from "./Vector.js";

class Line {
    constructor(point, vector) {
        this.point = point;
        this.vector = vector.normalized;
    };

    get slope() {
        return this.vector.tan;
    };

    get intercepts() {

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
            return 0;
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

    intersect(line) {
        return Line.intersect(this, line);
    };

    parallel(line) {
        return Line.parallel(this, line)
    };

    perpendicular(line) {
        return Line.perpendicular(this, line)
    };

    concurrent(line) {
        return Line.concurrent(this, line)
    };

    static from(point, slope) {

        var atan = Math.atan(slope);
        var cos = Math.cos(atan);
        var sin = Math.sin(atan);

        return new Line(point, new Vector(cos, sin))
    };

    static parallel(lineA, lineB) {

        // Y Axis Edge case
        if (lineA.axis + lineB.axis == -2) 
            return true;

        if (lineA.slope == lineB.slope) 
            return true;
    };
    
    static perpendicular(lineA, lineB) {

        // Y Axis Edge case
        if (lineA.axis == -lineB.axis)
            return true;

        if (lineA.slope == - 1 / lineB.slope)
            return true;
    };

    static concurrent(lineA, lineB) {
        return !Line.parallel(lineA, lineB);
    };

    static overlap(lineA, lineB) {

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

    static intersect(lineA, lineB) {

        if (lineA.parallel(lineB))
            return;

        if (lineA.perpendicular(lineB)) {
            
            let { point: { x } } = lineA.axis == 1? lineA : lineB;
            let { point: { y } } = lineA.axis == 1? lineB : lineA;  

            return new Vector(x, y);
        };

        if ((lineA.axis || lineB.axis)**2 == 1) {

            let { point: { x, y } } = lineA.axis == -1? lineA : lineB; 
            let { slope, intercept } = lineA.axis == -1? lineB : lineA;

            return new Vector(x, x * slope + intercept);
        };

        
        let y = ( lineA.intercept - lineB.intercept ) / ( lineA.slope - lineB.slope );
        let x = ( y - lineA.intercept ) / lineA.slope;

        return new Vector(x, y);
    };
};

const lineA = new Line(Vector.origin, Vector.xAxis);
const lineB = new Line(new Vector(9, 8), new Vector(1, 1))

console.log(lineA.intercepts);

export { Line }

1 Receita 
- 150g de Leite condensado
- 150g de creme de leite
- 800ml de leite
- 15g de liga neutra
- 60g de leite ninho
- 90g de choclate em pó