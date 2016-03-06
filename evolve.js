var c = document.getElementById("area");
var ctx = c.getContext("2d");
var size = 4;
var tree = new Image();
var rock = new Image();
var bush = new Image();
var health = 200; var points = 0;
var start = document.getElementById("start");
var anim;
var progress;

function updateH(){
    /* UPDATE HEALTH */
    ctx.strokeRect(10, 10, 202, 15);
    ctx.fillRect(11, 11, health, 13);

}

function updateP(){
    /* UPDATE PROGRESS */
    ctx.strokeRect(10,35,202,15);
    ctx.fillRect(11,36,points,13);
}

function setup(){
    /* background & sidebar */
    ctx.beginPath();
    ctx.fillStyle = "#71FF71";
    ctx.fillRect(0, 430, 500, 70);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle="#000000";
    ctx.strokeRect(500, 0, 230, 500);
    ctx.fillRect(500, 0, 230, 500);
    ctx.beginPath();
    
    /* survivor */
    ctx.fillStyle = "#8C3449";
    ctx.arc(250, 430, size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    
    /* bars */
    ctx.strokeRect(10, 10, 202, 15);
    ctx.fillStyle = "#B20000";
    ctx.fillRect(11, 11, health, 13);
    ctx.strokeRect(10,35,202,15);
        
    /* buttons */
    tree.src = "/img/tree.png";
    rock.src = "/img/rock.png";
    bush.src = "/img/berry.png";
    bush.onload = function(){
        ctx.drawImage(tree, 510, 10);
        ctx.drawImage(rock, 620, 43);
        ctx.drawImage(bush, 510, 120);
    };  
}


var xcor = 250;
var ycor = 450;

var r = c.getBoundingClientRect();

//makes amoeba wiggle 
function wiggle(e){
    e.preventDefault();
    ctx.fillStyle = ("#000060");
    if (xcor <= r.left + 5){
	xcor += 2;
	ycor += Math.random(2);
    } else if (xcor >= r.right - 5){
	xcor -= 2;
	ycor += Math.random(2);
    } else if (ycor <= r.bottom + 5){
	xcor += Math.random(2);
	ycor += 2;
    } else if (ycor >= r.top - 5){
	xcor += Math.random(2);
	ycor -= 2;
    } else {
	//still need to make it include negative numbers
	xcor += Math.random(2);
	ycor += Math.random(2);
    }
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

start.addEventListener("click", function(){
    console.log("start");
    
    anim = setInterval(function(){
        ctx.fillStyle = "#B20000";
        ctx.clearRect(10,10,202,15);
        if(health>0){
            health = health - 1;
        }
        updateH();
        
        if(health==0){
            clearInterval(anim);
            console.log("died");
        }
    }, 200);
    
    progress = setInterval(function(){
        ctx.fillStyle = "#41B43E";
        ctx.clearRect(10,35,202,15);
        if(health==0){
            clearInterval(progress);
        }
        if(points==200){
            points = 0;
            console.log("level up");
            size++;
            /* update survivor */
            ctx.fillStyle = "#8C3449";
            ctx.arc(250, 430, size, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        if(points<200){
            points++;
        }
        updateP();
    }, 50);
})