const blockPath = new Path2D();
blockPath.rect(10,10,100,100);
const SCALE = 0.3;
const OFFSET = 80;

export default function draw(ctx, location){
    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
    ctx.fill(blockPath);
    ctx.restore();
  };