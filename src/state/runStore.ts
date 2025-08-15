import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ClassKey } from '../game/classes'

export type Snapshot = { hp: number; enemyCount: number; projectileCount: number; fps?: number };

export type RunState = {
    seed: number;
    floor: number;
    cls: ClassKey | '-';
    snapshot: Snapshot;
    setSnapshot: (s: Partial<Snapshot>) => void;
    startRun: (cls: ClassKey) => void;
    endRun: () => void;
};

export const useRunStore = create<RunState>()(persist((set) => ({
    seed: Math.floor(Math.random()*1e9),
    floor: 1,
    cls: '-',
    snapshot: { hp: 100, enemyCount: 0, projectileCount: 0, fps: 0 },
    setSnapshot: (s) => set(state => ({ snapshot: { ...state.snapshot, ...s } })),
    startRun: (cls) => set({ cls, floor: 1 }),
    endRun: () => set({ cls: '-', floor: 1}),
}), { name: 'run-v1', partialize: (s) => ({ seed: s.seed, floor: s.floor, cls: s.cls }) }));