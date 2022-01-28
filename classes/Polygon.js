import { Segment } from "./Segment.js";
import { Triangle } from "./Triangle.js";

class Polygon {
    constructor(...points) {
        if (points.length < 4) throw 'Use Triangle Instead';

        this.vertices = points;
    };

    get edges() {
        return this.vertices.map((point, index, vertices) => {
            if (index++ == vertices.length - 1)
                index = 0;

                return new Segment(point, vertices[index]);
        });
    };

    get perimeter() {
        return this.edges.reduce((length, line) => length += line.length, 0);
    };

    get triangles() {
        const { length } = this.vertices;
        const main = this.vertices[0];
        const triangles = [];

        let a;
        let b;
        for (let i = 0, a = i + 1, b = i + 2; b < length - 1; i++) {
            a = i + 1;
            b = i + 2;

            const points = [
                main,
                this.vertices[a],
                this.vertices[b]
            ];

            triangles.push(new Triangle(...points));
        };

        return triangles;
    };

    get area() {
        return this.triangles.reduce((area, triangle) => area += triangle.area, 0); 
    };
};

export { Polygon };