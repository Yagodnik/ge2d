/*JavaScript Tetris!*/

var pieceSize = 16;

var row = pieceSize * 30;
var col = pieceSize * 20;

var dx = 8;
var dy = 0;

var color;
var score = 0;

var matrix = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];

var field = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var pieceNames = ["T","O","J","L","I","Z","S"];
var pieceColors = [
	"#ff4744",
	"#ffe644",
	"#91ff44",
	"#44f5ff",
	"#4456ff",
	"#b444ff",
	"#ff4488"
];

var app = new App(col,row,GRAPHICS_2D);

var game = app.Game;
var brush = game.Brush;
var keyboard = game.Keyboard;

var createMatrix = function(type){
	switch(type){
		case "T":
			matrix = [
				[0,0,0,0],
				[1,1,1,0],
				[0,1,0,0],
				[0,0,0,0]
			];
			break;
		case "O":
			matrix = [
				[0,0,0,0],
				[0,1,1,0],
				[0,1,1,0],
				[0,0,0,0]
			];
			break;
		case "Z":
			matrix = [
				[0,0,0,0],
				[1,1,0,0],
				[0,1,1,0],
				[0,0,0,0]
			];
			break;
		case "S":
			matrix = [
				[0,0,0,0],
				[0,1,1,0],
				[1,1,0,0],
				[0,0,0,0]
			];
			break;
		case "L":
			matrix = [
				[1,0,0,0],
				[1,0,0,0],
				[1,1,0,0],
				[0,0,0,0]
			];
			break;
		case "J":
			matrix = [
				[0,0,1,0],
				[0,0,1,0],
				[0,1,1,0],
				[0,0,0,0]
			];
			break;
		case "I":
			matrix = [
				[1,0,0,0],
				[1,0,0,0],
				[1,0,0,0],
				[1,0,0,0]
			];
			break;
	}
	color = pieceColors[game.Math.random(0,6)];
}

var drawMatrix = function(){
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(matrix[i][j] !== 0){
				brush.drawRect(
						(j*pieceSize) + (dx * pieceSize),
						(i*pieceSize) + (dy * pieceSize),
						pieceSize,
						pieceSize,
						color,
						"white"
				);
			}
		}
	}
}

function rotateMatrix() {
    var n = 4;
    for (var i = 0; i < n / 2; i++) {
        for (var j = 0; j < Math.ceil(n/2); j++) {
            var temp = matrix[i][j];
            matrix[i][j] = matrix[n-1-j][i];
            matrix[n-1-j][i] = matrix[n-1-i][n-1-j];
            matrix[n-1-i][n-1-j] = matrix[j][n-1-i];
            matrix[j][n-1-i] = temp;
        }
    }
    return matrix;
}

var fillField = function(){
	for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
        	if (matrix[i][j]){
        		//console.log(parseInt("0x" + color.replace("#", "")));
        		field[dy + i][dx + j] = parseInt("0x" + color.replace("#", "")); //matrix[i][j];
        	}
        }
    }
}

var drawField = function(){
	for (var i = 29; i >= 0; i--) {
        for (var j = 19; j >= 0; j--) {

        	if(field[i][j] !== 0){
        		var colBrick = "#"  + Number(field[i][j]).toString(16);//  field[i][j]
				brush.drawRect(
					(j*pieceSize),
					(i*pieceSize),
					pieceSize,
					pieceSize,
					colBrick, /*"red",*/
					"white"
				);
        	}
        }
    }
}

var checkCollision = function(){
	for (var ty = 3; ty >= 0; ty--) {
        for (var tx = 3; tx >= 0; tx--) {
        	if (matrix[ty][tx]) {
        		if ((ty + dy) >= 29) {
        			return 1;
        		}
        		if (field[ty + dy + 1][tx + dx])   {
        			return 1;
        		}
        	}
        }
    }
    return 0;
}

var checkLine = function(line){
	for (var i = 0; i < 20; i++) {
		if(field[line][i] === 0){
			return 0;
		}
	}
	return 1;
}

var pack = function(){
	var index = 29;
	while(index > 0){
		if(checkLine(index)){
			shift(index);
			score+=10;
			line.play();
		}else{
			index--;
		}
	}
}

var shift = function(line){
	for (var rw = line - 1; rw >= 0; rw--) {
		for (var col = 29; col >= 0; col--) {
			field[rw + 1][col] = field[rw][col];
		}
	}
}

var checkLeft = function(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(matrix[i][j] !== 0){
				if((dx + j) <= 0){
					return 0;
				}
			}
		}
	}
	return 1;
}

var checkRight = function(){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(matrix[i][j] !== 0){
				if((dx + j) >= 19){
					return 0;
				}
			}
		}
	}
	return 1;
}
var arrowLeft, arrowRight, arrowUp = false;
var keyboardControl = function(){
	if(keyboard.downKey() === "ArrowLeft" && arrowLeft === false){
		if(checkLeft()) dx-=1;		
		arrowLeft = true;
	}
	if(keyboard.downKey() === "ArrowRight" && arrowRight === false){	
		if(checkRight()) dx+=1;
		arrowRight = true;
	}
	if(keyboard.downKey() === "ArrowUp" && arrowUp === false){
		rotateMatrix();
		arrowUp = true;
	}
	if(keyboard.downKey() === "ArrowDown"){
		timelimit = 1;
	}else{
		timelimit = 30;
	}
}

window.addEventListener("keyup",function(){
	arrowLeft = false;
	arrowRight = false;
    arrowUp = false;
},false)

var drawScore = function(){
	var temp = document.getElementById("score");
	temp.innerHTML = score;
}

var drawGrid = function(){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 30; j++) {
			brush.drawRect(
				i*pieceSize,j*pieceSize,
				pieceSize,
				pieceSize,
				undefined,
				"#090821"
			);
		}
	}
}

createMatrix(pieceNames[game.Math.random(0,6)]);
var music = new game.Audio("music.mp3",true);
var fall = new game.Audio("SFX_PieceFall.mp3",false);
var line = new game.Audio("Line.mp3",false);

var timer = 0;
var timelimit = 30;

game.loopFPS(30);
game.loop(function(){
	if(timer > timelimit){	    
		timer = 0;
		if (!checkCollision()) dy -= -1;
		else {
			fillField();
			createMatrix(pieceNames[game.Math.random(0,6)]);
			dy = 0;
			dx = 8;
			pack();
			fall.play();
			//console.log(checkLine(29));
		}
	}

	drawGrid();
	drawMatrix();
	drawField();
	keyboardControl();
	drawScore();

	timer++;

	if(!music.playing){
		music.play();
	}
});