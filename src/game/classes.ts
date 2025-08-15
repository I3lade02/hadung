export type ClassKey = 'warrior'|'ranger'|'mystic';
export const CLASSES: Record<ClassKey, { name:string; desc:string, base:{ hp:number, speed:number } } >= {
    warrior: { name: 'Bojovník', desc: 'Na blízko, rychlý dash a vyšší HP', base:{ hp: 120, speed: 140} },
    ranger: { name: 'Lovec', desc: 'Střelba na dálku, rychlejší palba', base:{ hp: 100, speed: 160} },
    mystic: { name: 'Mystik', desc: 'Kouzla a projektily', base:{ hp: 90, speed: 150} },
};