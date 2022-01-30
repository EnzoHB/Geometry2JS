import Geometry from '../classes/wrapper.js'; 

const screen = document.querySelector('#screen');
const ctx = screen.getContext('2d');

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
        const yAxis1 = new Geometry.Line(new Geometry.Point(0, 0), Infinity);
        const yAxis2 = new Geometry.Line(new Geometry.Point(screen.width, 0), Infinity);
    
        const inter1 = Geometry.Line.intersection(line, yAxis1);
        const inter2 = Geometry.Line.intersection(line, yAxis2);
    
        const segment = new Geometry.Segment(inter1, inter2);
    
        drawSegment(segment, color);

        return;
};

    const xAxis1 = new Geometry.Line(new Geometry.Point(0, 0), 0);
    const xAxis2 = new Geometry.Line(new Geometry.Point(0, screen.height), 0);

    const inter1 = Geometry.Line.intersection(line, xAxis1);
    const inter2 = Geometry.Line.intersection(line, xAxis2);

    const segment = new Geometry.Segment(inter1, inter2);

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

const Drawers = { drawCircle, drawLine, drawPoint, drawSegment, clearRect, drawText } 

export default Drawers
export { drawCircle, drawLine, drawPoint, drawSegment, clearRect, drawText }