import React from 'react'
import { useRunStore } from '../state/runStore'
import { BOSS_INTERVAL } from '../game/constants'

export default function HUD() {
    const { snapshot, floor, cls } = useRunStore();
    return (
        <div className='p-3 bg-zinc-900/70 rounded-2xl'>
            <div className='text-sm flex justify-between'>
                <div>
                    <div>Třída: <b>{cls}</b></div>
                    <div>Patro: <b>{floor}</b> {floor % BOOS_INTERVAL === 0 ? <span className='text-red-400'>(Boss)</span> : null}</div>
                    <div>HP: <b>{Math.ceil(snapshot.hp)}</b></div>
                </div>
                <div className='text-right'>
                    <div>FPS ~ {snapshot.fps?.toFixed(0) ?? '-'}</div>
                    <div>Enemies: {snapshot.enemyCount}</div>
                    <div>Projs: {snapshot.projectileCount}</div>
                </div>
            </div>
        </div>
    );
}