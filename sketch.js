
var main, wallTop, wallBottom, wallLeft, wallRight;
var MAX_SPEED = 3;
var wallSize = 30;
var s;
var screamImg, screamImg2, screamImg3, screamImg4, screamImg5, screamImg6, screamImg7, screamImg8, screamImg9, screamImg10, screamImg11;
var sprinkle;
var sprinkle1,sprinkle2,sprinkle3,sprinkle4,sprinkle5,sprinkle6,sprinkle7,sprinkle8,sprinkle9,sprinkle10;
var sprinkleHolder;
var iceCream, iceCreamState1;
var score;
var cloudL,cloudR, cloudLImg, cloudRImg;
var cloudL2, cloudR2;
var mainCloud, mainCloudImg, mainCloudR, mainCloudImgR;
var red;
var startScreen, clickOne, clickTwo, clickCount;
var song, endScreen, endScreenImg;

var sprinkle;

function preload(){
startScreen = loadImage("images/startScreen.png");
song = loadSound('track1.mp3');
}
function setup() {
  clickOne = false;
  clickTwo = false;
  score = 0;
   w = window.innerWidth;
   h = window.innerHeight
   screamImg = loadImage("images/Scream.png");
   screamImg2 = loadImage("images/state1.png");
   screamImg3 = loadImage("images/state2.png");
   screamImg4 = loadImage("images/state3.png");
   screamImg5 = loadImage("images/state4.png");
   screamImg6 = loadImage("images/state5.png");
   screamImg7 = loadImage("images/state6.png");
   screamImg8 = loadImage("images/state7.png");
   screamImg9 = loadImage("images/state8.png");
   screamImg10 = loadImage("images/state9.png");
   screamImg11 = loadImage("images/state10.png");

   endScreenImg = loadImage("images/winScreen.png");
   sprinkleHolder = [];
  createCanvas(600, h);
  s = second();
 
  wallLeft = createSprite(-wallSize/2, height/2, wallSize, height);
  wallLeft.immovable = true;

  wallRight = createSprite(width+wallSize/2, height/2, wallSize, height);
  wallRight.immovable = true;
  
  cloudL = createSprite(275, 100, 300, 575);
  cloudR = createSprite(350, 100, 300, 575);

  cloudL2 = createSprite(275, height+200, 300, 575);
  cloudR2 = createSprite(350, height+200, 300, 575);

  main = createSprite(width/2, height-50, 100, 10);
  main.immovable = true;
  iceCream = createSprite(width/2, height-400, 11, 11);
  iceCream.maxSpeed = 10;
  iceCream.addImage(screamImg);
  cloudLImg = loadImage('images/cloudL.png');
  cloudRImg = loadImage('images/cloudR.png');
 
  mainCloudImgR = loadImage('images/cloud_main_flipped.png');

   mainCloud = loadAnimation("images/cloud_main_1.png","images/cloud_main_2.png","images/cloud_main_3.png","images/cloud_main_4.png","images/cloud_main_5.png","images/cloud_main_6.png","images/cloud_main_7.png","images/cloud_main_8.png","images/cloud_main_9.png",)
   mainCloudR = loadAnimation("images/flipped/cloud_main_1.png","images/flipped/cloud_main_2.png","images/flipped/cloud_main_3.png","images/flipped/cloud_main_4.png","images/flipped/cloud_main_5.png","images/flipped/cloud_main_6.png","images/flipped/cloud_main_7.png","images/flipped/cloud_main_8.png","images/flipped/cloud_main_9.png",)
   main.addAnimation('mainCloud', mainCloud);
   main.addAnimation('mainCloudR', mainCloudR);
   song.loop();
   endScreen = false;
   red = 210;
}

function draw() { 
  background(red, 199, 255);

  if(clickOne == false && endScreen == false){
  	image(startScreen, 0, 0);
  }

  else if(endScreen == true){
  	image(endScreenImg, 0, 0);
  	if(clickOne == true){
  		restart();
  	}
  }

  else{
  	  cloudL.setVelocity(0,-1);
  cloudR.setVelocity(0,-1);
  cloudL2.setVelocity(0,-1);
  cloudR2.setVelocity(0,-1);
  s = millis();
  cloudL.addImage(cloudLImg);
  cloudR.addImage(cloudRImg);

  cloudL2.addImage(cloudLImg);
  cloudR2.addImage(cloudRImg);

  if(cloudL.position.y < -500){
  	cloudL.position.y = height + 500;
  	cloudR.position.y = height + 500;
  }

  if(cloudL2.position.y < -500){
  	cloudL2.position.y = height +500;
  	cloudR2.position.y = height + 500;
  }

  main.position.x = mouseX;
  // main.position.y = constrain(mouseY, height/2, height);
  main.position.y = mouseY;
  var intensity = map(main.position.y, width, width/2, 0, 3);


if(!(iceCream.position.x  <  50|| iceCream.position.x > width-7)){
	  if(main.position.x < iceCream.position.x && main.position.x > 0){
	  	var speed = map(main.position.x, 0, width/2, 0, intensity);
	  	iceCream.setSpeed(speed,0);
	  	 main.changeAnimation('mainCloud');
	  } 

	   if(main.position.x > iceCream.position.x && main.position.x < width){
	  	var speed = map(main.position.x, width/2, width, intensity, 0);
	  	iceCream.setSpeed(speed,180);
	  		main.changeAnimation('mainCloudR');
	  } 
  }
  else if (iceCream.collide(wallLeft)){
  	iceCream.position.x = width/2;
  }
  else if(iceCream.collide(wallRight)){
  	iceCream.position.x = width/2;
  }     

     if (frameCount % 40 == 0) {
     	red++;
     }   

   if (frameCount % 60 == 0) {
  	 sprinkle1 = loadImage("images/sprinkle" + int(random(1,14)) + ".png");
	 sprinkle = createSprite(random(width), 0, random(50), random(50));
	sprinkleHolder.push(sprinkle);
	sprinkle.setSpeed(random(1,3),90);
	sprinkle.addImage(sprinkle1);

	// iceCream.setCollider("rectangle", iceCream.position.x, iceCream.position.y, 600, 1200);
    // sprinkle.setCollider("rectangle", sprinkle.position.x, sprinkle.position.y, 100, 100);

	drawSprites();
  	}

  	for(var i = 0; i < sprinkleHolder.length; i++){
  	    if(iceCream.overlap(sprinkleHolder[i])){
  	    	if(score < 1){
    			iceCream.addImage(screamImg2);
    		}
    		else if(score > 3 && score <= 6){
    			iceCream.addImage(screamImg3);
    		}
    	    else if(score > 6 && score <= 9){
    			iceCream.addImage(screamImg4);
    		}
    		else if(score > 9 && score <= 12){
    			iceCream.addImage(screamImg5);
    		}
    		else if(score > 12 && score <= 15){
    			iceCream.addImage(screamImg6);
    		}
    		else if(score > 15 && score <= 18){
    			iceCream.addImage(screamImg7);
    		}
    		else if(score > 18 && score <= 21){
    			iceCream.addImage(screamImg8);
    		}
    		else if(score > 21 && score <= 24){
    			iceCream.addImage(screamImg9);
    		}
    		else if(score > 27 && score <= 30){
    			iceCream.addImage(screamImg10);
    		}
    		else if(score > 30 && score <= 33){
    			endScreen = true;
    			clickCount = 0;
    			clickOne = false;
    		}
   			sprinkleHolder[i].remove();
   			sprinkleHolder[i].position.y = height;
   			score++;
   			// break;
         }
  	} 

  	 drawSprites();
  	 console.log(score);
  	}


}

function mousePressed() {
  
  if(clickCount == 1){
  	clickeOne = true;
  }
  else if (clickCount == 2){
  	clickTwo = true;
  }
  else{
  	clickTwo = true;
  	clickOne = true;
  }
}


function drawsprinkles(){
	sprinkle1 = loadImage("images/sprinkle" + int(random(1,14)) + ".png");
	sprinkle = createSprite(random(width), 0, random(50), random(50));

	sprinkle.setSpeed(random(1,3),90);
	sprinkle.addImage(sprinkle1);
	drawSprites();
}

function restart(){
	endScreen = false;
	clickOne = false;
	clickTwo = false;
	clickCount = 0;
	score = 0;
}

