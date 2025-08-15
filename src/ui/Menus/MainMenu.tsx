import React from 'react'

export default function MainMenu({ onStart } : { onStart:() => void }) {
    return (
        <div className='p-3 bg-zinc-900/70 rounded-2xl'>
            <div className='text-lg font-semibold mb-2'>HaDung</div>
            <button onClick={onStart} className='px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl'>Nová hra</button>
        </div>
    );
}