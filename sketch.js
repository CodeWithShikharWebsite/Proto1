// Space Invasion
//to create all the obstacles in the game
var player , playerImg
var alienBoss , alienBossImg
var alien1 , alien1Img
var alien2 , alien2Img
var alien3 , alien3Img
var asteoroid , asteoroidImg
var bullet , bulletImg
var space , spaceImg
var star , starImg
var wall1 , wall2 , wall3 , wall4
var PLAY =1;
var END =0;
var gameState = PLAY;
var score = 0;
var bulletg , alien1g , alien2g , alien3g , asteoroidg , alienBossg
var gameOver , gameOverImg , restart , restartImg
var life =10;
var Ammo = 250;
var missile , missileImg , missileg
var missileAmmo = 0;
//to load the images
function preload(){
  spaceImg = loadImage("Space.png")
  playerImg = loadImage("Player.png")
  bulletImg = loadImage("Bullet.png")
  starImg = loadImage("Star3.png")
  asteoroidImg = loadImage("Asteoroid.png")
  alien1Img = loadImage("Alien1.png")
  alien2Img = loadImage("Alien2.png")
  alien3Img = loadImage("Alien3.png")
  gameOverImg = loadImage("GameOver.png")
  restartImg = loadImage("Restart.png")
  alienBossImg = loadImage("Alien Boss.png")
  missileImg = loadImage("Missile.png")
}

//setting up the enviornment
function setup(){
  createCanvas(400,500)
  
  //crating space
  space = createSprite(200,250)
  space.addImage(spaceImg)
  space.scale = 2.4
  space.velocityY = 3
  
  //creating a cool lookinf player
  player = createSprite(185,470,10,10)
  player.addImage(playerImg)
  player.scale = 0.13
  
  //making walls so player don't gets of the canvas
  wall1 = createSprite(1,250,1,500)
  wall2 = createSprite(200,1,400,1)
  wall3 = createSprite(399,250,1,500)
  wall4 = createSprite(200,499,400,1)
  
  //displaying game status 
  gameOver = createSprite(200,250)
  gameOver.addImage(gameOverImg)
  
  //to restart the game
  restart = createSprite(200,330,20,20)
  restart.addImage(restartImg)
  restart.scale = 0.2
  
  //making groups
  missileg = new Group();
  bulletg = new Group();
  asteoroidg = new Group();
  alien1g = new Group();
  alien2g = new Group();
  alien3g = new Group();
  alienBossg = new Group();
}
//drawing all the things
function draw(){
  //making a background
background("white")
  
  wall1.visible = false
  wall2.visible = false
  wall3.visible = false
  wall4.visible = false
  
  
//what will happen if the gamestate is in play
  if(gameState === PLAY){
    
    //creating infinity space
    if(space.y>350){
  space.y = 250
} 
  
    //moving player
  if(keyDown("W")||keyDown("up")){
    player.y = player.y-3.5
  }
  
  if(keyDown("A")||keyDown("left")){
    player.x = player.x-3.5
  }
  
  if(keyDown("S")||keyDown("down")){
    player.y = player.y+3.5
  }
  
  if(keyDown("D")||keyDown("right")){
    player.x = player.x+3.5
  }

  //launching bullets
  if(keyDown("space")){
  spawnbullets();
    Ammo = Ammo-1
  }
    
  if(Ammo === 0){
    //to show how to reload when the ammos are over
    text("Press R to reload",170,50)
  }
  
    //to reload ammos
  if(keyDown("R")){
    Ammo = 250
  }
  //making it so that it don't gets out of screen
  player.bounce(wall1)
  player.bounce(wall2)
  player.bounce(wall3)
  player.bounce(wall4)
  //setting a collidr for player
  player.setCollider("circle",10,10,50)
  
    //to show collider
  if(keyDown("T")){
    player.debug = true
    missileg.debug = true
    alienBossg.debug = true
    bulletg.debug = true
    alien1g.debug = true
    alien2g.debug = true
    alien3g.debug = true
  }  
  
    //to hide collider
  if(keyDown("F")){
    player.debug = false
    missileg.debug = false
    alienBossg.debug = false
    bulletg.debug = false
    alien1g.debug = false
    alien2g.debug = false
    alien3g.debug = false
  }
    //to launch missiles
   if(keyDown("M")&& missileAmmo>0){
     missilelaunch();
     missileAmmo = missileAmmo - 1
   } 
    
  gameOver.visible = false
  restart.visible = false
  
  //making all functions working
  spawnStars();
  spawnasteoroids();
  spawnalien1();
  spawnalien2();
  spawnalien3();
  destroyer();
  summonboss();
  missilegive();
  
//when to remove life
    if(player.isTouching(asteoroidg)||player.isTouching(alien1g)||player.isTouching(alien2g)||player.isTouching(alien3g)||player.isTouching(alienBossg)){
      
    life = life-1
      
    }
    
    
    //what to do when life ends
    if(life === 0){
      gameState = END
    }
  }
 
  //what will happen if the game is in End state
  if(gameState === END){
   
    //destroying everything when the game Ends
  alienBossg.destroyEach(); 
  alien1g.destroyEach();
  alien2g.destroyEach();
  alien3g.destroyEach();
  bulletg.destroyEach();
  asteoroidg.destroyEach();
  space.velocityY = 0  
  star.destroy(); 
  gameOver.visible = true
  restart.visible = true
  space.visible = false
  player.visible = false
    
    //to restart the game
   if(mousePressedOver(restart)){
     reset();
   } 
    
    //to text Your score when the game ends
    text("Your Score: "+score ,165,290)
  }

  //to draw everything
  drawSprites();
      fill("white")
  stroke("cyan")
  textSize(15)
  text("score :"+score,330,30)
  
  //making life
  text("Life :"+life ,10,30)
  
  //drawing out ammos
  text("AMMO : "+Ammo,170,30)
  
  //when to show how to reload
  if(Ammo<0){
    text("Press R to reload",10,150)
  }
  text("Missile Ammo :"+missileAmmo,10,50)
  
  //to show that you don't have any missiles
  if(missileAmmo < 1 && keyDown("M")){
    text("You don't have any missiles!",10,90)
  }
  
  text("Press space to shoot lasers",200,50)
  text("Press M to shoot Missiles",10,70)
  text("Press T to debug",10,110)
  text("Press F to undebug",10,130)
  
}

//to spawn stars
function spawnStars(){
  if(frameCount%20 === 0){
    star = createSprite(Math.round(random(20,380)),-10)
    star.addImage(starImg)
    star.velocityY = 2
    star.scale = 0.4
    star.lifetime = 250
  }
}
//to spawn laser bullets
function spawnbullets(){
 if(Ammo>0){ 
  bullet = createSprite(player.x,player.y)
  bullet.addImage(bulletImg)
  bullet.scale = 0.045
  bullet.velocityY = -4
  bullet.lifetime = 125
  bulletg.add(bullet)
  }
}

//to spawn asteoroids
function spawnasteoroids(){
  if(frameCount%80 === 0){
    asteoroid = createSprite(Math.round(random(20,380))-10)
    asteoroid.addImage(asteoroidImg)
    asteoroid.scale = 0.2
    asteoroid.velocityY = 2.5
    asteoroid.lifetime = 200
    asteoroidg.add(asteoroid)
  }
}

//to spawn alien#1
function spawnalien1(){
  if(frameCount%90===0){
  alien1 = createSprite(Math.round(random(20,380))-10)
  alien1.addImage(alien1Img)
  alien1.velocityY = 3.5
  alien1.scale = 0.15
  alien1g.add(alien1)
  }
}

//to spawn alien#2
function spawnalien2(){
  if(frameCount%95===0){
  alien2 = createSprite(Math.round(random(20,380))-10)
  alien2.addImage(alien2Img)
  alien2.velocityY = 3.5
  alien2.scale = 0.18
  alien2g.add(alien2)
  }
}

//to spawn alien#3
function spawnalien3(){
  if(frameCount%100===0){
  alien3 = createSprite(Math.round(random(20,380))-10)
  alien3.addImage(alien3Img)
  alien3.velocityY = 3.5
  alien3.scale = 0.15
  alien3g.add(alien3)
  }
}

// to destroy everything when the bullet touches the alien or asteoroid
function destroyer(){
  if(bulletg.isTouching(alien1g)){
    bulletg.destroyEach();
    alien1g.destroyEach();
    score = score + 1
  }
    
  if(bulletg.isTouching(alien2g)){
    bulletg.destroyEach();
    alien2g.destroyEach();
    score = score + 2
  }
  
  if(bulletg.isTouching(alien3g)){
    bulletg.destroyEach();
    alien3g.destroyEach();
    score = score + 3
  }
  
    if(bulletg.isTouching(asteoroidg)){
    bulletg.destroyEach();
    asteoroidg.destroyEach();
    score = score + 1
  }
  
  if(missileg.isTouching(alienBossg)){
    missileg.destroyEach();
    alienBossg.destroyEach();
    score = score+10
     missileAmmo = missileAmmo+1
    life = life+2
  }
  
   if(missileg.isTouching(alien1g)){
    missileg.destroyEach();
    alien1g.destroyEach();
    score = score + 1
  }
    
  if(missileg.isTouching(alien2g)){
    missileg.destroyEach();
    alien2g.destroyEach();
    score = score + 2
  }
  
  if(missileg.isTouching(alien3g)){
    missileg.destroyEach();
    alien3g.destroyEach();
    score = score + 3
  }
  
    if(missileg.isTouching(asteoroidg)){
    missileg.destroyEach();
    asteoroidg.destroyEach();
    score = score + 1
  }
}

//to reset the game
function reset(){
  gameState = PLAY;
  gameOver.visible = false
  restart.visible = false
  score = 0
  space.visible = true
  player.visible = true
  life = 10
  missileAmmo = 0
  Ammo = 250
}

//to summon the epic boss
function summonboss(){
  
  if(frameCount%800 === 0){
    alienBoss = createSprite(200,120,50,50)
    alienBoss.addImage(alienBossImg)
    alienBoss.scale = 0.25
    alienBossg.add(alienBoss)

  }
}
 
//to give missiles to player
function missilegive(){
  if(frameCount%200 === 0){
  missileAmmo = missileAmmo +1
  }
}

//to launch the missiles
function missilelaunch(){
  
  missile = createSprite(player.x,player.y)
  missile.addImage(missileImg)
  missile.scale = 0.4
  missile.velocityY = -3
  missile.lifetime = 166
  missileg.add(missile)
  missile.setCollider("point")
}