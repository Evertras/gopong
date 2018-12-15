// This is super jank all stuck in one file, imagine a much nicer
// build/generate pipe and actual good code instead... *magic*

const canvas = document.getElementById("playArea");
const ctx = canvas.getContext("2d");

// Use this as a multiplier for drawing, will be set to pixel size of canvas
let currentScale = 1;

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

window.addEventListener("load", function(evt) {
    let ws = new WebSocket("ws://localhost:8000/join");

    ws.onopen = function(evt) {
        console.log("OPEN");
    }

    ws.onclose = function(evt) {
        console.log("CLOSE");
    }

    ws.onmessage = function(evt) {
        console.log("RESPONSE: " + evt.data);
    }

    ws.onerror = function(evt) {
        console.log("ERROR: " + evt.data);
    }

    setInterval(() => {
        let time = new Date();
        console.log("SEND: " + time);
        ws.send(time);
    }, 1000);
});
