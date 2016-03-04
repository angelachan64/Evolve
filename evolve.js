File Edit Options Buffers Tools Javascript Help                                 
var c = document.getElementById("area");
<<<<<<< HEAD
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "#71FF71";
ctx.fillRect(0, 430, 500, 70);
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle="#000000";
ctx.strokeRect(500, 0, 200, 500);
ctx.fillRect(500, 0, 200, 500);

var xcor = 250;
var ycor = 450;

function wiggle(e){
    e.preventDefault();
    ctx.fillStyle = ("#000060");
    ctx.arc(xcor, ycor, 10, 0, 2*Math.PI);
    ctx.fill();
};
