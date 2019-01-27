// Code generated by go generate; DO NOT EDIT.
// This file was generated by robots at
// 2019-01-26 18:04:39.7622497 -0800 PST m=+0.017532701
package static

// StaticHtmlIndex is the raw contents of index.html
var StaticHtmlIndex = `<html>
    <head>
        <title>Go Pong</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <canvas id="playArea"></canvas>
        <script src="game.js"></script>
    </body>
</html>
`

// StaticJsGame is the raw contents of game.js
var StaticJsGame = `!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){var o,i;o=[n,e,n(1),n(2)],void 0===(i=function(t,e,n,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),window.addEventListener("load",function(t){new n.SquareRenderTarget(function(){var t=document.getElementById("playArea");if(void 0===t)throw new Error("Could not find canvas");var e=t.getContext("2d");if(null==e)throw new Error("Could not find 2d context on canvas");return e}()),new o.Connection("ws://localhost:8000/join")})}.apply(e,o))||(t.exports=i)},function(t,e,n){var o;void 0===(o=function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.pixelScale=1,this.ctx=t,this.updateSize(this.ctx.canvas.width,this.ctx.canvas.height)}return t.prototype.updateSize=function(t,e){this.pixelScale=Math.min(this.ctx.canvas.height,this.ctx.canvas.width),this.ctx.canvas.width=t,this.ctx.canvas.height=e},t.prototype.begin=function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.beginPath()},t.prototype.rect=function(t,e,n,o){this.ctx.rect(t*this.pixelScale,e*this.pixelScale,n*this.pixelScale,o*this.pixelScale),this.ctx.fill()},t.prototype.circle=function(t,e,n){this.ctx.arc(t*this.pixelScale,e*this.pixelScale,n*this.pixelScale,0,2*Math.PI)},t}();e.SquareRenderTarget=n}.apply(e,[n,e]))||(t.exports=o)},function(t,e,n){var o;void 0===(o=function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){return function(t){var e=new WebSocket(t),n=setInterval(function(){var t=new Date;e.send(t.toISOString())},5e3);e.onopen=function(t){console.log("OPEN")},e.onclose=function(t){console.log("CLOSE"),clearInterval(n)},e.onmessage=function(t){JSON.parse(t.data)},e.onerror=function(t){console.log("ERROR: "+t)}}}();e.Connection=n}.apply(e,[n,e]))||(t.exports=o)}]);`

// StaticCssStyle is the raw contents of style.css
var StaticCssStyle = `/* This is all in one file... imagine a really cool build process *magic* */

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* Begin our own style */

body {
    background-color: #222233;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#playArea {
    background: white;
    display: block;
    margin: 0 auto; /* horizontally center */
}
`