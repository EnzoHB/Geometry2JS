// ------------- Math Function Types-------------- // 

// f(x) = k;
class Constant {
    constructor(c) {
        this.c = c;
    };

    eval(x) {
        return this.c;
    };

    solve() {
        return [];
    };

    equals(expression) {
        return equals(expression, this);
    };
}

// f(x) = ax + b;
class Linear {
    constructor(b, c) {

        if (!b) throw new Error('"B" Cannot be 0');

        this.b = b;
        this.c = c;
    };

    eval(x) {
        return this.b * x + this.c;
    };

    solve() {
        return [ -this.c / this.b ];
    };

    equals(expression) {
        return equals(expression, this);
    };
};

// f(x) = ax² + bx + c;
class Quadratic {
    constructor(a, b, c) {
        if (!a) throw new Error('"A" Cannot be 0');

        this.a = a;
        this.b = b;
        this.c = c;
    }

    eval(x) {
        return this.a * x * x + this.b * x + this.c;
    };

    solve() {
        let {a, b, c} = this;

        let delta = b ** 2 - 4 * a * c;
        let dsqrt = Math.sqrt(delta);

        if (delta < 0) 
            throw new RangeError('Cannot solve for complex numbers');
    
        let n1 = -b + dsqrt;
        let n2 = -b - dsqrt;
    
        let x1 = n1 / (2 * a); 
        let x2 = n2 / (2 * a); 
    
        return [ x1, x2 ];
    };

    equals(expression) {
        return equals(expression, this);
    };
};

// ------------- Auxiliary Methods -------------- // 

function equals(...expressions) {
    expressions = 
    expressions.map(({
        a = 0,
        b = 0,
        c = 0,
    }) => ({ 
        a, 
        b, 
        c
    }));

    let a = expressions[0].a - expressions[1].a;
    let b = expressions[0].b - expressions[1].b;
    let c = expressions[0].c - expressions[1].c;

    if (a) return new Quadratic(a, b, c);
    if (b) return new Linear(b, c);
    if (c) return new Constant(c);
}

function pair(...constants) {
    let x = constants[0].eval();
    let y = constants[1].eval();

    return [ x, y ]
};

function plugin(constant, expression) {
    let x = constant.eval();
    let y = expression.eval(x);

    return [ x, y ]
};

function system(...expressions) {
    let x = equals(...expressions).solve().at();
    let y = expressions.at().eval(x);

    return [ x, y ]
};

export { Constant, Linear, Quadratic, equals, pair, plugin, system };