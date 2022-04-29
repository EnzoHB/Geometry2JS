/**
 * Class Point 
 * The base of everything. It is from the point that we can
 * create every single other thign in the xy coordinate system
 * x - Number
 * y - Number
 * 
 */

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    get pair() {
        const { x, y } = this;
        return [ x, y ]
    };

    get quadrant() {
        const sx = Math.sign(this.x);
        const sy = Math.sign(this.y);

        if (sx == 1) {
            if (sy == 1)
                return 1; 
                return 4; 
        } else {
            if (sy == 1) 
                return 2;
                return 3;
        }
    };

    decimalCorrection(shift) {

        // Shift forward the number
        let x = String(this.x * 10 ** shift);
        let y = String(this.y * 10 ** shift);
        
        // If the coordinates have decimals, split them. If not, '0'
        let [ ix ] = this.x % 1 != 0? x.split('.') : [ x, '0' ];
        let [ iy ] = this.y % 1 != 0? y.split('.') : [ y, '0' ];

        // Unshift the number
        return new Point(Number(`${ix / 10 ** shift}`), Number(`${iy / 10 ** shift}`))
    };

    static 
    distance(a, b) {
        // Distance between two points formula
        return (
            Math.sqrt (
                (a.x - b.x) ** 2 +
                (a.y - b.y) ** 2
            )
        );
    };
};

// Origin
Point.origin = new Point(0, 0);

export { Point };