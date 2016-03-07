var c = document.getElementById("area");
var ctx = c.getContext("2d");
var tree = new Image();
var rock = new Image();
var bush = new Image();
var health = 200; 
var points = 0;
var start = document.getElementById("start");
var anim;
var progress;
var chance;
var ep = 200;
var evopoints = "" + ep + " evolution points";
var numb = 0;
var protection = false;
var trees = 0;
var prey = 0;
var color = "#8C3449";
var right = true;
var up = true;
var pos = 0;
var vert = 0;
var go = false;


//amoeba properties:
var abilities = []; //e.g. wings, legs, etc.
var size = 32;
var level = 0;

/* 
function evolve(){
    size++;
    stage++;
    color = colors[stage];
};
*/

function has(s){
    for (var i=0;i<abilities.length;i++){
        if (abilities[i] == s){
            return true;
        }
    }
    return false;
}


function updateH(){
    /* UPDATE HEALTH */
    ctx.fillStyle = "#B20000";
    ctx.strokeRect(10, 10, 202, 15);
    ctx.fillRect(11, 11, health, 13);

}

function updateP(){
    /* UPDATE PROGRESS */
    ctx.fillStyle="#41B43E";
    ctx.strokeRect(10,35,202,15);
    ctx.fillRect(11,36,points,13);
}

function updateEP(){
    ctx.clearRect(10,60,480,15);
    ctx.fillStyle = "#262626";
    ctx.font = "15px century gothic"
    ctx.fillText(evopoints, 10, 75);
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
    
    /* points */
    ctx.beginPath();
    ctx.font = "15px century gothic";
    ctx.fillStyle = "#262626";
    ctx.fillText(evopoints, 10, 75);
    ctx.closePath();
        
    /* buttons */
    tree.src = "./img/tree.png";
    rock.src = "./img/rock.png";
    bush.src = "./img/berry.png";
    tree.onload = function(){
        ctx.drawImage(tree, 510, 240);
    };
    rock.onload = function(){
        ctx.drawImage(rock, 510, 145);
    }
    bush.onload = function(){
        ctx.drawImage(bush, 510, 10);
    };  
    
    /* prices */
    ctx.beginPath();
    ctx.font="30px century gothic";
    ctx.fillText("50 EP", 620, 75);
    ctx.fillText("100 EP", 620, 185);
    ctx.fillText("150 EP", 620, 295);
    ctx.closePath();
}


var xcor = 250;
var ycor = 430;

var r = c.getBoundingClientRect();

//makes amoeba wiggle 
/*
function wiggle(e){
    ctx.fillStyle = ("#8C3449");
    if (xcor <= r.left + 5){
	xcor += 2;
	ycor += (Math.random(3) - Math.random(3));
    } else if (xcor >= r.right - 5){
	xcor -= 2;
	ycor += (Math.random(3)- Math.random(3));
    } else if (ycor <= r.bottom + 5){
	xcor += (Math.random(3)- Math.random(3));
	ycor += 2;
    } else if (ycor >= r.top - 5){
	xcor += (Math.random(3)- Math.random(3));
	ycor -= 2;
    } else {
	xcor += (Math.random(3)- Math.random(3));
	ycor += (Math.random(3)- Math.random(3));
    }
    ctx.arc(xcor, ycor, size, 0, 2*Math.PI);
    ctx.fill();
};

*/

//updated wiggle, accounts for possible wings
function wiggle(){
    /*
    ctx.fillStyle = "#71FF71";
    ctx.beginPath();
    ctx.arc(xcor, ycor, size, 0, Math.PI);
    ctx.fill();
    */
    var r = c.getBoundingClientRect();
    
    
    ctx.clearRect(0,80,499,420);
    ctx.fillStyle = "#71FF71";
    ctx.beginPath();
    ctx.fillRect(0, 430, 499, 70);
    ctx.closePath();
    
    ctx.clearRect(230,0,269,81)
    
    /*
    if (xcor <= 498 - size){
        xcor += 2;
    } else if (xcor >= size){
        xcor -= 2;
    } else {
        xcor += (Math.random(5)- Math.random(5));
    }

    if (has("wings")){
        if (ycor <= 500 - size){
            ycor += 2;
        } else if (ycor >= size){
            ycor -= 2;
        } else {
            ycor += (Math.random(5) - Math.random(5));
        }
    }
    */
    
    if (has("wings")){
        if(up){
            if(right){
                if(pos<5){
                    console.log(pos);
                    pos++;
                    wiggleRight();
                } else{
                    right = false;
                    pos--;
                    wiggleLeft();
                } 
            } else{
                if(pos>-5){
                    console.log(pos);
                    pos--;
                    wiggleLeft();
                } else{
                    right = true;
                    pos++;
                    wiggleRight();
                }
            } wiggleUp();
            vert++;
            if(vert==50){
                up = false;
            }
        } else{
            if(right){
                if(pos<5){
                    console.log(pos);
                    pos++;
                    wiggleRight();
                } else{
                    right = false;
                    pos--;
                    wiggleLeft();
                } 
            } else{
                if(pos>-5){
                    console.log(pos);
                    pos--;
                    wiggleLeft();
                } else{
                    right = true;
                    pos++;
                    wiggleRight();
                }
            } wiggleDown();
            vert--;
            if(vert==0){
                up = true;
            }
        }
    }
    
    else if(right){
        if(pos<5){
            console.log(pos);
            pos++;
            wiggleRight();
        } else{
            right = false;
            pos--;
            wiggleLeft();
        }
    } else{
        if(pos>-5){
            console.log(pos);
            pos--;
            wiggleLeft();
        } else{
            right = true;
            pos++;
            wiggleRight();
        }
    }


    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(xcor, ycor, size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

//takes x and y coordinates of targeted prey and wiggles towards it
function findPrey(xPrey,yPrey){
    var d = Math.sqrt( (xPrey-xcor)*(xPrey-xcor) + (yPrey-ycor)*(yPrey-ycor) );
    while (d > 0){
        if (xPrey < xcor){
            wiggleLeft();
        }
        if (xPrey > xcor){
            wiggleRight();
        }
        if (yPrey < ycor){
            wiggleUp();
        }
        if (yPrey > ycor){
            wiggleDown();
        }
        d = Math.sqrt( (xPrey-xcor)*(xPrey-xcor) + (yPrey-ycor)*(yPrey-ycor) );
    }
    //eats prey
    //continues wiggling
}

function wiggleUp(){
    ycor -= Math.random(2) + 1.5;
}

function wiggleDown(){
    ycor += Math.random(2) + 1.5;
}

function wiggleLeft(){
    xcor -= Math.random(2) + 1.5;
}

function wiggleRight(){
    xcor += Math.random(2) + 1.5;
}

window.onload = setup();

function select() {
    var x = event.x;
    var y = event.y;
    
    var rect = c.getBoundingClientRect();
        
    x -= rect.left;
    y -= rect.top;
      
    //console.log("" + x + ", " + y);
          
    if(y>=475 && y<=490){
        if(x>=510 && x<=560){
            abilities.push("wings")
            console.log("wings");
            color = "#98D4FF";
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(508,360,230,200);
            c.removeEventListener("mousedown", select, 200);
        } else if(x>=590 && x<=628){
            abilities.push("gills")
            console.log("gills");
            color="#00CC99";
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(508,360,230,200);
            c.removeEventListener("mousedown", select, 200);
        }
    }
}



start.addEventListener("click", function(){
    if(go){
        console.log("no");
    } else{
        go = true;
    console.log("start");
    var x;
    var y;
    
    anim = setInterval(function(){
        ctx.fillStyle = "#B20000";
        ctx.clearRect(10,10,202,15);
        if(health>0){
            health = health - 1;
        }
        updateH();
        
        if (health==0){
            clearInterval(anim);
            console.log("died");
            clearInterval(chance);
        }
	    if (trees>0) {
	        prey += Math.random(2) + trees;
	        if (prey >= 15) {
		    x = Math.floor((Math.random() * 470) + 15);
		    while((x>=220 && x<=280)){
                x = Math.floor((Math.random() * 470) + 15);
		    }
		    y = 430;
		    console.log("" + x + ", " + y);
		    ctx.fillStyle = "#C34CFE";
            ctx.beginPath();
            ctx.arc(x,y,2,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
		    prey = 0;
	        }
	    }
	    
	    if (size >= 32) {
	        level += 1;
	    }
	    if (level == 999994) {
	        ctx.fillStyle="#FFFFFF";
	        ctx.fillRect(508,360,230,200);
	        ctx.fillStyle="#000000";
	        ctx.font="15px century gothic";
    	    ctx.fillText("You have reached the", 510, 400);
            ctx.fillText("next evolution stage", 510, 420);
    	    ctx.fillText("Would you like to", 510, 440);
            ctx.fillText("grow arms or legs?", 510, 460);
            ctx.fillText("ARMS       LEGS", 510, 490);
        
            c.addEventListener("mousedown", function(){
                var x = event.x;
                var y = event.y;
    
                var rect = c.getBoundingClientRect();
        
                x -= rect.left;
                y -= rect.top;
      
                //console.log("" + x + ", " + y);
          
                if(y>=475 && y<=490){
                    if(x>=510 && x<=560){
                        abilities.push("arms")
                        console.log("arms");
                    } else if(x>=590 && x<=628){
                        abilities.push("legs")
                        console.log("legs");
                    }
                }
            }, 200);
        }
	    
	    if (size >= 64) {
	        level == 2;
	    }
	    if (level == 1) {
	        ctx.fillStyle="#FFFFFF";
	        ctx.fillRect(508,360,230,200);
	        ctx.fillStyle="#000000";
	        ctx.font="15px century gothic";
    	    ctx.fillText("You have reached the", 510, 400);
            ctx.fillText("next evolution stage", 510, 420);
    	    ctx.fillText("Would you like to", 510, 440);
            ctx.fillText("grow wings or gills?", 510, 460);
            ctx.fillText("WINGS       GILLS", 510, 490);
        
            c.addEventListener("mousedown", select, 200);
            
        }
        
    }, 200);
    
    progress = setInterval(function(){
        ctx.fillStyle = "#41B43E";
        ctx.clearRect(10,35,202,15);
        if(health==0){
            clearInterval(progress);
        }
        if(points>=200){
            points = 0;
            console.log("level up");
            if(size<32){
                size++;
            }
            //update survivor
            ctx.beginPath();
            ctx.fillStyle = "#8C3449";
            ctx.arc(250, 430, size, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
	    health += 10;
        }
        if(points<200){
            points+=numb*0.5;
        }
        updateP();
	wiggle();
    }, 50);
    
    /*
    chance = setInterval(function(){
        if(Math.random()*100 <= 20){
            var ran = Math.random()*100;
            console.log("event!");
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(508,360,230,200);
            ctx.fillStyle = "#262626";
            ctx.font = "15px century gothic";
            if(ran<=33){
                ctx.fillText("There's a huge flood!", 510, 380);
                if(protection){
                    ctx.fillText("You hid under your rock and", 510, 400);
                    ctx.fillText("survived.", 510, 420);
                } else{
                    clearInterval(anim);
                    clearInterval(progress);
                    clearInterval(chance);
                    ctx.fillText("Sadly, you didn't have any", 510, 400);
                    ctx.fillText("protection and you drowned.", 510, 420);
                }
            } else if(ran<=66){
                ctx.fillText("There's a huge thunderstorm!", 510, 380);
                if(protection){
                    ctx.fillText("You hid under your rock and", 510, 400);
                    ctx.fillText("survived.", 510, 420);
                } else{
                    clearInterval(anim);
                    clearInterval(progress);
                    clearInterval(chance);
                    ctx.fillText("Sadly, you didn't have any", 510, 400);
                    ctx.fillText("protection and you got sick", 510, 420);
                    ctx.fillText("and died.", 510, 440);
                }
            } else{
                ctx.fillText("A large predator approaches!", 510, 380);
                if(protection){
                    ctx.fillText("You hid under your rock and", 510, 400);
                    ctx.fillText("survived.", 510, 420);
                } else{
                    clearInterval(anim);
                    clearInterval(progress);
                    clearInterval(chance);
                    ctx.fillText("Sadly, you didn't have any", 510, 400);
                    ctx.fillText("protection and the predator", 510, 420);
                    ctx.fillText("ate you.", 510, 440);
                }
            } else{
                ctx.fillStyle = "#660066";
                ctx.beginPath();            
                ctx.arc(x,y,30,0,2*Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.fillText("BOSS FIGHTTTT",510,380);
                for (i=0; i<abilities.length; i++) {
                    if abilities[i] == "wings" 
                }
            }
        }
    }, 1000);
    */
    
    c.addEventListener("mousedown", function(){
        var x = event.x;
        var y = event.y;
    
        var rect = c.getBoundingClientRect();
    
        x -= rect.left;
        y -= rect.top;
      
        //console.log("" + x + ", " + y);
      
        if(x>=510 && x<=610){
            if(y>=10 && y<=110){
                console.log("bush!");
                if(ep >= 50){
                    ep -= 50;
                    evopoints = "" + ep + " evolution points";
                    updateEP();
		            numb++;
                    x = Math.floor((Math.random() * 470) + 15);
                    while((x>=220 && x<=280)){
                        x = Math.floor((Math.random() * 470) + 15);
                    }
                    y = 430;
                    console.log("" + x + ", " + y);
                    ctx.fillStyle = "#89D862";
                    ctx.beginPath();
                    ctx.arc(x,y,16,0,2*Math.PI);
                    ctx.fill();
                    ctx.closePath();
                }
            } else if(y>=120 && y<=220){
                console.log("rock!");
                if(ep>=100){
                    ep -= 100;
                    evopoints = "" + ep + " evolution points";
                    updateEP();
		    protection = true;
		    x = Math.floor((Math.random() * 470) + 15);
                    while((x>=220 && x<=280)){
                        x = Math.floor((Math.random() * 470) + 15);
                    }
                    y = 410;
                    console.log("" + x + ", " + y);
                    ctx.fillStyle = "#565F61";
                    ctx.beginPath();
                    ctx.rect(x,y,25,25);
                    ctx.fill();
                    ctx.closePath();
                }
            } else if(y>=240 && y<=310){
                console.log("tree!");
		            if(ep>=150){
                    ep -= 150;
                    evopoints = "" + ep + " evolution points";
                    updateEP();
		            trees++;
		            x = Math.floor((Math.random() * 470) + 15);
                    while((x>=220 && x<=280)){
                        x = Math.floor((Math.random() * 470) + 15);
                    }
                    y = 380;
                    console.log("" + x + ", " + y);
                    ctx.fillStyle = "#663300";
                    ctx.beginPath();
                    ctx.rect(x,y,25,60);
                    ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
		            ctx.fillStyle = "#00B200";
                    ctx.arc(x+12,y,25,0,2*Math.PI);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }, false);
    }
});