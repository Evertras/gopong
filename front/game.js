// This is super jank all stuck in one file, imagine a much nicer build/generate pipe instead... *magic*

const canvas = document.getElementById("playArea");
const context = canvas.getContext("2d");

console.log("Starting game")

context.rect(0, 0, 10, 10);
context.stroke();
