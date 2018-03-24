const fieldW = 600;
const fieldH = 600;
const app = new App(fieldW,fieldH, GRAPHICS_2D);
const game = app.Game;
const display = app.display;
const brush = game.Brush;
const key = game.Keyboard;
const mouse = game.Mouse;

const grid1 = "#54af3b";
const grid2 = "#398425";
const headC = "#1a1a38";
const tailC = "#0f12ff";
var speed = 20;
var move = 0;
var isGame = true;
var score = 0;
var headX = Math.round(fieldW /2);
var headY = Math.round(fieldH /2);

var head = new game.Image(headX,headY,speed,speed,"img/bestHead.png");
var tail = [];
var dx = 0;
var dy = 0;
var apple = new game.Image(0,0,speed,speed,"img/bestApple.png");
var priseSound = new game.Audio("snd/prise!.mp3",false);
var music = new game.Audio("snd/music.mp3",true);

display.background("transparent")

var drawGrid = function(){
	for(var j = 0;j < app.width;j+=speed){
		for(var k = 0;k < app.height;k+=speed){
			//brush.drawImage(j,k,speed * 2,speed,"img/grid.png",0, ((k/speed) & 1)===1 ? 3.14:0 );
			if (((k/speed) & 1)===1) brush.drawRect(j,k,speed, speed, ((j/speed) & 1)===1 ? grid1:grid2,undefined, 0, 0);
				else brush.drawRect(j,k,speed, speed, ((j/speed) & 1)===1 ? grid2:grid1,undefined, 0, 0);
		}
	}
}

var addTailElement = function(){
	tail.push(new game.Rect(headX, headY, speed, speed,tailC,undefined));
}

var drawTail = function(){
	display.draw(head);
	game.Array.draw(tail);
}

var moveTail = function(){
	for(var j = tail.length-1;j >= 1;j--){
		tail[j].x = tail[j - 1].x;
		tail[j].y = tail[j - 1].y;
	}
	tail[0].x = head.x;
	tail[0].y = head.y;

	headX += dx;
	headY += dy;
	head.x = headX;
	head.y = headY;
}

var tailCollision = function(){
	for(var j = 1;j < tail.length;j++){
		if(headX === tail[j].x && headY === tail[j].y){
			document.getElementById("gameover").classList.remove('hide');
			document.getElementById("gameover").classList.add('show');
			game.loopStop();
		}
	}
}

var keyboard = function(){	
	if(key.downKey() === "ArrowUp") {
		dy = -speed;
		dx = 0;
		head.angle = 3*Math.PI/2;
	}
	if(key.downKey() === "ArrowDown"){ 
		dy = speed;
		dx = 0; 
		head.angle = Math.PI/2;
	}
	if(key.downKey() === "ArrowRight"){ 
		dx = speed; 
		dy = 0;
		head.angle = 2*Math.PI;
	}
	if(key.downKey() === "ArrowLeft"){ 
		dx = -speed; 
		dy = 0;
		head.angle = Math.PI;
	}
}

var moveApple = function(){
	const ax = game.Math.random(0, (fieldW / speed) - 1);
	const ay = game.Math.random(0, (fieldH / speed) - 1);
	apple.x = ax * speed;
	apple.y = ay * speed;
}

var drawApple = function(){
	display.draw(apple);
}

var checkApple = function(){
	if(headX === apple.x && headY === apple.y){
		score++;
		var temp = document.getElementById("text");
		temp.innerHTML = "Score:" + score;
		priseSound.play();
		moveApple();
		addTailElement();
	}
}

var checkBorder = function(){
	if((headX < 0 || (headX >= fieldW)) || (headY < 0 || (headY >= fieldH))){
	   	document.getElementById("gameover").classList.remove('hide');
		document.getElementById("gameover").classList.add('show');
		game.loopStop();
	}
}

music.play();

moveApple();
addTailElement();
game.loopFPS(10);
game.loop(function(){
	display.clear();
	keyboard();
	drawGrid();
	moveTail();
	drawTail();
	tailCollision();
	drawApple();
	checkApple();
	checkBorder();
});