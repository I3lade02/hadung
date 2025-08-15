import { World } from './types'
import { drawFrame } from '../render/draw'
import { bindControls } from '../input/controls'
import { systemMovement } from './systems/movement'
import { systemCombat } from './systems/combat'
import { systemAI } from './systems/ai'
import { systemCollisions } from './systems/collisions'

export function startLoop(ctx: CanvasRenderingContext2D, world: World, setSnapshot: (s:any) => void){
    const unbind = bindControls(ctx.canvas, world);
    let last = performance.now();
    let frames = 0; let fpsT = 0; let fps = 0;

    function frame(now: number) {
        const dt = (now - last) / 1000; last = now; world.accum += dt; world.time += dt;
        while (world.accum >= world.dt) {
            tick(world);
            world.accum -= world.dt;
        }
        drawFrame(ctx, world);

        frames++; fpsT += dt; if (fpsT >= 0.5){ fps = frames / fpsT; frames = 0; fpsT = 0; }
        setSnapshot({ hp: world.entities.find(e => e.id === world.playerId)?.hp ?? 0, enemyCount: world.stats.enemies, projectileCount: world.stats.projectiles, fps });
        raf = requestAnimationFrame(frame);
    }
    let raf = requestAnimationFrame(frame);
    return () => { unbind(); cancelAnimationFrame(raf); };
}

export function stopLoop(stop: () => void){ stop(); }

function tick(world: World) {
    systemMovement(world);
    systemCombat(world);
    systemAI(world);
    systemCollisions(world);
}