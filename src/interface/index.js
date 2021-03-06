import { on, shift } from '@enzohb/keyboard'; 

enableInputs();

const input = document.querySelector('#input');
const screen = document.querySelector('#screen');
const ctx = screen.getContext('2d');

function enableInputs() {
    let hidden = true;

    on(shift('H')).
    down(() => hidden = !hidden).
    down(() => input.style.visibility = hidden? 'hidden' : 'visible').

    down(() => console.log('Hidden State: ', hidden));
};

// ------------------------------------------------------- //

screen.width = screen.clientWidth;
screen.height = screen.clientHeight;

let tile = 50;
let lineColor = '#E5CEDB'

ctx.translate(
    Math.floor(screen.width / 2),
    Math.floor(screen.height / 2)
);

ctx.scale(1, -1)

// ------------------------------------------------------- //

function canvasBackground() {
    clearCanvas();
    drawCartesian();
    canvasPoint(Vector.origin);
};


function clearCanvas() {
    canvasFillRectangle(-halfWidth, -halfHeight, screen.width, screen.height, 'white');
};

// ------------------------------------------------ //

let halfWidth = Math.floor(screen.width / 2);
let halfHeight = Math.floor(screen.height / 2);

function drawCartesian() {

    const xAxis = [
        new Vector(-halfWidth, 0),
        new Vector(halfWidth, 0)
    ];

    const yAxis = [
        new Vector(0, -halfHeight),
        new Vector(0, halfHeight)
    ];

    // Straight paralell to the y axis lines
    for (let x = 0; x > -halfWidth; x -= tile) {
        let a = new Vector(x, -halfHeight);
        let b = new Vector(x, halfHeight);

        let c = new Vector(-x, -halfHeight)
        let d = new Vector(-x, halfHeight)

        canvasSegment(a, b, lineColor);
        canvasSegment(c, d, lineColor);
    };

    // Straight paralell to the x axis lines
    for (let y = 0; y > -halfHeight; y -= tile) {
        let a = new Vector(-halfWidth, y);
        let b = new Vector(halfWidth, y);

        let c = new Vector(-halfWidth, -y)
        let d = new Vector(halfWidth, -y)

        canvasSegment(a, b, lineColor);
        canvasSegment(c, d, lineColor);
    };

    canvasSegment(...xAxis, 'black');
    canvasSegment(...yAxis, 'black');

};

// ------------------------------------------------------- //

let bounding = screen.getBoundingClientRect();

const coordinate = callback => event => {

    // Getting the actual right coordinate of the click;
    let x = event.clientX - bounding.left
    let y = event.clientY - bounding.top;

    // Translating the coordinates, becuase we did it too above;
    x -= halfWidth;
    y -= halfHeight;

    // Scaling by minus one ( Flipping the canvas ) as we did above;
    y *= -1;

    callback( new Vector (x, y) );
};

canvasBackground();

/*
screen.addEventListener('mousemove', coordinate(vector => {
    clearCanvas();
    drawCartesian();
    canvasVector(vector);
}))

*/

/*
let vector = new Vector(1, 0);
let holder = vector;
let step = 60;

let angle = Angle.fromDegrees(step);

screen.addEventListener('mousemove', coordinate(scalar => {
    clearCanvas();
    drawCartesian();

    for (let i = 0; i < 360 / step; i++) {
        holder = Angle.rotateVector(angle, holder);
        canvasVector(holder.scale(scalar.length))
    };
}))

*/

/*

let radius = 100;
let current = null;
let main = new Circle( new Vector(radius, radius), radius);

screen.addEventListener('mousemove', coordinate(vector=> {
    current = new Circle(vector, radius);

    canvasBackground();

    canvasCircle(current);
    canvasCircle(main);

    safe(() => {
        Circle.intersectingCircles(current, main).forEach(canvasPoint);
    })
}));

function safe(statement, onError = () => {}) {
    try { statement() } catch(e) { onError(e) };
}; 

*/