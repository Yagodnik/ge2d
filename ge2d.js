var GE2D_GL;
var GE2D_CANVAS;
const GE2D_RECT = "GE2D-RECT";

document.write('<script src="GL/lib/webgl-utils.js"></script>');
document.write('<script src="GL/lib/webgl-debug.js"></script>');
document.write('<script src="GL/lib/cuon-utils.js"></script>');
document.write('<script src="GL/lib/cuon-matrix.js"></script>');

var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'uniform vec4 u_Translation;\n' + 
	'void main() {\n' +
	'  gl_Position = a_Position + u_Translation;\n' +
	'}\n';
var FSHADER_SOURCE =
	'void main() {\n' +
	'  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n' +
	'}\n';

function setShaders_GE2d(gl) { initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE); }
function glInitVertextBuffer_GE2d(gl,vert,x,y) {
    var vertices = vert;
    var n = 4;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, true, 0, 0);
    gl.enableVertexAttribArray(a_Position);
}
function DrawGlRect_GE2d(gl){ gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
function moveGLRect_GE2d(gl,tx,ty){ 
	var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
	gl.uniform4f(u_Translation,tx,ty,0,0);
}

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
}

GE_Shape.prototype.rotate = function(rt){
	//rotate
}

GE_Shape.prototype.move = function(dx,dy){
	this.x += dx;
	this.y += dy;
	this.dx = dx;
	this.dy = dy;
	//moveGLRect_GE2d(GE2D_GL,this.dx,this.dy);
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
		this.matrix;
	};
	this.Rect.prototype.__proto__ = GE_Shape.prototype;
	this.Circle;
	this.Image;
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
}

GE_display.prototype.clear = function(){
	GE2D_GL.clearColor(this.r,this.g,this.b,this.a);
	GE2D_GL.clear(GE2D_GL.COLOR_BUFFER_BIT);
}

GE_display.prototype.draw = function(shape){
	switch(shape.type){
		case GE2D_RECT:
			shape.matrix = new Float32Array([
				-shape.x, shape.y,// left, top
				-shape.x, -shape.y, //left, bottom
				shape.w, shape.y, //right, top
				shape.w, -shape.y //right, bottom
			]);
			setShaders_GE2d(GE2D_GL);
			glInitVertextBuffer_GE2d(GE2D_GL,shape.matrix,shape.x,shape.y);
			moveGLRect_GE2d(GE2D_GL,shape.dx,shape.dy);
			DrawGlRect_GE2d(GE2D_GL);
			break;
		default:
			console.log("Undefined shape type!");
			break;
	}
}

GE_display.prototype.background = function(bg){
	GE2D_CANVAS.style.background = bg.toString();
}

GE_display.prototype.backgroundImage = function(bg){
	GE2D_CANVAS.style.backgroundImage = "url(" + bg.toString() + ")"
	GE2D_CANVAS.style.backgroundRepeat = "norepeat"
}

GE_display.prototype.rotation = function(angle){
	return angle / 180 * Math.PI;
}
//End display

//App
var App = function(w = 500,h = 400){
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
	this.canvas.push(document.createElement("canvas"));
	document.body.appendChild(this.canvas[0]);

	this.canvas[0].width = this.width;
	this.canvas[0].height = this.height;

	GE2D_CANVAS = this.canvas;

	//init webgl context
	for (var i = 0;i < this.webgl_contexts.length;i++) {
		try{
			this.context = this.canvas[0].getContext(this.webgl_contexts[i]);
			console.log(this.context);
			break;
		}catch(webglCotextError){
			console.log(this.errors[0] + ";" + this.webgl_ontext[i]);
		}
	}
	console.log(this.messages[1]);
	GE2D_GL = this.context;

	//App.Game
	this.Game = new GE_Game();
	this.display = new GE_display();
}