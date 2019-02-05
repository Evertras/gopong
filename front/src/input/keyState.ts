export class KeyState {
    /**
     * Whether the key was held, regardless of its state last frame.
     */
    public held: boolean = false;

    /**
     * Whether the key was pressed this frame, but not the last.
     */
    public pressed: boolean = false;
}
