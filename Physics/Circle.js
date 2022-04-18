import { Vector } from "../class/Vector.js";
import { Movement } from "./Movement.js";
import { Acceleration } from './Acceleration.js';
import { Force } from "./Force.js";

class Circle {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
        this.movement = new Movement()
        this.resultant = this.movement.init();

    };

    move() {
        this.center = this.center.add(this.resultant.next().value);
    };
};

const radius = 4;
const center = new Vector(1, 1)
const circle = new Circle(center, radius);

const vector = new Force(0, -10);
const gravity = new Acceleration(vector, 1);

circle.movement.addConstant(gravity);

circle.move();
circle.move();
circle.move();
circle.move();

console.log(circle)

