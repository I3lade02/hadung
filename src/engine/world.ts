import { World, BaseEntity } from './types'
import { makeRng } from '../utils/rng'
import { generateDungeon } from '../gen/dungeon'

export function initWorld(): World {
    const rng = makeRng(Math.floor(Math.random()*1e9));
    const rooms = generateDungeon(rng);
    const player: BaseEntity = {
        id: 1, kind: 'player', pos: {x: rooms[0].x + rooms[0].w/2, y: rooms[0].y + rooms[0].h/2}, vel: {x: 0, y: 0},
        radius: 10, angle: 0, hp: 100, maxHp: 100, speed: 140
    };

    return {
        time: 0, accum: 0, dt: 1/60,
        entities: [player],
        nextId: 2,
        playerId: 1,
        rooms,
        currentRoom: 0,
        rng,
        input: { up:false, down:false, left:false, right:false, mx:0, my:0, mdown:false, dash:false },
        stats: { enemies: 0, projectiles: 0 },
    };
}