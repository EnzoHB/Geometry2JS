class Mouse {
    constructor(screen, bound) {
        this.x;
        this.y;
        this.inside;
        this.capturing = true;
 
        screen.addEventListener('mousemove', event => capturing && (this.x = event.x - bound.x));
        screen.addEventListener('mousemove', event => capturing && (this.y = event.x - bound.x));

        screen.addEventListener('mouseout', event => capturing && (this.inside = false));
        screen.addEventListener('mousein', event =>  capturing && (this.inside = true));

        // screen.addEventListener('mousemove', event => capturing && (this.event = event));
        // screen.addEventListener('mouseout', event =>  capturing && (this.event = event));
        // screen.addEventListener('mousein', event =>   capturing && (this.event = event));
    };

    scroll() {};
    click();
    move();
    down();
    up();
};



class Canvas {
    constructor(screen) {
        this.screen = screen;
        this.bound = bound;

        this.mouse = {
            x,
            y,
            inside,
            capturing,
            move,
        };

        this.click = {};
    };
}

screen.addEventListener('mousemove', event => {})