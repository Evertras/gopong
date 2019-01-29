!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var i,o;i=[n,t,n(1),n(2),n(3)],void 0===(o=function(e,t,n,i,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),window.addEventListener("load",function(){var e=new n.SquareRenderTarget(function(){var e=document.getElementById("playArea");if(void 0===e)throw new Error("Could not find canvas");var t=e.getContext("2d");if(null==t)throw new Error("Could not find 2d context on canvas");return t}());e.updateSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",function(){e.updateSize(window.innerWidth,window.innerHeight)});var t=new o.GameState(.1,.1,.02);function r(t,n,i){var o=i,r=1===t?0:.97,a=n-.5*o;e.rect(r,a,.03,o)}function a(t){var n,i,o;e.begin(),r(1,t.paddleLeft.center,t.paddleLeft.height),r(2,t.paddleRight.center,t.paddleRight.height),n=t.ball.x,i=t.ball.y,o=t.ball.radius,e.circle(n,i,o)}new i.Connection("ws://localhost:8000/join",function(e){t.applyServerUpdate(e),a(t)},function(e){console.log("Got config!",e)}).start()})}.apply(t,i))||(e.exports=o)},function(e,t,n){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.pixelScale=1,this.ctx=e,this.updateSize(this.ctx.canvas.width,this.ctx.canvas.height)}return e.prototype.updateSize=function(e,t){this.pixelScale=Math.min(e,t),this.ctx.canvas.width=this.pixelScale,this.ctx.canvas.height=this.pixelScale},e.prototype.begin=function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.beginPath()},e.prototype.rect=function(e,t,n,i){this.ctx.rect(e*this.pixelScale,t*this.pixelScale,n*this.pixelScale,i*this.pixelScale),this.ctx.fill()},e.prototype.circle=function(e,t,n){this.ctx.arc(e*this.pixelScale,t*this.pixelScale,n*this.pixelScale,0,2*Math.PI),this.ctx.fill()},e}();t.SquareRenderTarget=n}.apply(t,[n,t]))||(e.exports=i)},function(e,t,n){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t,n){this.endpoint=e,this.stateCallback=t,this.gameConfigCallback=n}return e.prototype.start=function(){var e=this,t=new WebSocket(this.endpoint),n=setInterval(function(){var e=new Date;t.send(e.toISOString())},5e3);t.onopen=function(){console.log("OPEN")},t.onclose=function(){console.log("CLOSE"),clearInterval(n)},t.onmessage=function(t){var n=JSON.parse(t.data),i=n;if(i)e.stateCallback(i);else{var o=n;o?e.gameConfigCallback(o):console.warn("Unknown message received:",t.data)}},t.onerror=function(e){console.log("ERROR: "+e)}},e}();t.Connection=n}.apply(t,[n,t]))||(e.exports=i)},function(e,t,n){var i,o;i=[n,t,n(4),n(5)],void 0===(o=function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t,o){this.paddleLeft=new n.Paddle(e,t,!0),this.paddleRight=new n.Paddle(e,t,!1),this.ball=new i.Ball(o)}return e.prototype.step=function(e,t){this.paddleLeft.step(e,t),this.paddleRight.step(e,t)},e.prototype.applyServerUpdate=function(e){this.paddleLeft.applyServerUpdate(e.pL),this.paddleRight.applyServerUpdate(e.pR),this.ball.applyServerUpdate(e.b)},e}();t.GameState=o}.apply(t,i))||(e.exports=o)},function(e,t,n){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t,n){this.center=.5,this.height=e,this.maxSpeedPerSecond=t,this.isPlayer=n}return e.prototype.step=function(e,t){this.isPlayer&&(t.up&&(this.center-=this.maxSpeedPerSecond*e),t.down&&(this.center+=this.maxSpeedPerSecond*e))},e.prototype.applyServerUpdate=function(e){this.center=e.c},e}();t.Paddle=n}.apply(t,[n,t]))||(e.exports=i)},function(e,t,n){var i;void 0===(i=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.x=.5,this.y=.5,this.radius=.1,this.radius=e}return e.prototype.applyServerUpdate=function(e){this.x=e.x,this.y=e.y},e}();t.Ball=n}.apply(t,[n,t]))||(e.exports=i)}]);