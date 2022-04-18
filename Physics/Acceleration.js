import { Vector } from '../class/Vector.js';
import { Quadratic } from '../Math/Algebra.js';

class Acceleration {
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
		return this.apply();
	};

	*apply() {
		let instant = 1 / this.tick;
		let equation = this.equation;
			
		for (let i = 1;; i++) {
			yield new Vector(this.cos, this.sin).scale(
				equation.eval(instant * i) - 
				equation.eval(instant * (i - 1))
			);
		}
	};
};

export { Acceleration };