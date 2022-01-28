import { Point, Line, Triangle, Polygon, Segment, Angle } from './wrapper.js';

const screen = document.querySelector('#screen');
const ctx = screen.getContext('2d');

const points = [];
const lines = [];

/*
const pixel = 400;

const lineE = Line.fromDegrees(new Point(pixel, pixel), 60);
const lineF = new Line(new Point(pixel, pixel), 0)

const angle = new Angle(lineF, lineE);

console.log(lineE)

drawLine(lineE);
drawLine(lineF);

console.log(angle)

/** */

screen.addEventListener('mousemove', event => {
    if (points.length < 2) return;

    const boundingRect = screen.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    const vertice = new Point(x, y);
    //const segment = new Segment(interception, vertice);
    //const line = segment.line;

    //clearRect();
    //drawLine(line);
    //drawLine(lines[0])

    //const shit = Angle.bisectors(lines[0], line);
    //const angle = Angle.intersection(lines[0], line);

    //shit.froEach(fuck => drawLine(fuck))
    //console.log(shit)

    const triangle = new Triangle(...points, vertice);

    clearRect();

    triangle.edges.forEach(drawSegment);
    //triangle.heights.forEach(drawSegment);
    drawCircle(triangle.circumcircle)
    drawCircle(triangle.incircle)

    drawText(`Area: ${(triangle.area / 100).toFixed(2)} cm²`, triangle.centroid)
    drawText(`Perimeter: ${(triangle.perimeter / 10).toFixed(2)} cm`, { x: triangle.centroid.x, y: triangle.centroid.y - 20 })

    console.log(triangle.angles)
    //drawPoint(triangle.incenter)

    /** */
}) 

/** */

screen.addEventListener('click', event => {

    const boundingRect = screen.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    if (points.length < 2 && lines.length < 2) {
        
        const point = new Point(x, y);

        points.push(point);
        drawPoint(point)
    };

    /*

    if (points.length == 2) {
        const line = new Line(...points);

        points.forEach(point => drawPoint(point, 'white'))
        points.length = 0;

        drawLine(line);
        lines.push(line);

        if (lines.length == 2) {
            interception = Line.intersection(...lines);
        };

    };

    /*

    if (lines.length == 2) {

        const angle = new Angle(...lines);
        /*
        //const line = Line.fromRadians(angle.intersection, angle.lineA.angleFromX + angle.normal / 2);

        //lineB + half;
        //ineA + half;

        const half = angle.radians / 2;

        let which;
        if (angle.radians < 0)
                which = lineB.angleFromX;
        else    which = lineA.angleFromX;
    

        angle.bisectors.forEach(bisector => drawLine(bisector, 'green'));
        console.log(angle)


    };

    */
});

function drawText(text, point) {
    ctx.fillStyle = 'black'
    ctx.fillText(text, point.x, point.y)
    ctx.stroke();
};

function drawPoint(point, color) {

    const radius = 4;

    ctx.fillStyle = color || 'black';
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, radius, radius, 0, 0, 2 * Math.PI)
    ctx.fill();
};

function drawCircle(circle) {

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(circle.center.x, circle.center.y, circle.radius, circle.radius, 0, 0, 2 * Math.PI)
    ctx.stroke();
};

function drawLine(line, color) {

    if (line.axis == '1') {
        const yAxis1 = new Line(new Point(0, 0), Infinity);
        const yAxis2 = new Line(new Point(screen.width, 0), Infinity);
    
        const inter1 = Line.intersection(line, yAxis1);
        const inter2 = Line.intersection(line, yAxis2);
    
        const segment = new Segment(inter1, inter2);
    
        drawSegment(segment, color);

        return;
};

    const xAxis1 = new Line(new Point(0, 0), 0);
    const xAxis2 = new Line(new Point(0, screen.height), 0);

    const inter1 = Line.intersection(line, xAxis1);
    const inter2 = Line.intersection(line, xAxis2);

    const segment = new Segment(inter1, inter2);

    drawSegment(segment, color)
};

function drawSegment(segment, color) {
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color || 'black';

    ctx.beginPath()
    ctx.moveTo(segment.tail.x, segment.tail.y);
    ctx.lineTo(segment.tip.x, segment.tip.y);
    ctx.closePath()
    ctx.stroke();

    ctx.strokeStyle = 'black';
};        


function clearRect() {
    ctx.clearRect(0, 0, screen.width, screen.height);
}