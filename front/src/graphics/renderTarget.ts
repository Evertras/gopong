/**
 * A target for raw graphical rendering.  Uses a scale of [0,1] in both axes,
 * with positive X going to the right and positive Y going down.
 */
export class SquareRenderTarget {
    private ctx: CanvasRenderingContext2D;
    private pixelScale: number = 1;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.updateSize(this.ctx.canvas.width, this.ctx.canvas.height);
    }

    /**
     * Updates the size, keeping the dimensions square such that the entire target
     * will fit within the smaller of the two dimensions.
     * @param width The width in pixels
     * @param height The height in pixels
     */
    public updateSize(width: number, height: number) {
        this.pixelScale = Math.min(width, height);

        this.ctx.canvas.width = this.pixelScale;
        this.ctx.canvas.height = this.pixelScale;
    }

    /**
     * Begins a new frame by clearing the draw area and starting a new path.
     */
    public begin() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
    }

    /**
     * Draws a rect in [0,1] space.
     * @param x The top left of the rectangle within [0,1]
     * @param y The top left of the rectangle within [0,1]
     * @param width The width of the rectangle within [0,1]
     * @param height The height of the rectangle within [0,1]
     */
    public rect(x: number, y: number, width: number, height: number) {
        this.ctx.rect(
            x * this.pixelScale,
            y * this.pixelScale,
            width * this.pixelScale,
            height * this.pixelScale
        );

        this.ctx.fill();
    }

    /**
     * Draws a circle in [0,1] space.
     * @param x The x coordinate of the center within [0,1]
     * @param y The y coordinate of the center within [0,1]
     * @param r The radius of the circle within [0,1]
     */
    public circle(x: number, y: number, r: number) {
        this.ctx.arc(
            x * this.pixelScale,
            y * this.pixelScale,
            r * this.pixelScale,
            0,
            Math.PI*2
        );

        this.ctx.fill();
    }
}
