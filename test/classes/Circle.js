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

        const xc = this.center.x;
        const yc = this.center.y;
        const r = this.radius;

        const d = r*r - (x - xc) ** 2;
        const j = Math.sqrt(d);

        let y1 = yc + j;
        let y2 = yc - j;

        if (d < 0) 
            return [];
            
        if (d == 0)
            return [ new Point(x, y1) ];

        if (d > 0)
            return [ new Point(x, y1), new Point(x, y2) ];
    };

    y(y) {

        const xc = this.center.x;
        const yc = this.center.y;
        const r = this.radius;

        const d = r*r - (y - yc) ** 2;
        const j = Math.sqrt(d);

        let x1 = xc + j;
        let x2 = xc - j;

        if (d < 0) 
            return [];
            
        if (d == 0)
            return [ new Point(x1, y) ];

        if (d > 0)
            return [ new Point(x1, y), new Point(x2, y) ];
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

        if (line.slope == Infinity)
            return circle.x(line.point.x);

        let { center, radius } = circle;
        let { slope, yIntercept } = line;
        let { x, y } = center;

        const a = 1 + slope ** 2;
        const b = 2*((slope * yIntercept) - (y * slope) - x);
        const c = x**2 + y**2 + yIntercept ** 2 - 2*y*yIntercept - (radius**2);
        const d = b**2 - 4 * a * c;

        let d1 =  Math.sqrt(d);
        let d2 = -Math.sqrt(d);

        let x1 = -b + d1 / (2*a);
        let x2 = -b + d2 / (2*a);

        x1 = circle.x(x1); 
        x2 = circle.x(x2);

        if (d < 0) 
            return [];

        if (d == 0)
            return x1;
            
        if (d >  0) {
            if (line.slope > 0) 
                return [ x1[0], x2[1] ];
                return [ x1[1], x2[0] ];  
        };
    };
};

const circle = new Circle(Point.origin)

export { Circle };