import type { Room } from '../engine/types'

export function generateDungeon(rng: () => number): Room[] {
    const rooms: Room[] = [];
    let x = 40, y = 40;
    const count = 6 + Math.floor(rng() * 3);
    for (let i = 0; i < count; i++) {
        const w = 260 + Math.floor(rng() * 120);
        const h = 180 + Math.floor(rng() * 80);
        rooms.push({ x, y, w, h, cleared: false});
        x += w + 120;
    }
    return rooms;
}