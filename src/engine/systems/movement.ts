import { World } from '../types'

export function systemMovement(world: World) {
    const p = world.entities.find(e => e.id === world.playerId)!;
    const input = world.input;
    const dirX = (input.right?1:0) - (input.left?1:0);
    const dirY = (input.down?1:0) - (input.up?1:0);
    const len = Math.hypot(dirX, dirY) || 1;
    const speed = p.speed ?? 140;
    const vx = (dirX/len) * speed;
    const vy = (dirY/len) * speed;
    p.vel.x = vx; p.vel.y = vy;
    p.angle = Math.atan2(input.my - p.pos.y, input.mx - p.pos.x);

    for (const e of world.entities) {
        e.pos.x += (e.vel.x || 0) * world.dt;
        e.pos.y += (e.vel.y || 0) * world.dt;
    }

    const r = world.rooms[world.currentRoom];
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    p.pos.x = clamp(p.pos.x, r.x + p.radius, r.x + r.w - p.radius);
    p.pos.y = clamp(p.pos.y, r.y + p.radius, r.y + r.h - p.radius);
}

