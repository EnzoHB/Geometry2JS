export default function point({ ctx }, {  vector: { x, y }, radius, color }) {
    ctx.fillStyle = color;

    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.fill();
};