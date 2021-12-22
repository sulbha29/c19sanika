var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
 
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

doorsGroup = new Group()
invisibleBlockGroup = new Group()
climbersGroup = new Group()


ghost = createSprite(200,200,50,50)
ghost.addImage(ghostImg)
  ghost.scale = 0.3

}
function spawndoor(){
  if( frameCount % 180 == 0 ){
    var door = createSprite(200,-50)
    var climber = createSprite(200,10)
    climber.addImage(climberImg)
    var invisibleBlock =createSprite(200,15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1

    climbersGroup.add (climber)
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug = true


    door.addImage(doorImg)
    door.velocityY = 1
    door.x = Math.round(random(100,400))
    //door.y = Math.round(random(0,600))
    climber.x = door.x
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1

    climber.velocityY = 1



    doorsGroup.add (door)
  }
}
 

function draw() {
  background(200);


  if(gameState =="play"){
    spookySound.play()
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 2
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 2
    }
    if(keyDown("space")){
      ghost.velocityY = -7
    }
    ghost.velocityY = ghost.velocityY +0.7
    spawndoor()
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.Y > 600){
      ghost.destroy()
     
      gameState = "end"
    }
    drawSprites()
  }
  if(gameState == "end"){
    fill ("red")
    textSize(30);
    text("GAME OVER", 250,250)
   
 
  }    
  
  

}
