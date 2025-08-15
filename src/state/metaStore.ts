import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MetaState = {
  unlocked: string[];
  bestFloor: number;
  addUnlock: (k:string)=>void;
  setBestFloor: (n:number)=>void;
};

export const useMetaStore = create<MetaState>()(persist((set, get)=>({
  unlocked: [],
  bestFloor: 0,
  addUnlock: (k)=> set(s=> s.unlocked.includes(k) ? s : { unlocked: [...s.unlocked, k] }),
  setBestFloor: (n)=> set({ bestFloor: Math.max(n, get().bestFloor) }),
}), { name: 'meta-v1' }));