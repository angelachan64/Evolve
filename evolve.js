var c = document.getElementById("area");
var ctx = c.getContext("2d");
var size = 4;
var tree = new Image();
var rock = new Image();
var bush = new Image();

function setup(){
    ctx.beginPath();
    ctx.fillStyle = "#71FF71";
    ctx.fillRect(0, 430, 500, 70);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle="#000000";
    ctx.strokeRect(500, 0, 230, 500);
    ctx.fillRect(500, 0, 230, 500);
    ctx.beginPath();
    
    ctx.fillStyle = "#8C3449";
    ctx.arc(250, 430, size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();

    tree.src = "/img/tree.png";
    rock.src = "/img/rock.png";
    bush.src = "/img/berry.png";
    bush.onload = function(){
        ctx.drawImage(tree, 510, 10);
        ctx.drawImage(rock, 620, 43);
        ctx.drawImage(bush, 510, 120);
    }
}


var xcor = 250;
var ycor = 450;

function wiggle(e){
    e.preventDefault();
    ctx.fillStyle = ("#000060");
    ctx.arc(xcor, ycor, 10, 0, 2*Math.PI);
    ctx.fill();
};

window.onload = setup();

c.addEventListener("mousedown", function(){
  var x = event.x;
  var y = event.y;
  
  var rect = c.getBoundingClientRect();

  x -= rect.left;
  y -= rect.top;
  
  //console.log("" + x + ", " + y);
  
  if(x>=510 && x<=610){
      if(y>=10 && y<=110){
          console.log("tree!");
      } else if(y>=120 && y<=220){
          console.log("bush!");
      }
  } else if(x>=620 && x<=720){
      if(y>=10 && y<=110){
          console.log("rock!");
      }
  }
}, false);