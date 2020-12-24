var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey_running;
var monkestop, monkeysImage;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var backgroundImage, background;
var monkeySound,monkeySound2 ;
var gameOverImg, restartImg, gameOver, restart;
var bscore;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkeysImage = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundImage = loadImage("jungleimage.jpg");

  monkeySound2 = loadSound("monkey2.mp3");
  monkeySound = loadSound("monkey.mp3");
  gameOverImg = loadImage("download.png");
  
}
function setup() {
  createCanvas(500, 500);

  background = createSprite(0, 200, 100, 100);
  background.addImage("bg", backgroundImage);
  background.scale = 4;
  monkey = createSprite(100, 450, 100, 100);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop",monkeysImage);
  monkey.scale = 0.15
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,450,450);
  ground = createSprite(0,475,400,10);
  ground.visible = false;
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  bscore = 0
   gameOver = createSprite(250,270);
  gameOver.addImage(gameOverImg);
 
}
function draw() {
   if(gameState === PLAY){

    gameOver.visible = false;
     
    
    score = Math.ceil(frameCount/frameRate());
    
    if(keyDown("space")&& monkey.y >= 400) {
        monkey.velocityY = -17;
    }
   background.velocityX = -(2+3*bscore/2);
   if (background.x < 0){
      background.x = background.width/2;
    }
    monkey.velocityY = monkey.velocityY + 0.6;
  
   
    bananas();
  
    stones();
    
    if(FoodGroup.isTouching(monkey)){
      bscore=bscore+1;
      monkeySound.play();
      FoodGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)){
     monkeySound2.play();
      gameState = END;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      monkey.changeAnimation("stop",monkeysImage);
     background.velocityX = 0;
      monkey.velocityY = 0
      
     
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }

  
  monkey.collide(ground);
drawSprites();
  fill("black");
  stroke("white")
  strokeWeight(5)
  textSize(25)
  text("Bananas Collected- "+ bscore, 10,50);
  fill("black");
  stroke("white")
  strokeWeight(5)
  textSize(25)
  text("Survival Time- "+ score, 300,50);
}
function stones(){
  if(frameCount % 200 === 0){
  obstacle = createSprite(500, 450, 100, 100);
  obstacle.addAnimation("oi",obstacleImage);
  obstacle.velocityX = -(5+3*bscore/2);
  obstacle.scale = 0.17;
  obstacle.debug = false;
  obstacle.setCollider("rectangle",0,0,350,350)
  obstacle.lifetime = 260
  obstacleGroup.add(obstacle);
  }
  
}
function bananas(){
  if(frameCount % 220 === 0){
  banana = createSprite(500, 325, 100, 100);
  banana.addAnimation("oi",bananaImage);
  banana.y = Math.round(random(200,350));
  banana.velocityX = -(4+3*bscore/2);
  banana.lifetime = 260
  gameOver.depth = banana.depth + 1;
  banana.scale = 0.17;
  FoodGroup.add(banana);
  }
}
