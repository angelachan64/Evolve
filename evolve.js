var c = document.getElementById("area");
var ctx = c.getContext("2d");
var size = 4;
var tree = new Image();
var rock = new Image();
var bush = new Image();
var health = 200;
var start = document.getElementById("start");
var anim;

function update(){
    
    /* survivor */
    ctx.fillStyle = "#8C3449";
    ctx.arc(250, 430, size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    
    /* bars */
    ctx.strokeRect(10, 10, 202, 15);
    ctx.strokeRect(10, 35, 202, 15);
    ctx.fillRect(11, 11, health, 13);

}

function setup(){
    /* buttons */
    tree.src = "/img/tree.png";
    rock.src = "/img/rock.png";
    bush.src = "/img/berry.png";
    bush.onload = function(){
        ctx.drawImage(tree, 510, 10);
        ctx.drawImage(rock, 620, 43);
        ctx.drawImage(bush, 510, 120);
    };  
        
    /* background & sidebar */
    ctx.beginPath();
    ctx.fillStyle = "#71FF71";
    ctx.fillRect(0, 430, 500, 70);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle="#000000";
    ctx.strokeRect(500, 0, 230, 500);
    ctx.fillRect(500, 0, 230, 500);
    ctx.beginPath();
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
window.onload = update();

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

start.addEventListener("click", function(){
    console.log("start");
    
    anim = setInterval(function(){
        ctx.clearRect(0,0,300,70);
        if(health>0){
            health = health - 1;
        }
        update();
        console.log(health);
        
        if(health==0){
            clearInterval(anim);
            console.log("died");
        }
    }, 100);
    
})