export function makeRng(seed:number) {
    let s = seed || 1;
    return function() {
        s ^= s <<13; s ^= s >>> 17; s ^= s << 5; s |= 0;
        return (s >>> 0)
    };
}