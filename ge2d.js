/*
*ge2d - game engine 2d
*2018. Russia
*/

var GE2D_GL = [];
var GE2D_CANVAS = [];
const GE2D_RECT = "GE2D-RECT";
const GE2D_CIRCLE = "GE2D-CIRCLE";
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
	this.show = true;
	this.statis = false;
	this.layer = 0;
	this.lineWidth = 3;
}

GE_Shape.prototype.rotate = function(rt){
	//rotate
}

GE_Shape.prototype.move = function(dx,dy){
	this.x += dx;
	this.y += dy;
	this.dx = dx;
	this.dy = dy;
}

GE_Shape.prototype.moveAngle = function(dx,dy,rt){
	//move by angle
}

GE_Shape.prototype.setLayer = function(i){
	this.layer = i;
}
//End shapes

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

	this.Rect.prototype.__proto__ = GE_Shape.prototype;
	this.Circle.prototype.__proto__ = GE_Shape.prototype;
	this.Image;
	this.Keyboard = new GE_Keyboard();
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

//Display
const GE_display = function(){
	this.r = 0.0;
	this.g = 2.0;
	this.b = 1.0;
	this.a = 1.0;
	this.Layer = function(zi = undefined){
		this.zIndex = zi;
		this.new = function(){
			GE2D_CANVAS.push(document.createElement("canvas"));
			document.body.appendChild(GE2D_CANVAS.pop());
			//GE2D_GL.push(GE2D_CANVAS.pop().getContext("2d"));
			console.log(GE2D_GL.pop());
		}
	}
}

GE_display.prototype.clear = function(layer = 0){
	GE2D_GL[layer].clearRect(0,0,GE2D_CANVAS[layer].w,GE2D_CANVAS[layer].h);
}

GE_display.prototype.draw = function(shape){
	switch(shape.type){
		case GE2D_RECT:
			if(shape.angle !== 0){
				GE2D_GL[shape.layer].save();
			}

			const dx = shape.x + shape.w / 2;
			const dy = shape.y + shape.h / 2;

			if(shape.angle !== 0){
				GE2D_GL[shape.layer].translate(dx,dy);
				GE2D_GL[shape.layer].rotate(shape.angle);
				GE2D_GL[shape.layer].translate(-dx,-dy);
			}

			if(shape.fc !== undefined){
				GE2D_GL[shape.layer].fillStyle = shape.fc;
				GE2D_GL[shape.layer].fillRect(shape.x,shape.y,shape.w,shape.h);
			}			
			if(shape.sc !== undefined){
				GE2D_GL[shape.layer].strokeStyle = shape.sc;
				GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
				GE2D_GL[shape.layer].strokeRect(shape.x,shape.y,shape.w,shape.h);
			}

			if(shape.angle !== 0){
				GE2D_GL[shape.layer].restore();
			}
			break;
		case GE2D_CIRCLE:
			GE2D_GL[shape.layer].beginPath();
			GE2D_GL[shape.layer].arc(shape.x, shape.y, shape.r, 0, Math.PI * 2, false);

			if(shape.fc !== undefined){
				GE2D_GL[shape.layer].fillStyle = shape.fc;
				GE2D_GL[shape.layer].fill();
			}			
			if(shape.sc !== undefined){
				GE2D_GL[shape.layer].strokeStyle = shape.sc;
				GE2D_GL[shape.layer].lineWidth = shape.lineWidth;
				GE2D_GL[shape.layer].stroke();
			}
			break;
		default:
			console.log("Undefined shape type!");
			break;
	}
}

GE_display.prototype.background = function(bg){
	GE2D_CANVAS[0].style.background = bg.toString();
}

GE_display.prototype.backgroundImage = function(bg){
	GE2D_CANVAS[0].style.backgroundImage = "url(" + bg.toString() + ")"
	GE2D_CANVAS[0].style.backgroundRepeat = "norepeat"
}

GE_display.prototype.rotation = function(angle){
	return angle / 180 * Math.PI;
}
//End display

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
	});

	

	if(ctx === GRAPHICS_WEBGL){
		//webgl
	}else if(ctx === GRAPHICS_2D){
		this.context.push(this.canvas[0].getContext("2d"));
		console.log(this.context[0]);
	}
	console.log(ctx);

	GE2D_GL.push(this.context[0]);

	//App.Game
	this.Game = new GE_Game();
	this.display = new GE_display();
}