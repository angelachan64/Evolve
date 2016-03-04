var c = document.getElementById("area");
var ctx = c.getContext("2d");

var x = 100;
var y = 100;

var drag = function() {
    ctx.beginPath();
    ctx.arc(x,y,50,0,2*Math.PI);
    ctx.fill();
};
