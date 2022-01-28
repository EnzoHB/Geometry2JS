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
    intersection() {
        return 

    };
};

export { Circle };

const circle = new Circle(Point.origin, 4);