export interface InputState {
    /**
     * The amount to move up (negative) or down (positive) in the range [-1,1]
     */
    movementAxis: number;

    /**
     * The incrementing index of the input for ordering purposes
     */
    index: number;
}