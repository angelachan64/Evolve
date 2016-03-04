var c = document.getElementById("area");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "#71FF71";
ctx.fillRect(0, 430, 500, 70);
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle="#000000";
ctx.strokeRect(500, 0, 200, 500);
ctx.fillRect(500, 0, 200, 500);