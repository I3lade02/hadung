import type { World } from '../engine/types';

export function bindControls(canvas: HTMLCanvasElement, world: World){
  const down = (e:KeyboardEvent)=>{
    if (e.repeat) return;
    if (e.key==='w' || e.key==='ArrowUp') world.input.up = true;
    if (e.key==='s' || e.key==='ArrowDown') world.input.down = true;
    if (e.key==='a' || e.key==='ArrowLeft') world.input.left = true;
    if (e.key==='d' || e.key==='ArrowRight') world.input.right = true;
    if (e.key===' ') { world.input.dash = true; e.preventDefault(); }
  };
  const up = (e:KeyboardEvent)=>{
    if (e.key==='w' || e.key==='ArrowUp') world.input.up = false;
    if (e.key==='s' || e.key==='ArrowDown') world.input.down = false;
    if (e.key==='a' || e.key==='ArrowLeft') world.input.left = false;
    if (e.key==='d' || e.key==='ArrowRight') world.input.right = false;
    if (e.key===' ') world.input.dash = false;
  };
  const mouse = (e:MouseEvent)=>{
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // map to world coords using current camera (approx by using player pos centered)
    const p = world.entities.find(en=> en.id===world.playerId)!;
    const cx = canvas.clientWidth/2, cy = canvas.clientHeight/2;
    world.input.mx = p.pos.x + (mx - cx);
    world.input.my = p.pos.y + (my - cy);
  };
  const mdown = ()=> world.input.mdown = true;
  const mup = ()=> world.input.mdown = false;

  window.addEventListener('keydown', down);
  window.addEventListener('keyup', up);
  canvas.addEventListener('mousemove', mouse);
  canvas.addEventListener('mousedown', mdown);
  window.addEventListener('mouseup', mup);

  return ()=>{
    window.removeEventListener('keydown', down);
    window.removeEventListener('keyup', up);
    canvas.removeEventListener('mousemove', mouse);
    canvas.removeEventListener('mousedown', mdown);
    window.removeEventListener('mouseup', mup);
  };
}
