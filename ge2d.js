/*
*ge2d - game engine 2d
*2018. Russia
*GitHub : https://github.com/JavaScriptProger/ge2d
*LICENSE GNU GPL
*/

var GE2D_GL = [];
var GE2D_CANVAS = [];
var GE2D_CANVAS_STYLES = [];
var GE2D_PLUGIN_LIST = [
	{
		name : "3D",
		srcWeb : "89.110.48.37:7979/ge2d/plugins/3D-Plugin.js",
		srcLoc : "plugins/3D.js"
	},
	{
		name : "Physics2d",
		srcWeb : "89.110.48.37:7979/ge2d/plugins/Physics2d-Plugin.js",
		srcLoc : "plugins/physics2d.js"
	},
	{
		name : "matrix2d",
		srcWeb : "89.110.48.37:7979/ge2d/plugins/matrix2d.js",
		srcLoc : "plugins/matrix2d.js"
	}
];
var GE2D_GAME_OBJECT;
var GE2D_DISPLAY_OBJECT;
var GE2D_ARRAY_OBJECT;
var GE2D_DISPLAY_OBJECT2;
var GE2D_DISPLAY_OBJECT3;
var GE2D_DISPLAY_OBJECT4;
const GE2D_RECT = "GE2D-RECT";
const GE2D_CIRCLE = "GE2D-CIRCLE";
const GE2D_IMAGE = "GE2D-IMAGE";
const GE2D_TEXT = "GE2D-TEXT";
const GE2D_TRIANGLE = "GE2D-TRIANGLE";
const GE2D_ELLIPSE = "GE2D-ELLIPSE";
const GRAPHICS_2D = "2d";
const GRAPHICS_WEBGL = "gl";

//Speaker
const GE_Speaker = function(lang = "ru-RU"){
	this.lang = lang;
	this.text = "Привет!";
	this.engine = speechSynthesis;
}

GE_Speaker.prototype.speak = function(text){
	this.text = text;
	this.engine.speak(new SpeechSynthesisUtterance(this.text.toString()));
}

GE_Speaker.prototype.setLang = function(lang){
	this.lang = lang;
	this.engine.lang = this.lang;
}
//End speaker

//Keyboard
var GE_Keyboard = function(){
	this.isDown;
	this.isUp;
}

var GE_KEYBOARD_CONFIG = {
	DOWN : 0,
	UP : 0
};

window.addEventListener("keydown",function(event){
	GE_KEYBOARD_CONFIG.DOWN = event.key;
},false);
window.addEventListener("keyup",function(event){
	GE_KEYBOARD_CONFIG.DOWN = 0;
	GE_KEYBOARD_CONFIG.UP = event.key;
},false);
//event listeners for keyboard

GE_Keyboard.prototype.downKey = function(){
	this.isDown = GE_KEYBOARD_CONFIG.DOWN;
	return this.isDown;
}

GE_Keyboard.prototype.upKey = function(){
	this.isUp = GE_KEYBOARD_CONFIG.UP;
	return this.isUp;
}
//End keyboard

//Camera
var GE_Camera = function(){
	this.x = 0;
	this.y = 0;
	this.viewer = undefined;
}

var GE2D_CAMERA_DATA = {
	x : 0, y : 0
};

GE_Camera.prototype.move = function(dx, dy){
	this.x += dx;
	this.y += dy;
	GE2D_CAMERA_DATA.x = this.x;
	GE2D_CAMERA_DATA.y = this.y;
}

GE_Camera.prototype.moveAngle = function(s, angle){
	var dx = s * Math.sin(-angle);
	var dy = s * Math.cos(-angle);

	this.x += dx;
	this.y += dy;
	GE2D_CAMERA_DATA.x = this.x;
	GE2D_CAMERA_DATA.y = this.y;
}

GE_Camera.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
}

GE_Camera.prototype.setView = function(object){
	if(this.viewer === undefined){
		object.static = true;
		this.viewer = object;
	} else {
		this.viewer.static = false;
		this.viewer = object;
	} 
}
//End camera

//Shapes
const GE_Shape = function(){
	this.x = 0; 
	this.y = 0;
	this.w = 10; 
	this.h = 10;
	this.dx = 0;
	this.dy = 0;
	this.fc = "black";
	this.sc; this.r = 10;
	this.Ishow = true;
	this.statis = false;
	this.layer = 0;
	this.lineWidth = 3;
	this.angle = 0;
}

GE_Shape.prototype.rotate = function(deg){
	this.angle += deg;
}

GE_Shape.prototype.move = function(dx,dy){
	this.x += dx;
	this.y += dy;
	this.dx = dx;
	this.dy = dy;
}

GE_Shape.prototype.setLayer = function(i){
	this.layer = i;
}

GE_Shape.prototype.moveAngle = function(s, angle){
	var dx = s * Math.sin(-angle);
	var dy = s * Math.cos(-angle);

	this.x += dx;
	this.y += dy;
}

GE_Shape.prototype.show = function(){
	this.Ishow = true;
}

GE_Shape.prototype.hide = function(){
	this.Ishow = false;
}

GE_Shape.prototype.isShow = function(){
	if(this.Ishow) return true;
	else return false;
}

GE_Shape.prototype.setPostion = function(x, y){
	this.x = x;
	this.y = y;
}

GE_Shape.prototype.setSize = function(w, h){
	this.w = w;
	this.h = h;
}
//End shapes

//Mouse
var GE_Mouse = function(){
	this.x; this.y;
	this.pressedButton = 0;
}

var GE2D_MOUSE_DATA = {
	x : 0, y : 0, cb : 0
};
//Mouse events
window.addEventListener("mousemove",function(event){
	GE2D_MOUSE_DATA.x = event.pageX;
	GE2D_MOUSE_DATA.y = event.pageY;
}, false);
window.addEventListener("mousedown",function(event){
	GE2D_MOUSE_DATA.bc = event.which;
}, false);
window.addEventListener("mouseup",function(event){
	GE2D_MOUSE_DATA.bc = 0;
}, false);
////
GE_Mouse.prototype.xPos = function(){
	this.x = GE2D_MOUSE_DATA.x;
	return this.x;
}

GE_Mouse.prototype.yPos = function(){
	this.y = GE2D_MOUSE_DATA.y;
	return this.y;
}

GE_Mouse.prototype.down = function(){
	this.pressedButton = GE2D_MOUSE_DATA.bc;
	return this.pressedButton;
}

GE_Mouse.prototype.clickTo = function(rect){
	if(GE2D_MOUSE_DATA.x > rect.x && GE2D_MOUSE_DATA.x < rect.x + rect.w){
		if(GE2D_MOUSE_DATA.y > rect.y - rect.h && GE2D_MOUSE_DATA.y < rect.y + rect.h) return 1;
	} else 
		return 0;
}
//End mouse

//Touch
var GE_Touch = function(){
	this.pressedButton;
}

var GE2D_TOUCH_DATA = {
	x : 0, y : 0, c : 0
};

//Touch events
window.addEventListener("touchmove",function(event){
	GE2D_TOUCH_DATA.x = event.touches[0].clientX;
	GE2D_TOUCH_DATA.y = event.touches[0].clientY;
}, false);
window.addEventListener("touchstart",function(event){
	GE2D_TOUCH_DATA.c = 1;
}, false);
window.addEventListener("touchend",function(event){
	GE2D_TOUCH_DATA.c = 0;
}, false);
////
GE_Touch.prototype.xPos = function(){
	this.x = GE2D_TOUCH_DATA.x;
	return this.x;
}

GE_Touch.prototype.yPos = function(){
	this.y = GE2D_TOUCH_DATA.y;
	return this.y;
}

GE_Touch.prototype.down = function(){
	this.pressedButton = GE2D_TOUCH_DATA.c;
	return this.pressedButton;
}

GE_Touch.prototype.clickTo = function(rect){
	this.pressedButton = GE2D_MOUSE_DATA.bc;
	return this.pressedButton;
}
//End touch

//Game
const GE_Game = function(){
	this.FPS = 30;
	this.loop_;
	this.speaker = new GE_Speaker();
	this.Rect = function(x,y,w,h,fc = "black",sc = undefined){
		GE_Shape.call(this);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fc = fc;
		this.sc = sc;
		this.type = GE2D_RECT;
	};
	this.Circle = function(x,y,r,fc = "black",sc = undefined){
		GE_Shape.call(this);
		this.x = x;
		this.y = y;
		this.r = r;
		this.fc = fc;
		this.sc = sc;
		this.type = GE2D_CIRCLE;
	};
	this.Image = function(x,y,w = 100,h = 100, src){
		GE_Shape.call(this);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.src = src;
		this.type = GE2D_IMAGE;
	};
	this.Text = function (text, x, y, fs = 17, fc = "black", sc = undefined) {
		GE_Shape.call(this);
		this.x = x;
		this.y = y;
		this.text = text;
		this.fontsize = fs;
		this.fontname;
		this.basealign = undefined;
		this.textalign = undefined;
		this.fc = fc;
		this.sc = sc;
		this.type = GE2D_TEXT;
		this.loadFont = function(name,  src){
			document.write("<style>" + 
							"@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');"+
							"@font-face {" +
							"font-family:'" + name +
							"'; src:url('" + src + "');" +
							"}</style>");
		}
	};
	this.Triangle = function(x1, y1, x2, y2, x3, y3, fc = "black", sc = undefined){
		GE_Shape.call(this);
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
		this.fc = fc;
		this.sc = sc;
		this.type = GE2D_TRIANGLE;
	}
	this.Ellipse = function(x,y, r1, r2, fc = "black", sc = undefined){
		GE_Shape.call(this);
		this.x = x;
		this.y = y;
		this.r1 = r1;
		this.r2 = r2;
		this.fc = fc;
		this.sc = sc;
		this.type = GE2D_ELLIPSE;
	}
	this.Rect.prototype.__proto__ = GE_Shape.prototype;
	this.Circle.prototype.__proto__ = GE_Shape.prototype;
	this.Image.prototype.__proto__ = GE_Shape.prototype;
	this.Text.prototype.__proto__ = GE_Shape.prototype;
	this.Triangle.prototype.__proto__ = GE_Shape.prototype;
	this.Keyboard = new GE_Keyboard();
	this.Camera = new GE_Camera();
	this.Mouse = new GE_Mouse();
	this.Touch = new GE_Touch();
	this.Brush = new GE_Brush();
	this.Math = new GE_Math();

	this.Audio = function(src,r  = false){
		this.src = src.toString();
		this.repeat = r;
		this.audio = new Audio(this.src);
	}
	this.Audio.prototype.play = function(){
		this.audio.loop = this.repeat;
		this.audio.play();
	}
	this.Audio.prototype.pause = function() { this.audio.pause(); }	
	this.Audio.prototype.stop = function(){ //this.audio.stop(); 
	}

	//Cross Audio
	this.CrossAudio = function(src,r  = false){
		this.audio;
		this.src = src; 
		this.repeat = r;
	}
	this.CrossAudio.prototype.play = function(){this.audio.play();}
	this.CrossAudio.prototype.pause = function(){this.audio.pause();}
	this.CrossAudio.prototype.stop = function(){}
	//End cross audio
	this.Array = new GE_ArrayController();
	GE2D_ARRAY_OBJECT = this.Array;
	this.Accelerometer = new GE_Accelerometer();
};

GE_Game.prototype.loop = function(loopFunction){
	this.loop_ = setInterval(loopFunction,1000 / this.FPS);
}

GE_Game.prototype.loopFPS = function(FPS){
	this.FPS = FPS;
}

GE_Game.prototype.loopStop = function(){
	clearInterval(this.loop_);
}
//End Game

//Brush
var GE_Brush = function(){};

GE_Brush.prototype.drawRect = function(x,y, w,h, fc = "black", sc = undefined, layer = 0, angle = 0){
	if(angle !== 0) GE2D_GL[layer].save();
	var dx = x + w / 2;
	var dy = y + h / 2;
	if(angle !== 0) {
		GE2D_GL[layer].translate(dx, dy);
		GE2D_GL[layer].rotate(angle);
		GE2D_GL[layer].translate(-dx, -dy);
	}
	if(fc !== undefined) GE2D_GL[layer].fillStyle = fc;
	if(sc !== undefined) GE2D_GL[layer].strokeStyle = sc;
	if(fc !== undefined) GE2D_GL[layer].fillRect(x,y, w,h);
	if(sc !== undefined) GE2D_GL[layer].strokeRect(x,y,w,h);
	if(angle !== 0) GE2D_GL[layer].restore();
}

GE_Brush.prototype.drawCircle = function(x,y, r, fc = "black", sc = undefined, layer = 0){
	if(fc !== undefined) GE2D_GL[layer].fillStyle = fc;
	if(sc !== undefined) GE2D_GL[layer].strokeStyle = sc;
	GE2D_GL[layer].beginPath();
	GE2D_GL[layer].arc(x,y, r, 0, Math.PI * 2, false);
	if(fc !== undefined) GE2D_GL[layer].fill();
	if(sc !== undefined) GE2D_GL[layer].stroke();
}

GE_Brush.prototype.drawImage = function(x,y, w,h, src, layer = 0, angle = 0){
	if(angle !== 0) GE2D_GL[layer].save();
	var dx = x + w / 2;
	var dy = y + h / 2;
	if(angle !== 0) {
		GE2D_GL[layer].translate(dx, dy);
		GE2D_GL[layer].rotate(angle);
		GE2D_GL[layer].translate(-dx, -dy);
	}
	var img = new Image();
	img.src = src;
	GE2D_GL[layer].drawImage(img, x, y, w, h);
	if(angle !== 0) GE2D_GL[layer].restore();
}
//End brush

//Colors
var GE_Color = function(){
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 0;
}
//End colors

//Math
var GE_Math = function(){};
GE_Math.prototype.random = function(min, max){
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
//End math

//Display
const GE_display = function(){
	this.r = 0.0;
	this.g = 2.0;
	this.b = 1.0;
	this.a = 1.0;
	/*this.Layer = function(zi){
		this.zIndex = zi;		
		GE2D_CANVAS.push({
			w : GE2D_CANVAS[0].w, 
			h : GE2D_CANVAS[0].h, 
			canvas : document.createElement("canvas")
		});
		console.log(GE2D_CANVAS[0].h);
		/*GE2D_CANVAS.pop().canvas.width = GE2D_CANVAS[0].w;
		GE2D_CANVAS.pop().canvas.height = GE2D_CANVAS[0].h;*/
		//console.log(GE2D_CANVAS.pop());
		/*GE2D_CANVAS.pop().canvas.style.position = "fixed";
		GE2D_CANVAS.pop().canvas.style.top = "0px";
		GE2D_CANVAS.pop().canvas.style.left = "0px";*/
		//document.body.appendChild(GE2D_CANVAS.pop().canvas);
		//GE2D_GL.push(GE2D_CANVAS.pop().canvas.getContext("2d"));
		//console.log(GE2D_GL.pop());
///console.log(GE2D_CANVAS[1].canvas.height);
//}
	this.BoxCollider = function(rect1, rect2){
		this.r1 = rect1;
		this.r2 = rect2;
	}

	this.CircleCollider = function(c1, c2){
		this.r1 = c1;
		this.r2 = c2;
	}

	this.BoxCollider.prototype.is = function(){
		//collision detection
		var isCollision = false;
		//x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight
		if(-GE2D_CAMERA_DATA.x + this.r1.x > this.r2.x - this.r2.w &&
		   -GE2D_CAMERA_DATA.x + this.r1.x < this.r2.x + this.r2.w &&
		   -GE2D_CAMERA_DATA.y + this.r1.y > this.r2.y - this.r2.h && 
		   -GE2D_CAMERA_DATA.y + this.r1.y < this.r2.y + this.r2.h) isCollision = true;
		return isCollision;
	}

	this.CircleCollider.prototype.is = function(){
		//collision detection
		var d = 0;
		var diffX = this.r1.x - this.r2.x;
		var diffY = this.r1.y - this.r2.y;
		d = Math.sqrt((diffX * diffX) + (diffY * diffY));
		return d;
	}
}

GE_display.prototype.clear = function(layer = 0){
	GE2D_GL[layer].clearRect(0,0,GE2D_CANVAS[layer].w,GE2D_CANVAS[layer].h);
}

GE_display.prototype.draw = function(shape){
	switch(shape.type){
		case GE2D_RECT:
		/////////////Rect////////////////////
			var dx, dy, x, y;
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}
			//////////////
			if(!shape.static){
				dx = -GE2D_CAMERA_DATA.x + (shape.x + shape.w / 2);
				dy = -GE2D_CAMERA_DATA.y + (shape.y + shape.h / 2);
			} else {
				dx = shape.x + shape.w / 2;
				dy = shape.y + shape.h / 2;
			}
			///////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}
			////////////////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x + shape.x;
				y = -GE2D_CAMERA_DATA.y + shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			/////////////////////////
			if(shape.Ishow){
				if(shape.fc !== undefined){
					GE2D_GL[shape.layer].fillStyle = shape.fc;
					GE2D_GL[shape.layer].fillRect(x,y,shape.w,shape.h);
				}			
				if(shape.sc !== undefined){
					GE2D_GL[shape.layer].strokeStyle = shape.sc;
					GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
					GE2D_GL[shape.layer].strokeRect(x, y,shape.w,shape.h);
				}
			}
			////////////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
		/////////////////End rect/////////////////////////
		case GE2D_IMAGE:
			//////////Image////////////////////
			var dx, dy, x, y;
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}
			//////////////
			if(!shape.static){
				dx = -GE2D_CAMERA_DATA.x + (shape.x + shape.w / 2);
				dy = -GE2D_CAMERA_DATA.y + (shape.y + shape.h / 2);
			} else {
				dx = shape.x + shape.w / 2;
				dy = shape.y + shape.h / 2;
			}
			///////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}
			////////////////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x + shape.x;
				y = -GE2D_CAMERA_DATA.y + shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			/////////////////////////
			if(shape.Ishow){
				var img = new Image();
				img.src = shape.src;
				GE2D_GL[shape.layer].drawImage(img, x, y, shape.w, shape.h);
			}
			//////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
		case GE2D_CIRCLE:
			//////////Circle////////////////////
			var x, y;
			//////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x +shape.x;
				y = -GE2D_CAMERA_DATA.y +shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			///////////////////////////
			if(shape.Ishow){
				GE2D_GL[shape.layer].beginPath();
				GE2D_GL[shape.layer].arc(x,y, shape.r, 0, Math.PI * 2, false);
				///////////
				if(shape.fc !== undefined){
					GE2D_GL[shape.layer].fillStyle = shape.fc;
					GE2D_GL[shape.layer].fill();
				}			
				if(shape.sc !== undefined){
					GE2D_GL[shape.layer].strokeStyle = shape.sc;
					GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
					GE2D_GL[shape.layer].stroke();
				}
			}
			break;
		case GE2D_TEXT:
			//////////Text////////////////////

			GE2D_GL[shape.layer].font = String(shape.fontsize) + "px " + shape.fontname;
			GE2D_GL[shape.layer].textBaseAlign = shape.basealign;
			GE2D_GL[shape.layer].textAlign = shape.textalign;
			
			var dx, dy, x, y;
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}
			//////////////
			if(!shape.static){
				dx = -GE2D_CAMERA_DATA.x + (shape.x + shape.w / 2);
				dy = -GE2D_CAMERA_DATA.y + (shape.y + shape.h / 2);
			} else {
				dx = shape.x + shape.w / 2;
				dy = shape.y + shape.h / 2;
			}
			///////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}
			////////////////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x + shape.x;
				y = -GE2D_CAMERA_DATA.y + shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			/////////////////////////
			if(shape.Ishow){
				if(shape.fc !== undefined){
					GE2D_GL[shape.layer].fillStyle = shape.fc;
					GE2D_GL[shape.layer].fillText(shape.text,x,y);
				}			
				if(shape.sc !== undefined){
					GE2D_GL[shape.layer].strokeStyle = shape.sc;
					GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
					GE2D_GL[shape.layer].strokeText(shape.text,x,y);
				}
			}
			//console.log(shape.fontsize + "px " + shape.fontname);
			//////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
		case GE2D_TRIANGLE:
			//debugger;
			//////////Triangle////////////////////		
			var dx, dy, x, y;
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}
			//////////////
			if(!shape.static){
				dx = -GE2D_CAMERA_DATA.x + (shape.x + shape.w / 2);
				dy = -GE2D_CAMERA_DATA.y + (shape.y + shape.h / 2);
			} else {
				dx = shape.x + shape.w / 2;
				dy = shape.y + shape.h / 2;
			}
			///////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}
			////////////////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x + shape.x;
				y = -GE2D_CAMERA_DATA.y + shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			/////////////////////////
			if(shape.Ishow){
				GE2D_GL[shape.layer].beginPath();
				GE2D_GL[shape.layer].moveTo(shape.x1, shape.y1);
				GE2D_GL[shape.layer].lineTo(shape.x2, shape.y2);
				GE2D_GL[shape.layer].lineTo(shape.x3, shape.y3);
				GE2D_GL[shape.layer].closePath();

				if(shape.fc !== undefined){
					GE2D_GL[shape.layer].fillStyle = shape.fc;
					GE2D_GL[shape.layer].fill();
				}			
				if(shape.sc !== undefined){
					GE2D_GL[shape.layer].strokeStyle = shape.sc;
					GE2D_GL[shape.layer].stroke();
				}
			}
			//console.log(shape.fontsize + "px " + shape.fontname);
			//////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
			case GE2D_IMAGE:
			//////////Image////////////////////
			var dx, dy, x, y;
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}
			//////////////
			if(!shape.static){
				dx = -GE2D_CAMERA_DATA.x + (shape.x + shape.w / 2);
				dy = -GE2D_CAMERA_DATA.y + (shape.y + shape.h / 2);
			} else {
				dx = shape.x + shape.w / 2;
				dy = shape.y + shape.h / 2;
			}
			///////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}
			////////////////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x + shape.x;
				y = -GE2D_CAMERA_DATA.y + shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			/////////////////////////
			if(shape.Ishow){
				var img = new Image();
				img.src = shape.src;
				GE2D_GL[shape.layer].drawImage(img, x, y, shape.w, shape.h);
			}
			//////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
		case GE2D_ELLIPSE:
			//////////Ellipse////////////////////
			var dx, dy, x, y;
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}
			//////////////
			if(!shape.static){
				dx = -GE2D_CAMERA_DATA.x + (shape.x + shape.w / 2);
				dy = -GE2D_CAMERA_DATA.y + (shape.y + shape.h / 2);
			} else {
				dx = shape.x + shape.w / 2;
				dy = shape.y + shape.h / 2;
			}
			///////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}
			////////////////////////
			if(!shape.static){
				x = -GE2D_CAMERA_DATA.x + shape.x;
				y = -GE2D_CAMERA_DATA.y + shape.y;
			} else {
				x = shape.x;
				y = shape.y;
			}
			///////////////////////////
			if(shape.Ishow){
				GE2D_GL[shape.layer].ellipse(shape.x, shape.y, shape.r1, shape.r2,10, 10, 10);
				///////////
				if(shape.fc !== undefined){
					GE2D_GL[shape.layer].fillStyle = shape.fc;
					GE2D_GL[shape.layer].fill();
				}			
				if(shape.sc !== undefined){
					GE2D_GL[shape.layer].strokeStyle = shape.sc;
					GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
					GE2D_GL[shape.layer].stroke();
				}
			}
			//////////////////
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
		default:
			console.log("Undefined shape type!");
			break;
	}
}

GE_display.prototype.background = function(bg){
	GE2D_CANVAS_STYLES[0].style.backgroundColor = bg.toString();
}

GE_display.prototype.backgroundImage = function(bg){
	GE2D_CANVAS_STYLES[0].style.backgroundImage = "url(" + bg.toString() + ")"
	GE2D_CANVAS_STYLES[0].style.backgroundRepeat = "norepeat"
}
//End display

//Accelerometer
var GE_Accelerometer = function(){
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.xRot = 0;
	this.yRot = 0;
}

var GE2D_ACELEROMETER_DATA = {
	x : 0,
	y : 0,
	z : 0,
	xR : 0,
	yR : 0
};

window.addEventListener("deviceorientation", function(event){
	GE2D_ACELEROMETER_DATA.x = event.beta;
	GE2D_ACELEROMETER_DATA.y = event.gamma;
}, true);

GE_Accelerometer.prototype.getX = function(){
	this.x = GE2D_ACELEROMETER_DATA.x;
	return this.x;
}

GE_Accelerometer.prototype.getY = function(){
	this.y = GE2D_ACELEROMETER_DATA.y;
	return this.y;
}

GE_Accelerometer.prototype.getZ = function(){
	this.z = GE2D_ACELEROMETER_DATA.z;
	return this.z;
}
//End accelerometer

//Arrays
var GE_ArrayController = function(){
	this.draw = function(array){
		for(var i = 0;i < array.length; i++) GE2D_DISPLAY_OBJECT.draw(array[i]);
	}
};
//End arrays

//App
var App = function(w = 500,h = 400,ctx = "2d"){
	this.width = w;
	this.height = h;
	this.title = "ge2d engine!";

	//Messages,errors,contexts
	this.webgl_contexts = [
		"webgl",
		"experimental-webgl",
		"moz-webgl",
		"webkit-3d"
	];

	this.errors = [
		"webgl-context-error!",
		"Undefined shape type!"
	];

	this.messages = [
		"webgl-context is defined!",
		"webgl setuped!"
	];

	//Import GL helper classes
	
	//end

	this.canvas = [];
	this.context = [];
	this.canvas.push(document.createElement("canvas"));
	document.body.appendChild(this.canvas[0]);

	this.canvas[0].width = this.width;
	this.canvas[0].height = this.height;

	GE2D_CANVAS.push({
		w : this.width,
		h : this.height
		//canvas : this.canvas[0]
	});

	GE2D_CANVAS_STYLES.push(this.canvas[0]);

	/*GE2D_CANVAS[0].canvas.style.position = "fixed";
	GE2D_CANVAS[0].canvas.style.top = "0px";
	GE2D_CANVAS[0].canvas.style.left = "0px";*/

	if(ctx === GRAPHICS_WEBGL){
		//webgl
	}else if(ctx === GRAPHICS_2D){
		this.context.push(this.canvas[0].getContext("2d"));
		console.log(this.context[0]);
	}
	console.log(ctx);

	GE2D_GL.push(this.context[0]);
	this.loadPlugin = function(pluginName, loadType = "local"){
		var plugin = null;
		for(var i = 0;i < GE2D_PLUGIN_LIST.length;i++){
			if(GE2D_PLUGIN_LIST[i].name === pluginName){
				if(pluginName === "3D"){
					if(loadType === "local"){
						plugin = document.createElement("script");
						plugin.src = GE2D_PLUGIN_LIST[i].srcLoc;
					}else if(loadType === "web"){
						plugin = document.createElement("script");
						plugin.src = GE2D_PLUGIN_LIST[i].srcWeb;
					}
					break;
				} else if(pluginName === "physics2d"){
					if(loadType === "local"){
						plugin = document.createElement("script");
						plugin.src = GE2D_PLUGIN_LIST[i].srcLoc;
					}else if(loadType === "web"){
						plugin = document.createElement("script");
						plugin.src = GE2D_PLUGIN_LIST[i].srcWeb;
					}
					break;
				} else if(pluginName === "matrix2d"){
					if(loadType === "local"){
						plugin = document.createElement("script");
						plugin.src = GE2D_PLUGIN_LIST[i].srcLoc;
					}else if(loadType === "web"){
						plugin = document.createElement("script");
						plugin.src = GE2D_PLUGIN_LIST[i].srcWeb;
					}
					break;
				}else {
					console.warning("Error! This plugin name is not defined!. You can update your angine version or check plugin name.");
				}
			}
		}
		document.body.appendChild(plugin);
	}

	//App.Game
	this.Game = new GE_Game();
	this.display = new GE_display();

	GE2D_GAME_OBJECT = this.Game;
	GE2D_DISPLAY_OBJECT = this.display;
}
////End
