var Play = 1
var End = 0
var net, fish, coral, fishImg, netImg, coralImg, backgroundImg, health, score, coralsGroup
var gameState = Play;
function preload(){
  netImg = loadImage("Net.png")
  fishImg = loadImage("Weirdfish.png")
  coralImg = loadImage("Coral.png")
  backgroundImg = loadImage("background.png")
  
}
function setup() {
  createCanvas(800,400);
  
 background1 = createSprite(400, 200, 800, 400)
 background1.addImage(backgroundImg)
 background1.scale = 2
 background1.velocityX = -5
 net = createSprite(50,220)
 net.scale = 0.2
 net.addImage(netImg)
 fish = createSprite(320,350)
 fish.addImage(fishImg)
 fish.scale = 0.1
 coral = createSprite(400,150,100,40)
 coral.visible = false
 
 coral.rotation = 270
 coral.scale = 0.5
 ib1 = createSprite(0, 200, 10, 400)
 ib1.visible = false
 ib2 = createSprite(800, 200, 10, 400)
 ib2.visible = false
 ib3 = createSprite(400, 5,800,10)
 ib3.visible = false
 ib4 = createSprite(400, 395, 800, 10)
 ib4.visible = false
 health = 100
 score = 0
 coralsGroup = new Group()
  // createSprite(400, 200, 50, 50);
}


function draw() {
  background("black")
  playerControls()
  if (gameState === Play) {
    net.y = fish.y
    fish.collide(ib1)
    fish.collide(ib2)
    fish.collide(ib3)
    fish.collide(ib4)
    if(background1.x < 0){
      background1.x = 1000
    }
    if (fish.collide(coral) === true) {
      gameState = End
      
    }
    score = score + Math.round(getFrameRate()/60);
    background1.velocityX = -(6 + 2*score/100);
    spawncorals()
    if (coralsGroup.isTouching(fish)){
      gameState = End
      background("black")
    }
    else if (net.isTouching(fish)){
      gameState = End
    }
  }
  else if (gameState === End){
    background1.velocityX = 0 
    coralsGroup.setVelocityXEach = 0
    coralsGroup.setLifetimeEach(-1);
    background("black")
    stroke("orange")
    textSize(20)
    text("GAME OVER",400,200)
  }
  drawSprites()
  stroke("orange")
  text("Score:"+score ,700,50)
}
function playerControls() {
  if (keyIsDown(UP_ARROW)) {
    fish.y -= 5
  }

  if (keyIsDown(DOWN_ARROW)) {
    fish.y += 5
  }
}

function spawncorals() {
  if(frameCount % 60 === 0) {
    var rand = Math.round(random(100,165))
    var rand1 = Math.round(random(700,800))
    var coralob = createSprite(rand1,rand,10,40);
    coralob.addImage(coralImg)
    coralob.velocityX = -(6 + 3*score/100);
    coralob.scale = 0.5;
    coralob.lifetime = 300;
    coralsGroup.add(coralob);
    coralob.debug = true
    coralob.setCollider("rectangle", 0, +40,coralob.width, coralob.height-170)
  }
}

