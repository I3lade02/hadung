import type { World } from '../engine/types'
import { getCamera } from './camera'

export function drawFrame(ctx: CanvasRenderingContext2D, world: World) {
    const { canvas } = ctx;
    const W = canvas.clientWidth, H = canvas.clientHeight;
    ctx.clearRect(0,0,W,H);

    const cam = getCamera(world);
    ctx.save();
    ctx.translate(W/2 - cam.x, H/2 - cam.y);

    //ROOMS
    for (const r of world.rooms) {
        ctx.fillStyle = '#0b0b0b';
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = '#2a2a2a';
        ctx.strokeRect(r.x, r.y, r.w, r.h);
    }

    //Entities
    for (const e of world.entities) {
        if (e.kind === 'player') {
            ctx.save();
            ctx.translate(e.pos.x, e.pos.y);
            ctx.rotate(e.angle || 0);
            ctx.fillStyle = '#e5e7eb';
            ctx.beginPath();
            ctx.moveTo(12, 0); ctx.lineTo(-10, 8); ctx.lineTo(-10, -8); ctx.closePath();
            ctx.fill();
            ctx.restore();
        } else if (e.kind === 'enemy') {
            ctx.fillStyle = '#ef4444';
            circle(ctx, e.pos.x, e.pos.y, e.radius);
        } else if (e.kind === 'projectile') {
            ctx.fillStyle = '#60a5fa';
            circle(ctx, e.pos.x, e.pos.y, e.radius);
        }
    }
    ctx.restore();
}

function circle(ctx:CanvasRenderingContext2D, x:number, y:number, r:number) {
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
}