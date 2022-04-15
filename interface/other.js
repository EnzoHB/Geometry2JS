import { Line } from '../class/Line.js';
import { Segment } from '../class/Segment.js';
import { Vector } from '../class/Vector.js';
import { Canvas } from './canvas.js';
import { clearRect, drawLine, drawPoint, drawSegment } from './drawers.js';

const input = document.querySelector('input')
const screen = document.querySelector('#screen');
const canvas = new Canvas(screen);

const scale = 50;

const weights = {
    P1: 1,
    P2: 2,
    TR: 1,
    PA: 1
};

const info = {
    max: 10,
    min: 0,
};

const points = {
    floor: [ new Vector(0, info.min * scale), Vector.xAxis],
    ceiling: [ new Vector(0, info.max * scale), Vector.xAxis]
};

const lines = {
    floor: new Line(...points.floor),
    ceiling: new Line(...points.ceiling),
};

const xstep = screen.width / info.max;
const ystep = scale;

drawLine(lines.floor);
drawLine(lines.ceiling);

for (let x = 0, xtrue = 0; x < info.max; x++, xtrue += xstep) {
    const yaxismove = new Line(new Vector(xtrue, 0), Vector.yAxis);

    const segment = new Segment(
        yaxismove.intersection(lines.ceiling),
        yaxismove.intersection(lines.floor)
    );

    drawSegment(segment, 'grey')
}; 

for (let y = 0, ytrue = 0; y < info.max; y++, ytrue += ystep) {
    const xaxismove = new Line(new Vector(0, ytrue), Vector.xAxis);

    drawLine(xaxismove, 'grey');
}; 

const otherInfo = {
    slope: -2,
    intercept: 15.5
}

applyLine(otherInfo);

function applyLine({ slope, intercept }) {
    const line = Line.from(new Vector(0, intercept * scale), slope);

    const segment = new Segment(
        line.intersection(lines.ceiling),
        line.intersection(lines.floor)
    );

    drawSegment(segment)
};

//console.log(lines)