import { Vector } from '../classes/Vector.js';
import Geometry from '../classes/wrapper.js';  
import Drawers, { clearRect, drawPoint, drawSegment } from './drawers.js'

const { Line, Point, Circle, Triangle } = Geometry;

const input = document.querySelector('input')
const screen = document.querySelector('#screen');
const bound = screen.getBoundingClientRect();
const width = window.innerWidth;
const height = window.innerHeight - bound.y

screen.height = height;
screen.width = width;

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

    vertices = vertices.map(e => new Vector(...e.pair).add(vectorMain).point);

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