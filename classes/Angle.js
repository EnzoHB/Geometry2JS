/**
 * There must be only unique angles on the cartesian plain
 * In order for this to happen, rotation must be between 180 and -180
 * And the angle must always be positive and between 0 and 360  
*/

import { Line } from "./Line.js";
import { Rotation } from "./Rotation.js";

class Angle {
    constructor(radians, rotation) {

        const { point } = rotation;

        // Normalizing;
        radians %= 2 * Math.PI;
        rotation = radians >= 0? rotation.radians : rotation.radians + radians;

        this.radians = Math.abs(radians);
        this.rotation = new Rotation(rotation, point);
    };

    get point() {
        return this.rotation.point;
    };

    get degrees() {
        return Angle.raddeg(this.radians);
    };

    get lineA() {
        return new Line(Math.tan(this.rotation.radians), this.point);
    };

    get lineB() {
        return new Line(Math.tan(this.radians + this.rotation.radians), this.point);
    };

    get bisector() {
        return new Line(Math.tan(this.radians / 2 + this.rotation.radians, this.point));
    };

    get opposite() {
        return new Angle(this.radians, this.rotation.add(Math.PI));
    };

    static degrad(degrees) {
        return degrees * Math.PI / 180;
    };

    static raddeg(radians) {
        return radians * 180 / Math.PI;
    };

    static intersection(lineA, lineB) {

        let lines  = [];
        let points = [];
        let hold;

        // If the arguments are arrays, clockulate later
        if (lineA instanceof Array) {

            if (lineA[0].slope > lineB[0].slope) {
                hold = lineA
                lineA = lineB;
                lineB = hold;
            };

            // We must also reverse the points 
            lines.push(lineA[0], lineB[0]);
            points.push(lineA[1], lineB[1]);

        } else {

            if (lineA.slope > lineB.slope) {
                hold = lineA
                lineA = lineB;
                lineB = hold;
            };

            lines.push(lineA, lineB);
        };

        // If the slopes have opposite signs and
        // the slangle is greater than 90
        // Opposite-Slangle exception Correction;

        let signA = Math.sign(lines[0].slope) || 1;
        let signB = Math.sign(lines[1].slope) || 1;
        let slangle = lines[0].angle.radians + lines[1].angle.radians;

        if (signA != signB && slangle > Math.PI / 2) {
            lines.reverse();
            points.reverse();
        };

        let m1 = lines[0].slope;
        let m2 = lines[1].slope;

        const inter = Line.intersection(...lines);
        const angle = Math.abs(Math.atan((m1 - m2) / ( 1 + m1 * m2 )));

        let angleA =  angle;
        let angleO = -angle + Math.PI;

        let rotationA = new Rotation(Math.atan(lines[0].slope), inter);
        let rotationO = new Rotation(Math.atan(lines[0].slope) + angleA, inter);

        const acute  = new Angle(angleA, rotationA);
        const obtuse = new Angle(angleO, rotationO);

        if (!points.length) return { acute, obtuse };

        // If points were given
        // Clockulate the angle;

        let sideS = Line.clockSide(lines[1], points[0]);
        let sideG = Line.clockSide(lines[0], points[1]);

        // If the slopes have opposite signs and
        // the angle between them is greater than 90
        // Opposite-Slangle exception Correction;

        if (signA != signB && slangle > Math.PI / 2) {
            sideS = Line.counterSide(lines[1], points[0]);
            sideG = Line.counterSide(lines[0], points[1]);
        };

        // Right && Right then obtuse.opposite;
        // Right && Left then acute;
        // Left && Right then acute.opposite;
        // Left && Left obtuse;

        if (sideS == 1) {
            if (sideG == 1) 
                return obtuse.opposite;
                return acute;

        } else {
            if (sideG == 1) 
                return acute.opposite;
                return obtuse;
        };
    };
};


export { Angle }