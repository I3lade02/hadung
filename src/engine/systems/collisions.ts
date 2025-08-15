import { World } from '../types';

export function systemCollisions(world: World){
  // projectiles vs enemies
  const projs = world.entities.filter(e=> e.kind==='projectile');
  for (const p of projs){
    for (const e of world.entities){
      if (e.kind!=='enemy') continue;
      const dx = e.pos.x - p.pos.x, dy = e.pos.y - p.pos.y;
      if (dx*dx + dy*dy <= (e.radius + p.radius)*(e.radius + p.radius)){
        e.hp = (e.hp||30) - (p.dmg||5);
        p.ttl = -1; // kill
      }
    }
  }
  // remove dead enemies
  for (let i=world.entities.length-1;i>=0;i--){
    const e = world.entities[i];
    if (e.kind==='enemy' && (e.hp||0) <= 0){ world.entities.splice(i,1); }
  }
}