(this.webpackJsonptetris=this.webpackJsonptetris||[]).push([[0],{38:function(t,i,e){},63:function(t,i){},69:function(t,i,e){"use strict";e.r(i);var s=e(0),h=e.n(s),n=e(29),A=e.n(n),l=(e(38),e(33)),r=e(5),a=e(6),c=e(30),o=e.p+"static/media/groundKick.73a10bbd.wav",u=e.p+"static/media/levelUp.9e3f7cca.wav",g=e.p+"static/media/lineClear.d12bd73d.wav",d=e.p+"static/media/moveBrick_old.bd640195.wav",p=e.p+"static/media/tetris.5a7196b4.wav",f=e.p+"static/media/gameOver.794caa1d.wav",m=e.p+"static/media/font.5f45b521.ttf",v=[{name:"left_l",structure:[[1,1,1],[1,0,0]]},{name:"square",structure:[[1,1],[1,1]]},{name:"right_l",structure:[[1,1,1],[0,0,1]]},{name:"left_z",structure:[[0,1,1],[1,1,0]]},{name:"right_z",structure:[[1,1,0],[0,1,1]]},{name:"t-shape",structure:[[1,1,1],[0,1,0]]},{name:"woody",structure:[[1,1,1,1]]}],k=["blue","cyan","green","orange","pink","red","yellow"],w=function(){function t(i,e,s){Object(r.a)(this,t),this.x=i,this.y=e,this.color=s}return Object(a.a)(t,[{key:"setPosition",value:function(t,i){this.x=t,this.y=i}}]),t}();function E(t,i){return Math.floor(Math.random()*(i-t)+t)}w.BLOCK_WIDTH=24;var S=function(){function t(i,e,s,h,n){var A=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;Object(r.a)(this,t),this.fieldWidth=0,this.fieldHeight=0,this.x=i,this.y=e,this.fieldWidth=s,this.fieldHeight=h,this.shape=n,this.buildFromShape(this.shape,A)}return Object(a.a)(t,[{key:"buildFromShape",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.blocks=[],null===i&&(i=E(0,k.length)),this.blocks=t.structure.map((function(t,e){return t.map((function(t,s){return 1===t?new w(s,e,i):null}))}))}},{key:"renderPiece",value:function(t,i,e,s){e.push();var h=this;this.blocks.forEach((function(n){n.forEach((function(n){null!==n&&e.image(s[n.color],t+(n.x+h.x)*w.BLOCK_WIDTH,i+(n.y+h.y)*w.BLOCK_WIDTH,w.BLOCK_WIDTH,w.BLOCK_WIDTH)}))})),e.pop()}},{key:"isColliding",value:function(t,i,e){if(t<0||t>this.fieldWidth-this.getWidth()||i<0||i>this.fieldHeight-this.getHeight())return!0;for(var s=0;s<this.getHeight();s++)for(var h=0;h<this.getWidth();h++)if(null!==this.blocks[s][h]&&null!==e[i+s][t+h])return!0;return!1}},{key:"rotate",value:function(t,i){for(var e=this,s=new Array(this.getWidth()).fill(null).map((function(){return new Array(e.getHeight()).fill(null)})),h=0;h<this.getHeight();h++)for(var n=0;n<this.getWidth();n++){var A=1===t?this.getWidth()-n-1:n,l=-1===t?this.getHeight()-h-1:h;null!==this.blocks[l][A]&&(s[n][h]=new w(h,n,this.blocks[l][A].color))}var r=this.blocks;this.blocks=s,this.isColliding(this.x,this.y,i)&&(this.blocks=r)}},{key:"moveLeft",value:function(t){return this.isColliding(this.x-1,this.y,t)||this.x--,!1}},{key:"moveRight",value:function(t){return this.isColliding(this.x+1,this.y,t)||this.x++,!1}},{key:"moveDown",value:function(t){return!!this.isColliding(this.x,this.y+1,t)||(this.y++,!1)}},{key:"drop",value:function(t){for(;!0!==this.moveDown(t););return!0}},{key:"getWidth",value:function(){return this.blocks[0].length}},{key:"getHeight",value:function(){return this.blocks.length}}]),t}(),W=e(7),B=function(){function t(i){Object(r.a)(this,t),this.blockSprites=[],this.retroFont=null,this.fieldWidth=10,this.fieldHeight=24,this.fieldBlockSize=w.BLOCK_WIDTH,this.field=[],this.currentPiece=null,this.nextPiece=null,this.tickLength=400,this.lastTick=0,this.level=0,this.score=0,this.lines=0,this.pause=!1,this.gameOver=!1,this.p5=i,this.p5.setup=this.setup.bind(this),this.p5.draw=this.draw.bind(this),this.p5.keyPressed=this.keyPressed.bind(this),this.p5.preload=this.preload.bind(this)}return Object(a.a)(t,[{key:"preload",value:function(){this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHgD009lyAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAACpJREFUOMtjYBhsgBFK+/wn34wtjAwMDEzUctGoQaMGjRo0atCoQUMHAADgbgIovJYplAAAAABJRU5ErkJggg==")),this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHhYAB2wjAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAACpJREFUOMtjYBhsgBFKP/xPvhnyjAwMDEzUctGoQaMGjRo0atCoQUMHAAADaQIoT5PVDwAAAABJRU5ErkJggg==")),this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHi2xDIUHAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAACtJREFUOMtjYBhsgBFC6f4n34jLjAwMDAxM1HLRqEGjBo0aNGrQqEFDBwAA2yoCKOvP1RAAAAAASUVORK5CYII=")),this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHBWrOF8bAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAClJREFUOMtjYBhsgBFC/S+mwIheBgYGBiZquWjUoFGDRg0aNWjUoKEDAOuSAiiaaDUTAAAAAElFTkSuQmCC")),this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHSd69D/aAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAACxJREFUOMtjYBhsgBFCfWD4T7YRAgyMDAwMTNRy0ahBowaNGjRq0KhBQwcAAAftAih5fL0DAAAAAElFTkSuQmCC")),this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHwWdohy8AAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAACNJREFUOMtjYBhsgBFC/afYCCZquWjUoFGDRg0aNWjUoKEDAM5EASifFAgvAAAAAElFTkSuQmCC")),this.blockSprites.push(this.p5.loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpUUrDhYVcchQHcSCqIijVLEIFkpboVUHk0u/oElDkuLiKLgWHPxYrDq4OOvq4CoIgh8gbm5Oii5S4v/SQosYD4778e7e4+4dINRKTDU7JgBVs4xENCKmM6ui7xXd8KMfAxiTmKnHkospuI6ve3j4ehfmWe7n/hw9StZkgEcknmO6YRFvEM9sWjrnfeIgK0gK8TnxuEEXJH7kutzgN855hwWeGTRSiXniILGYb2O5jVnBUImniUOKqlG+kG6wwnmLs1qqsOY9+QsDWW0lyXWaw4hiCTHEIUJGBUWUYCFMq0aKiQTtR1z8Q44/Ti6ZXEUwciygDBWS4wf/g9/dmrmpyUZSIAJ0vtj2xwjg2wXqVdv+Prbt+gngfQautJa/XANmP0mvtrTQEdC7DVxctzR5D7jcAQafdMmQHMlLU8jlgPcz+qYM0HcLdK01emvu4/QBSFFXyzfAwSEwmqfsdZd3+9t7+/dMs78flYdyteIbTboAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQflCwgWHxoQqhFJAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAACpJREFUOMtjYBhsgBFC/d9LgRHODAwMDEzUctGoQaMGjRo0atCoQUMHAAD86gIoi2CmnAAAAABJRU5ErkJggg==")),this.retroFont=this.p5.loadFont(m),this.soundGroundKick=new Audio(o),this.soundLevelUp=new Audio(u),this.soundLineClear=new Audio(g),this.soundMoveBrick=new Audio(d),this.soundTetris=new Audio(p),this.soundGameOver=new Audio(f)}},{key:"setup",value:function(){this.p5.createCanvas(800,600),this.p5.background(50),this.p5.frameRate(30),this.p5.textFont(this.retroFont),this.newGame()}},{key:"draw",value:function(){this.heartBeat(),this.p5.background(50),this.renderField(280,10),this.renderGui()}},{key:"newGame",value:function(){this.createField(),this.drawNextPiece(),this.useNextPiece(),this.drawNextPiece(),this.score=0,this.level=0,this.lines=0,this.lastTick=this.p5.millis(),this.gameStart=!0,this.pause=!1,this.gameOver=!1}},{key:"heartBeat",value:function(){if(!(this.pause||this.gameOver||this.gameStart)){var t=this.p5.millis();t-this.lastTick>=this.tickLength&&(this.lastTick=t,this.clearLines(),this.gravity(),this.updateLevel())}}},{key:"createField",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.fieldWidth,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.fieldHeight;this.field=new Array(i).fill(null).map((function(){return new Array(t).fill(null)}))}},{key:"renderField",value:function(t,i){this.p5.push(),this.p5.noFill(),this.p5.stroke(100),this.p5.strokeWeight(2),this.p5.rect(t,i,this.fieldWidth*this.fieldBlockSize,this.fieldHeight*this.fieldBlockSize),this.p5.noStroke(),this.p5.fill(40),this.p5.rect(t+this.currentPiece.x*w.BLOCK_WIDTH,i,this.currentPiece.getWidth()*w.BLOCK_WIDTH,this.fieldHeight*this.fieldBlockSize);var e=this;this.field.forEach((function(s,h){return s.forEach((function(s,n){null!==s&&e.p5.image(e.blockSprites[s],t+n*w.BLOCK_WIDTH,i+h*w.BLOCK_WIDTH,w.BLOCK_WIDTH,w.BLOCK_WIDTH)}))})),this.p5.pop(),this.currentPiece.renderPiece(t,i,this.p5,this.blockSprites)}},{key:"renderGui",value:function(){this.p5.push(),this.p5.noStroke(),this.p5.fill(255),this.p5.textSize(20),this.p5.textAlign(this.p5.RIGHT),this.p5.text("SCORE\n"+this.score,250,50),this.p5.text("LINES\n"+this.lines,250,150),this.p5.textAlign(this.p5.LEFT),this.p5.text("LEVEL \n"+this.level,550,50),this.p5.text("NEXT",550,380),this.p5.noFill(),this.p5.stroke(100),this.p5.strokeWeight(2),this.p5.rect(550,400,120,120);var t=this.nextPiece.getWidth()/2*this.fieldBlockSize,i=this.nextPiece.getHeight()/2*this.fieldBlockSize;this.nextPiece.renderPiece(610-t,460-i,this.p5,this.blockSprites),this.p5.noStroke(),this.gameStart&&(this.p5.fill(50,220),this.p5.rect(0,0,this.p5.width,this.p5.height),this.p5.fill(255),this.p5.textAlign(this.p5.CENTER),this.p5.textSize(64),this.p5.text("TETRIS",this.p5.width/2,this.p5.height/2),this.p5.textSize(20),this.p5.text("ROMAN D\u0104BAL & PIOTR K\u0141OSEK",this.p5.width/2,this.p5.height-20),this.p5.text('PRESS "R" TO START',this.p5.width/2,this.p5.height/2+50)),this.pause&&(this.p5.fill(50,220),this.p5.rect(0,0,this.p5.width,this.p5.height),this.p5.fill(255),this.p5.textAlign(this.p5.CENTER),this.p5.textSize(64),this.p5.text("PAUSE",this.p5.width/2,this.p5.height/2),this.p5.textSize(20),this.p5.text('PRESS "P" TO RESUME',this.p5.width/2,this.p5.height/2+50)),this.gameOver&&(this.p5.fill(50,220),this.p5.rect(0,0,this.p5.width,this.p5.height),this.p5.fill(255),this.p5.textAlign(this.p5.CENTER),this.p5.textSize(64),this.p5.text("GAME OVER",this.p5.width/2,this.p5.height/2),this.p5.textSize(20),this.p5.text('PRESS "R" TO TRY AGAIN',this.p5.width/2,this.p5.height/2+50)),this.p5.pop()}},{key:"gravity",value:function(){this.currentPiece.moveDown(this.field)&&(this.freezeCurrentBlock(),this.useNextPiece())}},{key:"clearLines",value:function(){for(var t=0,i=this.fieldHeight-1;i>=0;i--)if(this.field[i].reduce((function(t,i){return t&null!==i}),!0)){this.field[i]=this.field[i].map((function(){return null}));for(var e=i;e>0;e--)this.field[e]=Object(l.a)(this.field[e-1]);i++,t++}t&&(this.playSound(4===t?this.soundTetris:this.soundLineClear),this.score+=t*t*(this.level+1)*100,this.lines+=t)}},{key:"freezeCurrentBlock",value:function(){this.playSound(this.soundGroundKick);for(var t=this.currentPiece.x,i=this.currentPiece.y,e=0;e<this.currentPiece.getHeight();e++)for(var s=0;s<this.currentPiece.getWidth();s++)null!==this.currentPiece.blocks[e][s]&&(this.field[i+e][t+s]=this.currentPiece.blocks[e][s].color)}},{key:"useNextPiece",value:function(){this.currentPiece=this.nextPiece,this.currentPiece.x=Math.floor((this.fieldWidth-this.currentPiece.getWidth())/2),this.currentPiece.y=0,this.drawNextPiece(),this.currentPiece.isColliding(this.currentPiece.x,this.currentPiece.y,this.field)&&(this.playSound(this.soundGameOver),this.gameOver=!0),this.lastTick=this.p5.millis()}},{key:"drawNextPiece",value:function(){this.nextPiece=new S(0,0,this.fieldWidth,this.fieldHeight,v[E(0,v.length)],E(0,k.length))}},{key:"playSound",value:function(t){t.currentTime=0,t.volume=.5,t.play().then()}},{key:"updateLevel",value:function(){var t=this.level;this.level=Math.floor(this.lines/10),this.tickLength=400-30*this.level,t!==this.level&&this.playSound(this.soundLevelUp)}},{key:"actionMoveLeft",value:function(){this.pause||this.gameOver||this.gameStart||(this.playSound(this.soundMoveBrick),this.currentPiece.moveLeft(this.field))}},{key:"actionMoveRight",value:function(){this.pause||this.gameOver||this.gameStart||(this.playSound(this.soundMoveBrick),this.currentPiece.moveRight(this.field))}},{key:"actionSpinBrickClock",value:function(){this.pause||this.gameOver||this.gameStart||(this.playSound(this.soundMoveBrick),this.currentPiece.rotate(-1,this.field))}},{key:"actionSpinBrickCounterclockwise",value:function(){this.pause||this.gameOver||this.gameStart||(this.playSound(this.soundMoveBrick),this.currentPiece.rotate(1,this.field))}},{key:"actionSoftDrop",value:function(){this.pause||this.gameOver||this.gameStart||(this.currentPiece.moveDown(this.field)?(this.freezeCurrentBlock(),this.useNextPiece()):this.playSound(this.soundMoveBrick))}},{key:"actionHardDrop",value:function(){this.pause||this.gameOver||this.gameStart||this.currentPiece.drop(this.field)&&(this.freezeCurrentBlock(),this.useNextPiece())}},{key:"actionHoldBrick",value:function(){console.log("Przytrzymaj klocek")}},{key:"actionPauseGame",value:function(){this.gameOver||this.gameStart||(this.pause=!this.pause)}},{key:"keyPressed",value:function(){switch(console.log(this.p5.keyCode),this.p5.keyCode){case 37:this.actionMoveLeft();break;case 39:this.actionMoveRight();break;case 38:case 88:this.actionSpinBrickClock();break;case 17:case 90:this.actionSpinBrickCounterclockwise();break;case 40:this.actionSoftDrop();break;case 32:this.actionHardDrop();break;case 16:case 67:this.actionHoldBrick();break;case 80:this.actionPauseGame();break;case 82:this.newGame(),this.gameStart=!1}}}]),t}();function U(){return Object(W.jsx)("div",{className:"renderer",children:Object(W.jsx)(c.a,{sketch:function(t){return new B(t)}})})}A.a.render(Object(W.jsx)(h.a.StrictMode,{children:Object(W.jsx)(U,{})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.7029cdf8.chunk.js.map