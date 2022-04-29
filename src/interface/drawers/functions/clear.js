export default function clear({ ctx }, { x, y, width, height }) {
    ctx.fillStyle = 'white';
    
    ctx.fillRect(x, y, width, height);
};