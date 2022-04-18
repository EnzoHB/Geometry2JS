import { Vector } from '../class/Vector.js';
import { Quadratic } from '../Math/Algebra.js';

class AccelerationVector {
	constructor(acceleration, tick, speed) {
		this.acceleration = acceleration;
		this.speed = speed || 0;
		this.tick = tick || 1;
	};
	
	get cos() {
		return this.acceleration.cos;
	};
	
	get sin() {
		return this.acceleration.sin;
	};
	
	get velocity() {
		return new Vector(this.cos, this.sin).scale(this.speed);
	};
	
	get equation() {
		return new Quadratic(this.acceleration.length / 2, this.velocity.length, 0);
	};
	
	[Symbol.iterator]() {
		const acceleration = this;

		return (
		
			function *iterator() {

				let instant = 1 / acceleration.tick;
				let equation = acceleration.equation;
			
				for (let i = 1;; i++) {
					yield new Vector(acceleration.cos, acceleration.sin).scale(
						equation.eval(instant * i) - 
						equation.eval(instant * (i - 1))
					);
			}
			
		})();
	};
};

let tick = 60;

const vector = new Vector(0, -10)
const acceleration = new AccelerationVector(vector, tick);

function *applyForGiven(acceleration, seconds) {
	let i = 0;
	let frames = 60 * seconds;

	for (const vector of acceleration) {
		if (i > frames) break;
		i++

		yield vector;
	};
};

const iterator = applyForGiven(acceleration, 10);

let origin = new Vector(0, 0);

for (const vector of iterator) 
	origin = origin.add(vector);

console.log(origin)