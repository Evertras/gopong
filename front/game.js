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

function drawBall(x, y, r) {
    // Convert to actual pixel values here
    ctx.arc(
        x * currentScale,
        y * currentScale,
        r * currentScale,
        0,
        2 * Math.PI);

    ctx.fill();
}

function drawState(s) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    drawPaddle(1, s.pL.c, s.pL.h);
    drawPaddle(2, s.pR.c, s.pR.h);
    drawBall(s.b.pX, s.b.pY, s.b.r);
}

sizeCanvas();

window.addEventListener("load", function(evt) {
    let ws = new WebSocket("ws://localhost:8000/join");

    // For now, just send some random messages for the server to read
    let i = setInterval(() => {
        let time = new Date();
        ws.send(time);
    }, 5000);

    ws.onopen = function(evt) {
        console.log("OPEN");
    }

    ws.onclose = function(evt) {
        console.log("CLOSE");
        clearInterval(i);
    }

    ws.onmessage = function(evt) {
        let parsed = JSON.parse(evt.data);

        drawState(parsed);
    }

    ws.onerror = function(evt) {
        console.log("ERROR: " + evt.data);
    }
});
