!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var i,o;i=[n,t,n(1),n(2)],void 0===(o=function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),window.addEventListener("load",function(){var e=new n.SquareRenderTarget(function(){var e=document.getElementById("playArea");if(void 0===e)throw new Error("Could not find canvas");var t=e.getContext("2d");if(null==t)throw new Error("Could not find 2d context on canvas");return t}());e.updateSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",function(){e.updateSize(window.innerWidth,window.innerHeight)});new i.Connection("ws://localhost:8000/join")})}.apply(t,i))||(e.exports=o)},function(e,t,n){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.pixelScale=1,this.ctx=e,this.updateSize(this.ctx.canvas.width,this.ctx.canvas.height)}return e.prototype.updateSize=function(e,t){this.pixelScale=Math.min(e,t),this.ctx.canvas.width=this.pixelScale,this.ctx.canvas.height=this.pixelScale},e.prototype.begin=function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.beginPath()},e.prototype.rect=function(e,t,n,i){this.ctx.rect(e*this.pixelScale,t*this.pixelScale,n*this.pixelScale,i*this.pixelScale),this.ctx.fill()},e.prototype.circle=function(e,t,n){this.ctx.arc(e*this.pixelScale,t*this.pixelScale,n*this.pixelScale,0,2*Math.PI)},e}();t.SquareRenderTarget=n}.apply(t,[n,t]))||(e.exports=i)},function(e,t,n){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e){var t=new WebSocket(e),n=setInterval(function(){var e=new Date;t.send(e.toISOString())},5e3);t.onopen=function(e){console.log("OPEN")},t.onclose=function(e){console.log("CLOSE"),clearInterval(n)},t.onmessage=function(e){JSON.parse(e.data)},t.onerror=function(e){console.log("ERROR: "+e)}}}();t.Connection=n}.apply(t,[n,t]))||(e.exports=i)}]);