export function setupCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!;
    const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth * dpr;
        const h = canvas.clientHeight * dpr;
        canvas.width = Math.max(1, Math.floor(w));
        canvas.height = Math.max(1, Math.floor(h));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    };
    resize();
    new ResizeObserver(resize).observe(canvas);
    return ctx;
}