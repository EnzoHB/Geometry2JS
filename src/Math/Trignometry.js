import { Vector } from "../class/Vector.js";

class Angle {
    constructor(radians) {
        this.radians = radians;
    };

    get degrees() {
        return Angle.getDegrees(this.radians);
    };

    get standard() {
        return Angle.standarize(this);
    };

    // Coterminal
    get reduced() {
        return Angle.reduce(this);
    };

    get acute() {
        return Angle.isAcute(this);
    };

    get obtuse() {
        return Angle.isObtuse(this);
    }

    get reflex() {
        return Angle.isReflex(this);
    };  

    get quadrantal() {
        return Angle.isQuadrantal(this);
    };

    // ----------------- Trigonometric Functions ----------------- // 

    get cos() {
        return Math.cos(this.radians);
    };

    get sin() {
        return Math.sin(this.radians);
    };

    get tan() {
        return Math.tan(this.radians);
    };

    get sec() {
        return 1 / this.cos;
    };

    get csc() {
        return 1 / this.sin;
    };

    get cot() {
        return 1 / this.tan;
    };

    // -------------- Unit Circle Porperties -------------- //

    // s = Theta * r
    // As r = 1, then: 
    get length() {
        return this.radians;
    };

    // -------------- Methods ------------------- //

    // Coterminal
    coterminal(x = 1) {
        return Angle.coterminal(this, x)
    };

    add(angle) {
        return Angle.add(this, angle);
    };

    sub(angle) {
        return Angle.sub(this, angle);
    };
    
    // -------------- Static Methods -------------- // 

    static standarize(angle) {
        return new Angle(Math.abs(angle.radians));
    };

    // Coterminal
    static reduce(angle) {
        return new Angle(angle.radians % Angle.threeSixty);
    };

    static add(a, b) {
        return new Angle(a.radians + b.radians);
    }

    static sub(a, b) {
        return new Angle(a.radians - b.radians);
    }

    // -------------- Checks Against -------------- // 

    static areCongruent(a, b, precision = 10) {
        return (a.radians - b.radians).toFixed(precision) === 0;
    };

    static areCoterminal(a, b, precision = 10) {
        return Math.abs((a.reduced.radians - b.reduced.radians).toFixed(precision)) % Angle.threeSixty === 0;
    };

    static isAcute(angle) {
        return (
            angle.radians > 0 &&
            angle.radians < Angle.ninety
        );
    };

    static isObtuse(angle) {
        return (
            angle.radians > Angle.ninety &&
            angle.radians < Angle.oneEighty
        );
    }

    static isReflex(angle) {
        return (
            angle.radians > Angle.oneEighty &&
            angle.radians < Angle.threeSixty
        );
    };  

    static isQuadrantal(angle) {
        return (
            angle.radians % Angle.ninety === 0
        )
    };

    // -------------- Special Measures ---------------- //

    static get thirty() {
        return Math.PI / 6;
    };

    static get sixty() {
        return Math.PI / 3;
    };

    static get fortyFive() {
        return Math.PI / 4;
    };

    static get ninety() {
        return Math.PI / 2;
    };

    static get oneEighty() {
        return Math.PI;
    };

    static get threeSixty() {
        return 2 * Math.PI;
    };

    // -------------- Special Angles ---------------- //

    static get zero() {
        return new Angle(0);
    };

    static get right() {
        return new Angle(Math.PI / 2);
    };

    static get straight() {
        return new Angle(Math.PI);
    };

    static get full() {
        return new Angle(2 * Math.PI);
    };

    // -------------- From Methods ---------------- //

    static fromDegrees(degrees) {
        return new Angle(Angle.getRadians(degrees));
    };

    static coterminal(angle, x = 1) {
        return new Angle(angle.radians + x * Angle.threeSixty);
    };

    static fromVector(vector) {
        return new Angle(
            Math.sign(
            Math.asin(vector.sin)) * 
            Math.acos(vector.cos)
        );
    };

    // -------------- Create Methods ---------------- //

    static createVector(angle) {
        return new Vector(angle.cos, angle.sin);
    };

    static rotateVector(angle, vector) {
        return (
            Angle.createVector(
            Angle.fromVector(vector).add(angle))
        ); 
    };

    // -------------- Utility Methods ---------------- //

    static getRadians(degrees) {
        return Math.PI * degrees / 180;
    };

    static getDegrees(radians) {
        return 180 * radians / Math.PI;
    };
};

export { Angle };