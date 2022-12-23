var wCanvas = 400
var hCanvas = 400
var bgColor = '#43B047'
var defEntityColor = '#049CD8'
var enemyColor = '#E52521'

var gravity = 9
var jumpHeight = 20


class Map{
  constructor(width, height){
    this.width = width
    this.height = height
  }
	init1(){
    // image(firstScene,0,0,wCanvas,hCanvas)
    fill(255, 255, 0);
    textAlign(CENTER)
    textSize(15)
    text("Level 1", 30, 20);
    text("Score", wCanvas*.45, 20);
    text(player.score, wCanvas*.55, 20);
    textSize(15)
    text("Life", wCanvas-45, 20);
    text(player.life, wCanvas-15, 20);
    fill(platformColor)
    rect(this.x, this.y, this.w, this.h)
  }
  	init2(){
    // image(firstScene,0,0,wCanvas,hCanvas)
    fill(255, 255, 0);
    textAlign(CENTER)
    textSize(15)
    text("Level 2", 30, 20);
    text("Score", wCanvas*.45, 20);
    text(player.score, wCanvas*.55, 20);
    textSize(15)
    text("Life", wCanvas-45, 20);
    text(player.life, wCanvas-15, 20);
    fill(platformColor)
    rect(this.x+150, this.y, this.w/3, this.h)
  }
  	init3(){
    // image(firstScene,0,0,wCanvas,hCanvas)
    fill(255, 255, 0);
    textAlign(CENTER)
    textSize(15)
    text("Level 3", 30, 20);
    text("Score", wCanvas*.45, 20);
    text(player.score, wCanvas*.55, 20);
    textSize(15)
    text("Life", wCanvas-45, 20);
    text(player.life, wCanvas-15, 20);
    fill(platformColor)
    rect(this.x, this.y, this.w/3, this.h)
 
	gameFinish(){
    fill(255,255,255)
    rect(0,0,wCanvas,hCanvas)
    fill(227, 101, 91)
    textSize(50)
    textAlign(CENTER)
    text("Finish",200, 200)
    textSize(12)
    textAlign(CENTER)
    text("'R' untuk mengulang.",200, 250)
    text("Score anda",190, 300)
    text(player.score,230, 300)
  }
	change(){
    if (scene == 1 && player.life >0){
      scene = 2
      player.x = wCanvas*.07
      player.y = hCanvas
    }else if(scene == 2 && player.life >0){
      scene = 3
    }else if(scene = 3 && player.life > 0){
      scene = 100
    }
    player.x = wCanvas*.07
    player.y = hCanvas
  }
  check(player){
    if(scene == 1){
      return player.x > this.x && player.x < this.x + this.w && player.y < this.y + this.h && player.y > this.y
    }else if(scene == 2){
      return player.x > this.x+150 && player.x < this.x+150 + this.w/3 && player.y < this.y +this.h && player.y > this.y
    }else if(scene == 3){
      return player.x > this.x && player.x < this.x + this.w/3 && player.y < this.y + 50 && player.y > this.y
    }
    
  }
	
	gameOver(){
    fill(0,0,0)
    rect(0,0,wCanvas,hCanvas)
    fill(227, 101, 91)
    textSize(50)
    textAlign(CENTER)
    text("Game Over",200, 200)
    textSize(12)
    textAlign(CENTER)
    text("Press 'R' to play again.",200, 250)
  }

  change(){

  }
}

class Level{
  constructor(currentLevel, latestLevel, maxLevel){
    this.currentLevel = currentLevel
    this.latestLevel = latestLevel
    this.maxLevel = maxLevel
  }

  setLevel(){
    if (this.currentLevel<this.latestLevel){
      this.currentLevel++
    }else if (this.currentLevel>this.latestLevel){
      this.currentLevel = this.latestLevel
    }
  }

  getCurrentLevel(){
    return this.currentLevel
  }
}

class Entity{
  constructor(h, w, x, y, vel, color){
    this.h = h
    this.w = w
    this.x = x
    this.y = y
    this.vel = vel
    this.color = color
  }

  moveRight(){
    if (this.x+this.vel>wCanvas-(this.w/2))
      this.x=wCanvas-(this.w/2);
    else
      this.x+=(this.vel/2);
  }

  moveLeft(){
    if (this.x-this.vel<0+(this.w/2))
      this.x=0+(this.w/2);
    else
      this.x-=(this.vel/2);
  }
  moveDown(){
    if (this.y+this.vel>hCanvas-(this.h/2))
      this.y=hCanvas-(this.h/2);
    else
      this.y+=(this.vel/2);
  }
  moveUp(){
    if (this.y+this.vel<0+(this.h/2))
      this.y=0+(this.h/2);
    else
      this.y-=(this.vel/2);
  }
  
  attack(){}
}

class Player extends Entity{
  constructor(w, h, x, y, life, score){
    super(w, h, x, y)
    this.life = life
    this.score = score
  }

  show(){
    fill(this.color);
    ellipse(this.x, this.y, this.w, this.h);
    noStroke();
  }
  
  update(){
    this.y += this.vel;
    this.vel = lerp(this.vel, gravity, 0.05);
    this.y = Math.max(this.h/2, Math.min(this.y, hCanvas-this.h/2))
  }

  jump(){
    if(this.y>hCanvas-this.w)
      this.vel = -jumpHeight
  }
  
  increaseScore(){
    //if y axis mentok map, score++
    this.score++
  }

  calculateLife(){
    //if die, reset ke x,y = 0 di level itu
    //if life<3 = game over
    if(this.life>0){
      this.life--
    }
    if(this.life<=0){
      gameOver()
    }
    this.x = 0
    this.y= hCanvas-10
  }

  saveScore(){}
}

class Monster extends Entity{
  constructor(w, h, x, y, vel, color, life, effect, type){
    super(w, h, x, y, vel, color)
    this.life = life
    this.effect = effect
    this.type = type
  }
	show(){
    fill(this.color)
    rect(this.x, this.y, 20, 20);
  }
	
  moveRandom(){
    this.x += this.vel;
		if(this.x + (this.w/4) >= wCanvas || this.x - (this.w/4) <= 200){
		  this.vel = -this.vel;
	  }
  }
  saveScore(){}
	
	check(player){
    return abs(player.x-this.x) < this.w/4 && abs(player.y-this.y) < this.h/4
  }
}


function setup() {
  createCanvas(wCanvas, hCanvas);
}

var map1 = new Map(wCanvas, hCanvas)
var player = new Player(wCanvas*.07, hCanvas*.07, wCanvas*.07, hCanvas, 10, defEntityColor, 3, 0)
var enemy = new Monster(wCanvas*.07, hCanvas*.07, wCanvas*.97, hCanvas*.95, 3, enemyColor, 1, 0, 0)
var enemy2 = new Monster(wCanvas*.07, hCanvas*.07, wCanvas*.8, hCanvas*.4, 3, enemyColor, 1, 0, 0)
var enemy3 = new Monster(wCanvas*.07, hCanvas*.07, wCanvas*.8, hCanvas*.6, 3, enemyColor, 1, 0, 0)

function draw() {
  background(bgColor);

  if (enemy.check(player)) {
    player.calculateLife()
  }
  enemy.show()
  enemy.moveRandom()

  player.show()
  player.update()
  
  

  if(keyIsPressed){
    if(keyCode === 68){
      player.moveRight()
    }
    if(keyCode === 83){
      player.moveDown()
    }
    if(keyCode === 65){
      player.moveLeft()
    }
    if(keyCode === 87){
      player.jump()
    }
  }
  

  
  // map1.init()

}

function gameOver(){
  rect(0,0,wCanvas,hCanvas)
  fill(227, 101, 91)
  textSize(50)
  textAlign(CENTER)
  text("Game Over",200, 200)
  textSize(12)
  textAlign(CENTER)
  text("Press 'R' to play again.",200, 250)
}
