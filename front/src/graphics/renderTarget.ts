/**
 * A target for raw graphical rendering.  Uses a scale of [0,1] in both axes,
 * with positive X going to the right and positive Y going down.
 */
export interface IRenderTarget {
    /**
     * Updates the size, keeping the dimensions square such that the entire target
     * will fit within the smaller of the two dimensions.
     *
     * @param width The width in pixels
     * @param height The height in pixels
     */
    resize(width: number, height: number): void;

    /**
     * Begins a new frame by clearing the draw area and starting a new path.
     */
    beginFrame(): void;

    /**
     * Begins a new scene, giving the render target a chance to initialize its
     * world/cache if it has one.
     */
    beginScene(): void;

    /**
     * Draws a rect in [0,1] space.
     * @param id The Entity ID for the rectangle
     * @param x The top left of the rectangle within [0,1]
     * @param y The top left of the rectangle within [0,1]
     * @param width The width of the rectangle within [0,1]
     * @param height The height of the rectangle within [0,1]
     */
    rect(id: number, x: number, y: number, width: number, height: number): void;

    /**
     * Draws a circle in [0,1] space.
     * @param id The Entity ID for the circle
     * @param x The x coordinate of the center within [0,1]
     * @param y The y coordinate of the center within [0,1]
     * @param r The radius of the circle within [0,1]
     */
    circle(id: number, x: number, y: number, r: number): void;

    /**
     * Draws text on the screen
     * @param id The Entity ID for the text
     * @param s The text string to draw.
     * @param x The x coordinate of the bottom left corner within [0,1]
     * @param y The y coordinate of the bottom left corner within [0,1]
     */
    text(id: number, s: string, x: number, y: number): void;
}
