
const W = 10;
const H = 10;
const size = 80;

const app = new App(size * W,size * H, GRAPHICS_2D);
const game = app.Game;
const display = app.display;
const mouse = game.Mouse;
const key = game.Keyboard;
const touch = game.Touch;
const math = game.Math;
const brush = game.Brush;
display.background("white");

var BombsField = [];
var LINE = [];
var field = [];

var endGame = false;
var winG    = false;

var pressed = false;

var off = [ {ox:1, oy:0},
		{ox:1, oy:1},
		{ox:0, oy:1},
		{ox:-1, oy:1},
		{ox:-1, oy:0},
		{ox:-1, oy:-1},
		{ox:0, oy:-1},
		{ox:1, oy:-1} 
		];

//=============================================================
var generateBombs = function(){
	for(var i = 0;i < W;i++){
		LINE = [];
		for(var j = 0;j < H;j++){
			LINE.push({
				isBomb : 0,
				hidden : true,
				state  : 0,
				neighbours : 0
			});	
		}
		BombsField.push(LINE);
	}

	var NM = Math.round(W * H * 0.15);
	for(var i = 0;i < NM; i++){
		var x = 0;
		var y = 0;
		do{
			x = math.random(0,W - 1);
			y = math.random(0,H - 1);	
		}while(BombsField[x][y] === 1)
		BombsField[x][y].isBomb = 1;
	}

}

//=============================================================
var calcAround = function(x, y) {
	var total = 0;
	for (var i=0; i<8; i++)
		if (((x + off[i].ox) >= 0) && ((x + off[i].ox) < W) && ((y + off[i].oy) >= 0) && ((y + off[i].oy) < H))
			if (BombsField[x + off[i].ox][y + off[i].oy].isBomb) total++;

	return total;
}
//=============================================================
var calcNeighbours = function() {
 for (var px = 0; px < W; px++)
 	for (var py = 0; py < H; py++) {
 		BombsField[px][py].neighbours = calcAround(px, py);
 	}
}

//=============================================================
var openBlock = function(x, y){
	var xx, yy;

	if (!BombsField[x][y].hidden) return;

	if (BombsField[x][y].neighbours === 0) {
		BombsField[x][y].hidden = false;
		BombsField[x][y].state = 11;

		for (var i=0; i<8; i++) {
			xx = x + off[i].ox;
			yy = y + off[i].oy;
			if ((xx >= 0) && (xx < W) && (yy >= 0) && (yy < H)) {
					openBlock(xx, yy);
			}
		}

	} else {
		BombsField[x][y].hidden = false;
		BombsField[x][y].state = BombsField[x][y].neighbours;				
	}

}

//=============================================================
var drawField = function(){

	display.clear();

	for(var i = 0;i < W;i++){
		for(var j = 0;j < H;j++){

			if (BombsField[i][j].hidden) brush.drawImage(i*size, j*size, size, size, "img/Empty.png");
				else switch (BombsField[i][j].state) {
					case 0:
						brush.drawImage(i*size, j*size, size, size, "img/Empty.png");
					break;
					case 1:
						brush.drawImage(i*size, j*size, size, size, "img/1.png");
					break;
					case 2:
						brush.drawImage(i*size, j*size, size, size, "img/2.png");
					break;
					case 3:
						brush.drawImage(i*size, j*size, size, size, "img/3.png");
					break;
					case 4:
						brush.drawImage(i*size, j*size, size, size, "img/4.png");
					break;
					case 5:
						brush.drawImage(i*size, j*size, size, size, "img/5.png");
					break;
					case 6:
						brush.drawImage(i*size, j*size, size, size, "img/6.png");
					break;
					case 7:
						brush.drawImage(i*size, j*size, size, size, "img/7.png");
					break;
					case 8:
						brush.drawImage(i*size, j*size, size, size, "img/8.png");
					break;
					case 9:
						brush.drawImage(i*size, j*size, size, size, "img/flag.png");
					break;
					case 10:
						brush.drawImage(i*size, j*size, size, size, "img/bomb.png");
					break;
					case 11:
						brush.drawImage(i*size, j*size, size, size, "img/Empty2.png");					
					break;
					case 12:
						brush.drawImage(i*size, j*size, size, size, "img/bombBoom.png");
					break;					
				}
		}
	}
}

//=============================================================
var failedGame = function(x, y){
 for (var i=0; i<W; i++)
 	for (var j=0; j<H; j++) {
 		BombsField[i][j].hidden = false;
 		if (BombsField[i][j].isBomb) BombsField[i][j].state = 10;
 			else BombsField[i][j].state = BombsField[i][j].neighbours;
 	}

 	BombsField[x][y].state = 12;
}

//=============================================================
var winGame = function(){

 for (var i=0; i<W; i++)
 	for (var j=0; j<H; j++) {
 		if (BombsField[i][j].isBomb) 
 			if (BombsField[i][j].state !== 9) return false;
 	}

 console.log("You Win");
 return true;
}

//=============================================================
var createField = function(){
	for(var i = 0;i < W;i++){
		LINE = [];
		for(var j = 0;j < H;j++){
			LINE.push(1);	
		}
		field.push(LINE);
	}
}


//=============================================================
var fail = false;
var cpx2, cpy2;
var click = function(mode) {

	if (endGame) return;

	var temp = document.getElementsByTagName('canvas')[0];
	var ox = temp.offsetLeft;
	var oy = temp.offsetTop;
	ox -= app.width / 2;
	oy -= app.height / 2;

	var mx = mouse.xPos() - ox;
	var my = mouse.yPos() - oy;

	var cpx, cpy;
	if ((mx >= 0) && (my >= 0)) {
		cpx = Math.floor(mx / size);
		cpy = Math.floor(my / size);
		if ((!pressed) && (cpx < W) && (cpy < H)) {

			switch (mode) {
			case 1:
				if (!BombsField[cpx][cpy].isBomb) openBlock(cpx, cpy);
					else {
							failedGame(cpx, cpy);
							endGame = true;
				}
			break;

			case 3:
				if ((BombsField[cpx][cpy].hidden) && (BombsField[cpx][cpy].state === 0)) {
					BombsField[cpx][cpy].hidden = false;
					BombsField[cpx][cpy].state = 9;
					return;
				} 

				if ((BombsField[cpx][cpy].state === 9) && (!BombsField[cpx][cpy].hidden)) {
					BombsField[cpx][cpy].hidden = true;
					BombsField[cpx][cpy].state = 0;
				}
			break;
			}

		}
	}

	

}

//=============================================================
window.addEventListener("mousedown",function(event){
	click(event.which);
},false);


generateBombs();
createField();
calcNeighbours();
game.loopFPS(60);

drawField();

game.loop(function(){
	drawField();
	if (!winG) {
		winG = winGame();
		if (winG) {
			alert("WIN!!!!");
			console.log("WIN!!!!!");
		}
	}
});
