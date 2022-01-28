import { Point } from "./Point.js";
import { Segment } from "./Segment.js";
import { Line } from "./Line.js";
import { Circle } from "./Circle.js";
import { Angle } from "./Angle.js";

class Triangle {
    constructor(...points) {
        this.vertices = points;
    };

    get edges() {
        return this.vertices.map((vertice, index, vertices) => {
                index++;
                index %= vertices.length

                return new Segment(vertice, vertices[index]);
        })
    };

    get perimeter() {
        return this.edges.reduce((length, segment) => length += segment.length, 0);
    };

    get area() {
        // Heron's Formula

        const s = this.perimeter / 2
        const a = this.edges[0].length;
        const b = this.edges[1].length;
        const c = this.edges[2].length;

        return Math.sqrt(s*(s - a)*(s - b)*(s - c));
    };

    get centroid() {
        return new Point(
            this.vertices.reduce((acc, { x }) => acc += x, 0) / 3,
            this.vertices.reduce((acc, { y }) => acc += y, 0) / 3
        );
    };

    get circumcenter() {

        const edges = [ this.edges[0], this.edges[1] ];
        const lines = edges.map(edge => new Line(edge.middle, - 1 / edge.slope))
        
        return Line.intersection(...lines)
    };

    get circumcircle() {
        const center = this.circumcenter;
        const radius = Point.distance(center, this.vertices[0]);

        return new Circle(center, radius);
    };

    get incircle() {
        const center = this.incenter;
        const radius = Line.distance(this.edges[0].line, center).length;

        return new Circle(center, radius);
    };

    get incenter() {
        const angles = this.angles;
        const bisectorA = angles[0].bisector;
        const bisectorB = angles[1].bisector;

        return Line.intersection(bisectorA, bisectorB);
    };

    get angles() {
        return this.edges.map((edge, i, edges) => {
            let next = (i + 1) % edges.length;
            let oppo = (i + 2) % edges.length; 

            const { acute, obtuse } = Angle.intersection(edge.line, edges[next].line);

            const smaller = acute.lineA; 
            const greater = acute.lineB;

            let interS = Line.intersection(smaller, edges[oppo].line);
            let interG = Line.intersection(greater, edges[oppo].line);

            let sideS = Line.clockSide(greater, interS);
            let sideG = Line.clockSide(smaller, interG);

            // If the slopes have opposite signs and
            // the angle between them is greater than 90
            // Opposite-Slangle exception Correction;

            let signA = Math.sign(smaller.slope);
            let signB = Math.sign(greater.slope);
            let slangle = smaller.angle.radians + greater.angle.radians;

            if (signA != signB && slangle > Math.PI / 2) {
                sideS = Line.counterSide(greater, interS);
                sideG = Line.counterSide(smaller, interG);
            };
    
            if (sideS == 1) {
                if (sideG == 1) 
                    return obtuse.opposite;
                    return acute;

            } else {
                if (sideG == 1) 
                    return acute.opposite;
                    return obtuse;
            };
        });
    };

    get heights() {
        return this.edges.map((edge, index) => {

            index += 2;

            if (index > this.edges.length - 1)
                index %= this.edges.length;

            const vertice = this.vertices[index];
            const slope = - 1 / edge.slope;

            const line = new Line(vertice, slope);
            const intersection = Line.intersection(edge.line, line);

            return new Segment(vertice, intersection);
        });
    };
};

const triangle = new Triangle(
    new Point(1, 0),
    new Point(0, 3),
    new Point(4, 2)
)

console.log(triangle.angles)

export { Triangle }