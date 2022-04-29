/**
 * Class Rotation
 * The rotation is the second primitive class. It gives a point
 * the ability to rotate in space, through the cos() and sin()
 * functions.
 */

import { Point } from "./Point.js";

class Rotation {
    constructor(radians, point) {

        this.point = point || Point.origin
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
        return new Rotation(this.radians + radians, this.point);
    };

    static
    fromPoint(point, origin = Point.origin) {

        // Sides of the trygonometric triangle 
        let adjacent = point.x - origin.x
        let opposite = point.y - origin.y
        let hypotenuse = Math.sqrt(adjacent ** 2 + opposite ** 2);

        const cos = adjacent / hypotenuse;
        const sin = opposite / hypotenuse;

        return new Rotation(Rotation.angle(cos , sin), origin);
    };

    // This function only works
    // If cos() and sin() are properly related
    
    static angle(cos, sin) {

        // As we define the angle based on the x axis
        // We must do the following.

        return Math.sign(Math.asin(sin)) * Math.acos(cos)
    };

    // Normalizes the angle in radians
    // based on the cos() and sin() function
    // as well as limiting the rotation to 180 and -180

    static normalize(radians) {

        let cos = Math.cos(radians);
        let sin = Math.sin(radians);

        return Rotation.angle(cos, sin);
    };
};

export { Rotation }