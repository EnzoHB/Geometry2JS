import Geometry from '../classes/wrapper.js';  
import Drawers, { clearRect, drawPoint, drawSegment } from './drawers.js'

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

screen.addEventListener('click', event => {
    if (points.length == 3) return;

    const x = event.clientX - bound.left;
    const y = event.clientY - bound.top;

    const point = new Geometry.Point(x, y);
    
    points.push(point);
    Drawers.drawPoint(point);

    if (points.length == 3) {

        triangle = new Geometry.Triangle(...points);
        triangle.edges.forEach(drawSegment);
        triangle.heights.forEach(drawSegment);
        Drawers.drawCircle(triangle.incircle);
        Drawers.drawCircle(triangle.circumcircle);
        console.log(triangle)
    };
});

let step = 0;
input.addEventListener('input', event => {
    step = -input.valueAsNumber;
})

setInterval(() => {
    if (!triangle) return;

    clearRect()

    const center = triangle.circumcenter;
    const segments = triangle.vertices.map(e => new Geometry.Segment(center, e))
    const vertices = segments.map(e => e.rotate(Geometry.Angle.degrad(step))).map(e => e.tip);

    triangle = new Geometry.Triangle(...vertices);
    triangle.edges.forEach(drawSegment);
    triangle.heights.forEach(drawSegment);
    Drawers.drawCircle(triangle.circumcircle);

}, 10)