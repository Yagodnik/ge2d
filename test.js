var app = new App(600,600,GRAPHICS_2D);

var rect = new app.Game.Rect(15,15,100,100);
var rect2 = new app.Game.Rect(15,15,1,1,"red");
var circle = new app.Game.Circle(200,200,15,"Green");
rect.angle = 0;

var l1 = new app.display.Layer(1);
//l1.new();

app.Game.loopFPS(30);
app.Game.loop(function(){
    app.display.clear(0);
    if(app.Game.Keyboard.downKey() === "ArrowDown") rect.move(0,5);
    if(app.Game.Keyboard.downKey() === "ArrowUp") rect.move(0,-5);
    if(app.Game.Keyboard.downKey() === "ArrowLeft") rect.move(-5,0);
    if(app.Game.Keyboard.downKey() === "ArrowRight") rect.move(5,0);

    if(app.Game.Keyboard.downKey() === "s") circle.move(0,5);
    if(app.Game.Keyboard.downKey() === "w") circle.move(0,-5);
    if(app.Game.Keyboard.downKey() === "a") circle.move(-5,0);
    if(app.Game.Keyboard.downKey() === "d") circle.move(5,0);

    rect.angle+=0.01;
    rect2.x = circle.x;
    rect2.y = circle.y;
    app.display.draw(rect);
    app.display.draw(circle);
    app.display.draw(rect2);
});