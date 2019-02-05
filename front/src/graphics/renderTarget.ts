/**
 * A target for raw graphical rendering.  Uses a scale of [0,1] in both axes,
 * with positive X going to the right and positive Y going down.
 */
export interface IRenderTarget {
    /**
     * Begins a new frame by clearing the draw area and starting a new path.
     */
    begin(): void;

    /**
     * Draws a rect in [0,1] space.
     * @param x The top left of the rectangle within [0,1]
     * @param y The top left of the rectangle within [0,1]
     * @param width The width of the rectangle within [0,1]
     * @param height The height of the rectangle within [0,1]
     */
    rect(x: number, y: number, width: number, height: number): void;

    /**
     * Draws a circle in [0,1] space.
     * @param x The x coordinate of the center within [0,1]
     * @param y The y coordinate of the center within [0,1]
     * @param r The radius of the circle within [0,1]
     */
    circle(x: number, y: number, r: number): void;

    /**
     *
     * @param s The text string to draw.
     * @param x The x coordinate of the top left corner within [0,1]
     * @param y The y coordinate of the top left corner within [0,1]
     */
    text(s: string, x: number, y: number): void;
}
