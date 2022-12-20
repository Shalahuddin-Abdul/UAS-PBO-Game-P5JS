var wCanvas = 400
var hCanvas = 400
var bgColor = '#43B047'
var defEntityColor = '#049CD8'
let ent

function setup() {
  createCanvas(wCanvas, hCanvas);
}

function draw() {
  background(bgColor);
  ent = new Entity(10, 10, 10, 10)
  ent.show()
}

class Map{
  constructor(width, height){
    this.width = width
    this.height = height
  }
  init(){

  }

  move(){

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
  moveRight(){}
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
  constructor(life, score){
    this.life = life
    this.score = score
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