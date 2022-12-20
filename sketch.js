var wCanvas = 400
var hCanvas = 400
var bgColor = '#43B047'
var defEntityColor = '#049CD8'
let ent
let ply
let map1

function setup() {
  createCanvas(wCanvas, hCanvas);
}

function draw() {
  background(bgColor);
  ply = new Player(20, 20, 10, 10, 3, 0)
  ply.show()
  

  map1 = new Map(wCanvas, hCanvas)
  // map1.init()

  if(keyIsPressed === true){
    if (keyCode === RIGHT_ARROW){
      ply.moveRight()
    }
    
  }
}

class Map{
  constructor(width, height){
    this.width = width
    this.height = height
  }
  init(){
    color('#049CD8')
    rect(0, 0, this.width, this.height)
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
  constructor(height, width, x, y){
    this.height = height
    this.width = width
    this.x = x
    this.y = y
  }

  show(){
    color(defEntityColor)
    circle(this.x, this.y, this.width, this.height)
  }

  attack(){}
  moveRight(){
    if (this.x>this.width)
      this.x=0;
    else
      this.x+=10;}
  moveLeft(){}
  moveDown(){}
  moveUp(){}
}

class Monster extends Entity{
  constructor(life, color, effect, type){
    this.life = life
    this.color = color
    this.effect = effect
    this.type = type
  }

  moveRandom(){}
  saveScore(){}
}

class Player extends Entity{
  constructor(w, h, x, y, life, score){
    super(w, h, x, y)
    this.life = life
    this.score = score
  }

  show(){
    color(defEntityColor)
    ellipse(this.x, this.y, this.w, this.h)
    // circle(20, 20, 10, 10)
  }
  
  increaseScore(){
    //if y axis mentok map, score++
    this.score++
  }

  calculateLife(){
    //if die, reset ke x,y = 0 di level itu
    //if life<3 = game over
  }

  saveScore(){}

}
