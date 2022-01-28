import { Line } from "./Line.js";
import { Point } from "./Point.js";

class Circle {
    constructor(center, radius) {

        // Equation of a circle
        // (x - a)² + (y - b)² = r² 

        this.center = center;
        this.radius = radius;
    };

    x(x) {

        const a = this.center.x;
        const b = this.center.y;
        const r = this.radius;

        const y = Math.sqrt(r*r - (x - a) ** 2) + b;

        if (isNaN(y))
            return y;            
            return new Point(x, y);
    };

    y(y) {

        const a = this.center.x;
        const b = this.center.y;
        const r = this.radius;

        const x = Math.sqrt(r*r - (y - b) ** 2) + a;

        if (isNaN(x))
            return x;            
            return new Point(x, y);
    };

    static 
    distance(point) {
        return Point.distance(this.center, point) - radius;
    };

    static
    intersection(circle, line) {
        
        // Equation of a circle (x - xc)² + (y - yc)² = rc²
        // Euqation of a line y = mx + bl
        // Solve the system

        // (x - c1)² + (mx + bl - c2)² = rc²;
        // x² - 2(c1)x + c1² + m²x² + (bl)(mx) - (c2)(mx) + (bl)(mx) + bl² - (c2)(bl) + cl² - (c2)(mx) - (c2)(bl) = rc²
        // x²  + m²x² + 2m(bl - c2²)(- 2(c1))(x)  = rc² - c2² - c1² - bl² + 2 * (c1)(bl)

        const r = circle.radius;
        const i = circle.center.x;
        const j = circle.center.y;
        const y = line.yIntercept;
        const m = line.slope;
    
        const a = 1 + m ** 2;
        const b = 2*((m*y) - (j*m) - i)
        const c = i*i + j*j + y*y - 2*j*y - (r*r);

        const d = b*b - 4 * a * c;
        const { sqrt } = Math;

        let xes;

        if (d < 0) 
            xes = [];

        if (d == 0)
            xes = [ -b / 2 * a ];

        if (d > 0)
            xes = [ (-b + sqrt(d)) / (2*a), (-b - sqrt(d)) / (2*a) ];

        return xes.map(x => line.x(x));
    };
};


const circle = new Circle(Point.origin, 4);
const line = new Line(Point.origin, -4);

console.log(Circle.intersection(circle, line))

export { Circle };