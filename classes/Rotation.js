import { Point } from "./Point.js";
import { Segment } from "./Segment.js";

class Rotation {
    constructor(radians) {
        this.radians = Rotation.normalize(radians);
    };

    get cos() {
        return Math.cos(this.radians);
    };

    get sin() {
        return Math.sin(this.radians);
    };

    get tan() {
        return Math.tan(this.radians);
    };

    get atan() {
        return Math.atan(this.tan);
    };

    get acos() {
        return Math.acos(this.cos);
    };

    get asin() {
        return Math.asin(this.sin);
    };

    add(radians) {
        return new Rotation(this.radians + radians)
    };

    static
    fromPoint(point, origin) {
 
        let adjacent = point.x - (origin?.x || 0);
        let opposite = point.y - (origin?.y || 0);
        let hypotenuse = Math.sqrt(adjacent ** 2 + opposite ** 2);

        const cos = adjacent / hypotenuse;
        const sin = opposite / hypotenuse;

        return new Rotation(Rotation.angle(cos, sin));
    };

    // This function only works
    // If cos() and sin() are properly related
    static angle(cos, sin) {

        // As we define the angle based on the x axis
        // We must do the following.

        return Math.sign(Math.asin(sin)) * Math.acos(cos)
    };

    static normalize(radians) {
        radians %= 180

        let cos = Math.cos(radians);
        let sin = Math.sin(radians);

        return Rotation.angle(cos, sin);
    };
};

const point = new Point(4, 3);
const point1 = new Point(5, 6);
// console.log(Rotation.fromPoint(point, point1))

export { Rotation }