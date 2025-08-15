import type { World } from '../engine/types'

export function getCamera(world: World) {
    const p = world.entities.find(e => e.id === world.playerId)!;
    return { x: p.pos.x, y: p.pos.y };
}