const app = new App(w,h,GRAPHICS_2D);
const game = app.Game;
const display = app.display;
const keyboard = game.Keyboard;
const mouse = game.Mouse;
const touch = game.Touch;
const camera = game.Camera;

const ballSize = 15;
const minS = -5;
const maxS = 5;
const plH = 100;
const plS = 5;

var ball = new game.Rect(
	(app.width / 2) + (ballSize / 2),
	(app.height / 2) + (ballSize / 2),
	ballSize, ballSize, "white"
);
var pl1 = new game.Rect(0,(app.height / 2) - (plH / 2), 15, plH,"white");

const collider = new display.BoxCollider(ball, pl1);

var dx = Math.round(minS - 0.5 + Math.random() * (maxS - minS + 1));
var dy = Math.round(minS - 0.5 + Math.random() * (maxS - minS + 1));;

game.loopFPS(35);
game.loop(function(){
	display.clear();
	
	if(ball.x - ballSize * 2 > app.width) dx = -dx;
	if(ball.y < 0 || ball.y - ballSize * 2 > app.height) dy = -dy;
	if(ball.x < 0) {
		var temp = new game.Text("GameOver!", 
			app.width / 2, app.height / 2, "white","Arial", 30);
		temp.fontname = "Arial";
		temp.textalign = "center";
		temp.basealing = "top";
		display.draw(temp);

		game.loopStop();
	}
	if(collider.is()) dx = -dx;
	ball.move(dx, dy);

	if(keyboard.downKey() === "ArrowUp") pl1.move(0, -plS);
	if(keyboard.downKey() === "ArrowDown") pl1.move(0, plS);

	if('ontouchstart' in window) pl1.y = touch.yPos();

	display.draw(pl1);
	display.draw(ball);
});