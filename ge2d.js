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
		srcWeb : "/ge2d/plugins/3D-Plugin.js",
		srcLoc : "plugins/3D.js"
	},
	{
		name : "Physics2d",
		srcWeb : "/ge2d/plugins/Physics2d-Plugin.js",
		srcLoc : "plugins/physics2d.js"
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
const WEBGL_2D = "gl";
var GE2D_USE_GL = false;

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
	this.upCode;
	this.downCode;
}

var GE_KEYBOARD_CONFIG = {
	DOWN : 0,
	UP : 0,
	DOWNCODE : null,
	UPCODE : null
};

window.addEventListener("keydown",function(event){
	GE_KEYBOARD_CONFIG.DOWN = event.key;
	GE_KEYBOARD_CONFIG.DOWNCODE = event.keyCode;
	GE_KEYBOARD_CONFIG.UPCODE = null;
	GE_KEYBOARD_CONFIG.UP = 0;
},false);
window.addEventListener("keyup",function(event){
	GE_KEYBOARD_CONFIG.UP = event.key;
	GE_KEYBOARD_CONFIG.UPCODE = event.keyCode;
	GE_KEYBOARD_CONFIG.DOWNCODE = null;
	GE_KEYBOARD_CONFIG.DOWN = 0;
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

GE_Keyboard.prototype.getDownKeyCode = function(){
	this.downCode = GE2D_KEYBOARD_CONFIG.DOWNCODE;
	return this.downCode;
}

GE_Keyboard.prototype.getUpKeyCode = function(){
	this.upCode = GE2D_KEYBOARD_CONFIG.UPCODE;
	return this.upCode;
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
	this.alpha = 1;
}

GE_Shape.prototype.rotate = function(deg){
	this.angle = deg;
}

GE_Shape.prototype.turn = function(deg){
	this.angle += deg;
}

GE_Shape.prototype.getAngle = function(){
	return this.angle;
}

GE_Shape.prototype.setAlpha = function(a){
	GE2D_GL[this.layer].globalAlpha = a;
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

GE_Shape.prototype.isCollisionEnter = function(b){
	var aTop = this.y;
    var aLeft = this.x;
    var bTop = b.y;
    var bLeft = b.x;

    return !(
        (aTop + this.h < (bTop)) ||
        (aTop > (bTop + b.h)) ||
        ((aLeft + this.w) < bLeft) ||
        (aLeft > (bLeft + b.w))
    );
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

GE_Shape.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
}

GE_Shape.prototype.setSize = function(w, h){
	this.w = w;
	this.h = h;
}

GE_Shape.prototype.setLineW = function(w){
	this.lineWidth = w;
}

GE_Shape.prototype.getLineW = function(h){
	return this.lineWidth;
}

GE_Shape.prototype.setW = function(w){
	this.w = w;
}

GE_Shape.prototype.setH = function(h){
	this.h = h;
}

GE_Shape.prototype.getW = function(){
	return this.w;
}

GE_Shape.prototype.getH = function(){
	return this.h;
}

GE_Shape.prototype.setR = function(r){
	this.r = r;
}

GE_Shape.prototype.getR = function(){
	return this.r;
}

GE_Shape.prototype.setFillColor = function(c){
	this.fc = c;
}

GE_Shape.prototype.setStrokeColor = function(c){
	this.sc = c;
}
//End shapes

//Memory
var GE_Memory = function(){
	this.storage;
}

GE_Memory.prototype.addNew = function(name, value){
	window.localStorage.setItem(name,value);
}

GE_Memory.prototype.get = function(name){
	return window.localStorage.getItem(name);
}

GE_Memory.prototype.delete = function(name){
	window.localStorage.removeItem(name);
}
//End memory

//System
var GE_System = function(){
	this.log = function(text){
		console.log('ge2dEngine : ' + text);
	}
	this.err = function(text){
		console.error('ge2dEngine : ' + text);
	}
	this.warn = function(text){
		console.warn('ge2dEngine : ' + text);
	}
	this.Memory = new GE_Memory();
}
//End system

//Mouse
var GE_Mouse = function(){
	this.x; this.y;
	this.pressedButton = 0;
	this.LEFT = 1;
	this.CENTER = 2;
	this.RIGHT = 3;
}

var GE2D_MOUSE_DATA = {
	x : 0, y : 0, cb : 0, cb2 : 0
};
//Mouse events
window.addEventListener("mousemove",function(event){
	GE2D_MOUSE_DATA.x = event.clientX;
	GE2D_MOUSE_DATA.y = event.clientY;
}, false);
window.addEventListener("mousedown",function(event){
	GE2D_MOUSE_DATA.bc = event.which;
	GE2D_MOUSE_DATA.bc2 = 0;
}, false);
window.addEventListener("mouseup",function(event){
	GE2D_MOUSE_DATA.bc = 0;
	GE2D_MOUSE_DATA.bc2 = event.which;
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

GE_Mouse.prototype.up = function(){
	this.upButton = GE2D_MOUSE_DATA.bc2;
	return this.upButton;
}

GE_Mouse.prototype.hover = function(rect){
	if((this.xPos() > rect.x && this.xPos() < rect.x + rect.w) &&
	   (this.yPos() > rect.y && this.yPos() < rect.y + rect.h)){
		return true;
	}else return false;
}
//End mouse

//Touch
var GE_Touch = function(){
	this.pressedButton;
	this.x; this.y;
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

GE_Touch.prototype.hover = function(rect){
	if((this.xPos() > rect.x && this.xPos() < rect.x + rect.w) &&
	   (this.yPos() > rect.y && this.yPos() < rect.y + rect.h)){
		return true;
	}else return false;
}
//End touch

//Events
const GE2D_EVENTS_DATA = {
	resize : false,
	keyDown : false,
	keyUp : false,
	mouseMove : false,
	mouseDown : false
};

var GE_Events = function(){
	this.resize = false;
	this.keyDown = false;
	this.keyUp = false;
	this.mouseMove = false;
	this.mouseDown = false;
}

window.addEventListener("resize",function(event){
	GE2D_EVENTS_DATA.resize = true;
},false);

window.addEventListener("keydown",function(event){
	GE2D_EVENTS_DATA.keyDown = true;
	GE2D_EVENTS_DATA.keyUp = false;
},false);

window.addEventListener("keyup",function(event){
	GE2D_EVENTS_DATA.keyDown = false;
	GE2D_EVENTS_DATA.keyUp = true;
},false);

window.addEventListener("mousemove",function(event){
	GE2D_EVENTS_DATA.mouseMove = true;
},false);

window.addEventListener("mousedown",function(event){
	GE2D_EVENTS_DATA.mouseDown = true;
},false);

GE_Events.prototype.is = function(eventName){
	if(eventName === "resize"){
		this.resize = GE2D_EVENTS_DATA.resize;
		return this.resize;
		GE2D_EVENTS_DATA.resize = false;
		this.resize = false;
	}
	if(eventName === "keydown"){
		this.keyDown = GE2D_EVENTS_DATA.keyDown;
		return this.keyDown;
	}
	if(eventName === "keyup"){
		this.keyUp = GE2D_EVENTS_DATA.keyUp;
		return this.keyUp;
	}
	if(eventName === "mousemove"){
		this.mouseMove = GE2D_EVENTS_DATA.mouseMove;
		return this.mouseMove;
		GE2D_EVENTS_DATA.mouseMove = false;
		this.mouseMove = false;
	}
	if(eventName === "mousedown"){
		this.mouseDown = GE2D_EVENTS_DATA.mouseDown;
		return this.mouseDown;
		GE2D_EVENTS_DATA.mouseDown = false;
		this.mouseDown = false;
	}
}
//End Events

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

	this.Audio.prototype.pause = function() {
		this.audio.pause();
	}

	this.Audio.prototype.stop = function(){
		this.audio.pause();
		this.audio.currentTime = 0;
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

GE_Game.prototype.getLoopFPS = function(){
	return this.FPS;
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

GE_Math.prototype.toRad = function(deg){
	return deg * Math.PI / 180;
}

GE_Math.prototype.choose = function(arr){
	var min = 0;
	var max = arr.length;
	var result = arr[this.random(min,max)];
	return result;
}
//End math

//Display
const GE_display = function(){
	this.r = 0.0;
	this.g = 2.0;
	this.b = 1.0;
	this.a = 1.0;
	this.Layer = function(zi){
		this.zIndex = zi;
		var w = GE2D_CANVAS[0].w;
		var h = GE2D_CANVAS[0].h;
		var temp = document.createElement("canvas");
		temp.width = w;
		temp.height = h;
		temp.style.position = "fixed";
		temp.style.top = "0";
		temp.style.left = "0";
		temp.style.zIndex = zi.toString();
		document.body.appendChild(temp);
		GE2D_GL.push(temp.getContext("2d"));
	}

	//Light
	this.Light = function(x,y,color,r){
		this.x = x;
		this.y = y;
		this.c = color;
		this.r = r;
	}

	this.Light.prototype.updatePos = function(x,y){
		this.x = x;
		this.y = y;
	}

	this.Light.prototype.draw = function(l = 0){
		var g = GE2D_GL[l].createRadialGradient(this.x,this.y,this.r,this.x,this.y,30);
		g.addColorStop(0,this.c);
		g.addColorStop(1,"transparent");
		GE2D_GL[l].fillStyle = g;
		GE2D_GL[l].fillRect(0,0,GE2D_CANVAS[0].w,GE2D_CANVAS[0].h);
	}
	//End Light

}

GE_display.prototype.setClearColor = function(r,g,b,a){
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

GE_display.prototype.clear = function(layer = 0){
	GE2D_GL[layer].clearRect(0,0,GE2D_CANVAS[0].w,GE2D_CANVAS[0].h);
}

GE_display.prototype.draw = function(shape){
	GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
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
				dx = -GE2D_CAMERA_DATA.x + (shape.x1 + shape.x2 + shape.x3 / 3);
				dy = -GE2D_CAMERA_DATA.y + (shape.y1 + shape.y2 + shape.y3 / 3);
			} else {
				dx = (shape.x1 + shape.x2 + shape.x3 / 3);
				dy = (shape.y1 + shape.y2 + shape.y3 / 3);
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

GE_display.prototype.getContextOf = function(layer = 0){
	return GE2D_GL[layer];
}

GE_display.prototype.fullScreen = function(){
	this.canvas = document.getElementsByTagName("canvas")[0];
	this.canvas.webkitRequestFullscreen();
}

GE_display.prototype.exitFullScreen = function(){
	this.canvas = document.getElementsByTagName("canvas")[0];
	this.canvas.webkitExitFullscreen();
}

GE_display.prototype.fullCanvas = function(){

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

	this.show = function(array){
		for(var i = 0;i < array.length; i++) array[i].show();
	}

	this.hide = function(array){
		for(var i = 0;i < array.length; i++) array[i].hide();
	}
};
//End arrays

//App
var App = function(w = 500,h = 400,ctx = "2d"){
	this.width = w;
	this.height = h;

	//Messages,errors,contexts
	this.webgl_contexts = [
		"webgl",
		"experimental-webgl",
		"moz-webgl",
		"webkit-3d"
	];

	this.errors = [
		"webgl-context-error!",
		"Undefined shape type!",
		"undefined context type!"
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

	/*GE2D_CANVAS[0].canvas.style.position = "fixed";
	GE2D_CANVAS[0].canvas.style.top = "0px";
	GE2D_CANVAS[0].canvas.style.left = "0px";*/

	if(ctx === "gl"){
		//webgl
	}else if(ctx === GRAPHICS_2D){
		this.context.push(this.canvas[0].getContext("2d"));
		console.log(this.context[0]);
		GE2D_CANVAS_STYLES.push(this.canvas[0]);
		this.canvas[0].style.position = "fixed";
		this.canvas[0].style.top = "0";
		this.canvas[0].style.left = "0";
		GE2D_USE_GL = false;
	}else {
		console.warn(this.errors[2]);
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
				}else {
					console.warning("Error! This plugin name is not defined!. You can update your angine version or check plugin name.");
				}
			}
		}
		document.body.appendChild(plugin);
	}

	this.info = function(){
		console.log("ge2dEngine : ge2d_DEMO");
	}

	//App.Game
	this.Game = new GE_Game();
	this.display = new GE_display();
	this.System = new GE_System();

	GE2D_GAME_OBJECT = this.Game;
	GE2D_DISPLAY_OBJECT = this.display;
}
////End
