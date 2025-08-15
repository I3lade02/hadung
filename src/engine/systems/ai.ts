import { World } from '../types';

export function systemAI(world: World){
  const p = world.entities.find(e=> e.id===world.playerId)!;
  let enemies = 0;
  for (const e of world.entities){
    if (e.kind==='enemy'){
      enemies++;
      const dx = p.pos.x - e.pos.x; const dy = p.pos.y - e.pos.y;
      const d = Math.hypot(dx,dy) || 1;
      const sp = e.speed ?? 60;
      e.vel.x = (dx/d) * sp; e.vel.y = (dy/d) * sp;
    }
  }
  world.stats.enemies = enemies;
}
