import { World } from '../types';

export function systemCombat(world: World){
  const p = world.entities.find(e => e.id === world.playerId)!;

  const rate = p.fireRate ?? 8;     // shots per second
  const cd   = 1 / rate;

  p.nextFire = (p.nextFire ?? 0) - world.dt;

  if (world.input.mdown && (p.hp ?? 0) > 0 && (p.nextFire ?? 0) <= 0) {
    spawnBullet(world, p.pos.x, p.pos.y, p.angle || 0, 260, 10);
    p.nextFire = cd;
  }

  // TTL projektilů
  let proj = 0;
  for (let i = world.entities.length - 1; i >= 0; i--) {
    const e = world.entities[i];
    if (e.kind === 'projectile') {
      proj++;
      e.ttl = (e.ttl ?? 0) - world.dt;
      if ((e.ttl ?? 0) <= 0) {
        world.entities.splice(i, 1);
      }
    }
  }
  world.stats.projectiles = proj;
}

function spawnBullet(
  world: World, x: number, y: number, angle: number, speed: number, dmg: number
){
  world.entities.push({
    id: world.nextId++,
    kind: 'projectile',
    pos: { x, y },
    vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
    radius: 3,
    dmg,
    ttl: 1.2,
  });
}
