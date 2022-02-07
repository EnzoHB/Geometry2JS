import { Canvas } from './canvas.js';
import { clearRect, drawPoint, drawSegment } from './drawers.js';
import { Segment } from '../class/Segment.js';
import Drawers from './drawers.js';
import { Circle } from '../classes/Circle.js';
import { Vector } from '../class/Vector.js';

const input = document.querySelector('input')
const screen = document.querySelector('#screen');
const canvas = new Canvas(screen);

class Mouse {
    constructor(screen, bound) {
        this.x;
        this.y;
        this.inside;
        this.capturing = true;
 
        screen.addEventListener('mousemove', event => this.capturing && (this.x = event.x - bound.x));
        screen.addEventListener('mousemove', event => this.capturing && (this.y = event.y - bound.y));

        screen.addEventListener('mouseout', event => this.capturing && (this.inside = false));
        screen.addEventListener('mousein', event =>  this.capturing && (this.inside = true));

        // screen.addEventListener('mousemove', event => capturing && (this.event = event));
        // screen.addEventListener('mouseout', event =>  capturing && (this.event = event));
        // screen.addEventListener('mousein', event =>   capturing && (this.event = event));
    };

    move() {};
    scroll() {};
    up() {};
    down() {};
    click() {};
};



const mouse = new Mouse(canvas.screen, canvas.bound);
let motion = new Vector(0, 0)

canvas.onSequence(2).do(vectors => {

    let segment = new Segment(vectors[0], vectors[1]);

    requestAnimationFrame(render)

    function render() {

        motion = segment.tail.relative(new Vector(mouse.x, mouse.y)).scale(1/8);


        var radians = input.valueAsNumber * Math.PI / 180;
        segment = segment.move(motion);
        segment = segment.rotate(radians);

        clearRect();
        drawSegment(segment);
        drawPoint(segment.tail);
        drawPoint(segment.tip);

        requestAnimationFrame(render);
    };
})

canvas.onCreate(vector => {
    drawPoint(vector)
});


/*

let points = [];
let segment;
let triangle;

let box = [
    new Line(0, new Point(0, 0)),
    new Line(0, new Point(0, height)),
    new Line(Infinity, new Point(0, 0)),
    new Line(Infinity, new Point(width, 0))
];

window.addEventListener('resize', event => {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight - bound.y

    box = [
        new Line(0, new Point(0, 0)),
        new Line(0, new Point(0, window.innerHeight - bound.y)),
        new Line(Infinity, new Point(0, 0)),
        new Line(Infinity, new Point(window.innerWidth, 0))
    ];
})

screen.addEventListener('click', event => {
    if (points.length == 3) return;

    const x = event.clientX - bound.left;
    const y = event.clientY - bound.top;

    const point = new Geometry.Point(x, y);
    
    points.push(point);
    Drawers.drawPoint(point);

    if (points.length == 3) {

        triangle = new Geometry.Triangle(...points);
        drawTriangle(triangle)
    };
});

let step = 0;
input.addEventListener('input', event => {
    step = -input.valueAsNumber;
})

let vectorMain = new Vector(6, 5);
setInterval(() => {
    if (!triangle) return;

    clearRect()

    const center = triangle.circumcenter;
    const segments = triangle.vertices.map(e => new Geometry.Segment(center, e))
    let vertices;
    
    vertices = segments.map(e => e.rotate(Geometry.Angle.degrad(step))).map(e => e.tip);

    box.forEach(line => {

        const array = Circle.intersection(triangle.circumcircle, line);

        if (!array.length) return;

        vectorMain = vectorMain.reflect(line);
        step = -step;
    })

    vertices = vertices.map(e => new Vector(...e.pair).add(vectorMain));

    const triangleA = new Geometry.Triangle(...vertices);
    triangle = triangleA;
    drawTriangle(triangle);

}, 60/5)

function drawTriangle(triangle) {
    triangle.edges.forEach(drawSegment);
    //triangle.heights.forEach(drawSegment);
    Drawers.drawCircle(triangle.circumcircle);
    Drawers.drawCircle(triangle.incircle)

    triangle.edges.map(edge => Line.distance(edge.line, triangle.incenter)).forEach(drawSegment);
};

*/