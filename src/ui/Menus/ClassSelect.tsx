import React from 'react'
import { CLASSES, ClassKey } from '../../game/classes'

export default function ClassSelect({ onPick, onBack } : { onPick:(k:ClassKey) => void; onBack:() => void}) {
    return (
        <div className='p-3 bg-zinc-900/70 rounded-2xl'>
            <div className='text-lg font-semibold mb-2'>Vyber si třídu</div>
            <div className='grid grid-cols-1 gap-2'>
                {Object.entries(CLASSES).map(([k, v]) => (
                    <button key={k} onClick={() => onPick(k as ClassKey)} className='px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left'>
                        <div className='font-medium'>{v.name}</div>
                        <div className='text-xs text-zinc-400'>{v.desc}</div>
                    </button>
                ))}
            </div>
            <button onClick={onBack} className='mt-2 underline'>Zpět</button>
        </div>
    );
}