export class Paddle {
    public c: number = 0.5;
    public s: number = 0;
}

export class Ball {
    public pX: number = 0.5;
    public pY: number = 0.5;
    public vX: number = 0;
    public vY: number = 0;
}

export class State {
    public pL: Paddle | null = null;
    public pR: Paddle | null = null;
    public b: Ball | null = null;
}