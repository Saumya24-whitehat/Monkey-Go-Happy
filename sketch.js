
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gamestate,PLAY,END;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(50,350,10,10);
  monkey.addAnimation("monkey running",monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(300,370,600,10);
  
  FoodGroup=Group();
  obstacleGroup=Group();
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  monkey.setCollider("rectangle",0,0,700,200,-45);
  // monkey.debug=true;
}


function draw() {
  background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/10);
  text("Survival Time: "+survivalTime,100,50);
  
  monkey.collide(ground);
  
  monkey.velocityY=monkey.velocityY+0.75;
  
  if(gameState===PLAY){
    bananaFunction();
    obstacleFunction();
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.removeSprites();
    }
    if(keyDown("space")&&monkey.y>317){
       monkey.velocityY=-15;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }else if(gameState===END){
    monkey.animation.stop();
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }
  drawSprites();
}
function bananaFunction(){
  if(frameCount%100==0){
    banana=createSprite(600,200,10,10);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=100;
    FoodGroup.add(banana);
  }
}

function obstacleFunction(){
  if(frameCount%600==0){
    obstacle=createSprite(600,325,10,10);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-8;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
}






