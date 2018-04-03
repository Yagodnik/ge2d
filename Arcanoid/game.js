var app = new App(900,700,GRAPHICS_2D);

var player = new app.Game.Image(app.width / 2 - (150 / 2), app.height - 30,150,30,"img/paddle.png");
var ball = new app.Game.Image(app.width / 2 - (26 / 2),app.height / 2 - (26 / 2),26,26,"img/ball.png");

ball.offX = 20;
ball.offY = -20;

var level = [
	[0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,1,1],
	[0,1,1,1,1,1,1,1,1],
	[0,1,1,1,1,1,1,1,1],
	[0,1,1,1,1,1,1,1,1],
	[0,1,1,1,1,1,1,1,1]
];
var levelobj = [];

for(var i = 0;i < level.length;i++){
	for(var j = 0;j < level[i].length - 1;j++){
		if(level[i][j] === 1){
			levelobj.push(new app.Game.Image(j * 100, i * 40,90,30,"img/block.png"));
		} else if(level[i][j] === 1){
			continue;
		}
	}
}

app.display.backgroundImage("img/bg.png");

app.Game.loopFPS(35);
app.Game.loop(function(){
	app.display.clear();

	for(var i = 0;i < levelobj.length;i++){	
		if(ball.isCollisionEnter(levelobj[i])){
			levelobj.splice(i, 1);
			if(ball.x > levelobj[i].x || ball.x + ball.getR() < levelobj[i].x) ball.offX = -ball.offX;
			if(ball.y > levelobj[i].y || ball.y + ball.getR() < levelobj[i].y) ball.offY = -ball.offY;
		}
	}

	if(levelobj.length < 1) {
		alert("You win!");
		app.Game.loopStop();
	}

	if(ball.x - ball.getR() > app.width || ball.x < 0) ball.offX = -ball.offX;
	if(ball.y < 0) ball.offY = -ball.offY;
	if(ball.y - ball.getR() > app.height) {
		alert("Game Over!");
		app.Game.loopStop();
	}
	if(player.isCollisionEnter(ball)) ball.offY = -ball.offY;
	ball.move(ball.offX,ball.offY);

	if('ontouchstart' in window){
		player.x = app.Game.Touch.xPos();
	}else {
		if(app.Game.Keyboard.downKey() === "ArrowRight"){
			player.move(5,0);
		}
		if(app.Game.Keyboard.downKey() === "ArrowLeft"){
			player.move(-5,0);
		}
	}

	app.display.draw(player);
	app.display.draw(ball);
	app.Game.Array.draw(levelobj);
});
