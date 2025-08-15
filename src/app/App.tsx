import React, { useEffect, useRef, useState } from 'react';
import { Route } from './routes';
import HUD from '../ui/HUD';
import MainMenu from '../ui/Menus/MainMenu';
import ClassSelect from '../ui/Menus/ClassSelect';
import { useRunStore } from '../state/runStore';
import { startLoop, stopLoop } from '../engine/loop';
import { initWorld } from '../engine/world';
import { setupCanvas } from '../render/canvas';

export default function App() {
  const [route, setRoute] = useState<Route>('menu');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { snapshot, setSnapshot, startRun, endRun } = useRunStore();

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = setupCanvas(c);
    const world = initWorld();
    const stop = startLoop(ctx, world, setSnapshot);
    return () => stopLoop(stop);
  }, [setSnapshot]);

  return (
    <div className='min-h-screen bg-black text-gray-200'>
      <div className='max-w-6xl mx-auto p-3 grid grid-cols-1 lg_grid-cols-12 gap-3'>
        <div className='lg:col-span-9 bg-zinc-900/60 rounded-2xl overflow-hidden'>
          <canvas ref={canvasRef} className='w-full h-[72vh] block'/>
        </div>
        <div className='lg:col-span-3 flex flex-col gap-3'>
          {route === 'menu' && <MainMenu onStart={() => setRoute('class-select')} />}
          {route === 'class-select' && <ClassSelect onPick={(cls) => { startRun(cls); setRoute('run'); }} onBack={() => setRoute('menu')} />}
          {route === 'run' && <HUD />}
          {route==='dead' && (
            <div className="p-3 bg-red-900/40 rounded-xl">Padl jsi. <button className="underline" onClick={()=>{ endRun(); setRoute('menu'); }}>Zpět do menu</button></div>
          )}
        </div>
      </div>
    </div>
  );
}