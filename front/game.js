// This is super jank all stuck in one file, imagine a much nicer
// build/generate pipe and actual good code instead... *magic*

const canvas = document.getElementById("playArea");
const ctx = canvas.getContext("2d");

// Use this as a multiplier for drawing
let currentScale = 1.0;

console.log("Starting game")

function sizeCanvas() {
    let dim = Math.min(window.innerWidth, window.innerHeight);

    ctx.canvas.height = dim;
    ctx.canvas.width = dim;

    currentScale = dim;
}

function drawPaddle(player, pos, heightPercent) {
    // Dealing with [0,1] coordinates
    const width = 0.03;
    const height = heightPercent;
    const x = player === 1 ? 0 : 1-width;
    const y = pos - height*0.5;

    // Convert to actual pixel values here
    ctx.rect(
        x * currentScale,
        y * currentScale,
        width * currentScale,
        height * currentScale);

    ctx.fill();
}

function drawBall(x, y) {
    // Dealing with [0, 1] coordinates
    const radius = 0.02;

    // Convert to actual pixel values here
    ctx.arc(
        x * currentScale,
        y * currentScale,
        radius * currentScale,
        0,
        2 * Math.PI);

    ctx.fill();
}

sizeCanvas();
drawPaddle(1, 0.5, 0.2);
drawPaddle(2, 0.75, 0.2);
drawBall(0.6, 0.75);
