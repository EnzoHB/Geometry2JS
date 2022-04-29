export default function circle({ ctx }, {  vector: { x, y }, radius, stroke, fill}) {
    ctx.fillStyle = fill.color;
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = fill.width;

    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    
    stroke? ctx.fill() : 0;
    fill? ctx.stroke() : 0;
};