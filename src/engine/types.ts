export type V2 = { x:number; y:number };
export type EntityId = number;

export type EntityKind = 'player'|'enemy'|'projectile';

export type BaseEntity = {
  id: EntityId;
  kind: EntityKind;
  pos: V2;
  vel: V2;
  radius: number;
  angle?: number; // facing (rad)
  hp?: number;
  maxHp?: number;
  dmg?: number;
  speed?: number;
  ttl?: number; // for projectiles
  nextFire?: number;
  fireRate?: number;
};

export type Room = { x:number; y:number; w:number; h:number; cleared:boolean };

export type World = {
  time: number;
  accum: number;
  dt: number; // fixed dt (s)
  entities: BaseEntity[];
  nextId: number;
  playerId: EntityId;
  rooms: Room[];
  currentRoom: number;
  rng: ()=>number;
  input: { up:boolean; down:boolean; left:boolean; right:boolean; mx:number; my:number; mdown:boolean; dash:boolean };
  stats: { enemies:number; projectiles:number };
};
