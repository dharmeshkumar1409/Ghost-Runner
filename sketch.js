var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ghost,ghostImg;
var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var invisible,invisibleImg,invisibleGroup;
var spooky;

function preload(){
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spooky.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  
  ghost = createSprite(300,300,30,30);
  ghost.addImage(ghostImg);
  ghost.scale = 0.35;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();
  
}

function draw(){
  background("black");
  
  if(gameState === PLAY){
    spawnObstacle();
    
    tower.velocityY = 1;

    if(tower.y > 400){
      tower.y = 300;
    }

    if(keyDown("space")){
      ghost.velocityY = -8;
    }
    ghost.velocityY += 0.8;

    if(keyDown(LEFT_ARROW)){
      ghost.x -= 2;
    }

    if(keyDown(RIGHT_ARROW)){
      ghost.x += 2;
    }
    
    if(ghost.isTouching(invisibleGroup)||ghost.y>600){
      gameState = END;
    }
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0;
    }
  }
  else if(gameState === END){
    tower.setVelocityY = 0;
    tower.destroy();
    doorGroup.setVelocityYEach(0);
    doorGroup.destroyEach();
    climberGroup.setVelocityYEach(0);
    climberGroup.destroyEach();
    invisibleGroup.setVelocityYEach(0);
    invisibleGroup.destroyEach();
    ghost.destroy();
    fill("blue");
    textSize(50);
    text("GameOver",180,400);
  }
  
  drawSprites();
}

function obstacle(){
  var r = Math.round(random(100,500))
  
  door = createSprite(r,50);
  door.addImage(doorImg);
  door.velocityY = 1;
  door.lifetime = 600;
  doorGroup.add(door);
  ghost.depth = door.depth;
  ghost.depth += 1;
  
  climber = createSprite(r,100);
  climber.addImage(climberImg);
  climber.velocityY = 1;
  climber.lifetime = 600;
  climberGroup.add(climber);
  
  invisible = createSprite(r,105,100,5);
  invisible.velocityY = 1;
  invisible.lifetime = 600;
  invisibleGroup.add(invisible);
  
  
}

function spawnObstacle(){
  if(frameCount%250 === 0){
    obstacle();
  }
}
