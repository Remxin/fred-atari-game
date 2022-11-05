import Enemy from "./Enemy";
import { app, spriteSheet } from "../main";
import ImageMapper from "./ImageMapper";

const CONSTANTS = {
    velocity: { x: 3, y: 1},
    stayTimeout: 50,
    animBreakPoint: 10
}

interface FrogInterface {
    id: string
    width: number
    stayTimeout: number
    position: { x: number, y: number}
    movementRange: { min: number, max: number }
    velocity: { x: number, y: number }
    abstractPos: { x: number, y: number }
    type: "enemy"
    class: "frog"
    isFloating: boolean
    movingRight: boolean
    anim: { phase: number, incrementer: number}
    isMoving: boolean
    graphics: { cords: { x: number, y: number, height: number, width: number }}
}
class Frog extends Enemy implements FrogInterface{
    id: string
    movementRange: { min: number; max: number; };
    stayTimeout: number
    velocity: { x: number, y: number }
    type: "enemy";
    class: "frog"
    isFloating: boolean
    abstractPos: {x: number, y: number}
    movingRight: boolean;
    anim: { phase: number, incrementer: number}
    isMoving: boolean
    graphics: { cords: { x: number, y: number, height: number, width: number }}
    

    constructor(x: number, y: number, movementMin: number, movementMax: number) {
        super(x, y)
        this.width = 45
        this.height = 45
        this.type = "enemy"
        this.class = "frog"
        this.velocity = CONSTANTS.velocity
        this.isFloating = true
        this.isMoving = false
        this.stayTimeout = CONSTANTS.stayTimeout
        this.movementRange = { min: movementMin, max: movementMax}
        this.abstractPos = { x: 0, y: 0}
        this.movingRight = true   
        this.isMoving = false 
        this.anim = { phase: 0, incrementer: 0}
    }

    update() {
         if (this.position.y + this.height + this.velocity.y <= app.canvas.height) {
            this.position.y += this.velocity.y
            this.velocity.y += app.gravity
            this.isFloating = true
         } else {
            this.velocity.y = 0
            this.position.y = app.canvas.height - this.height
            this.isFloating = false
         }

         
         // force frog to move right
         if (this.abstractPos.x <= this.movementRange.min && this.stayTimeout === 0) {
            // console.log('right')
            this.movingRight = true
            this.isMoving = false
            this.stayTimeout = CONSTANTS.stayTimeout
         }

         // force frog to move left
         if (this.abstractPos.x >= this.movementRange.max && this.stayTimeout === 0) {
            this.movingRight = false
            this.isMoving = false
            this.stayTimeout = CONSTANTS.stayTimeout
         }

         if (this.stayTimeout > 0) {
            // this.isMoving = false
            this.stayTimeout -= 1
         } else {
            this.isMoving = true
         }
         // movement
         if (this.movingRight && this.stayTimeout === 0) {
            this.abstractPos.x += this.velocity.x
            this.position.x += this.velocity.x
         } 

         
         if (!this.movingRight && this.stayTimeout === 0) {
            this.abstractPos.x -= this.velocity.x
            this.position.x -= this.velocity.x
         }

        // kill player on collision
        const player = app.player
        if (this.position.x <= player.position.x + player.width && this.position.x + this.width >= player.position.x && this.position.y >= player.position.x && this.position.y + this.height<= player.position.y + player.height) {
            player.die()
        }

        if(this.isMoving) {
         this.anim.incrementer += 1
        } else {
         this.anim.incrementer += 0.7
        }

        if (this.anim.incrementer >= CONSTANTS.animBreakPoint) {
         this.anim.incrementer = 0
         this.anim.phase += 1
        }


      //   app.c.fillStyle = "orange"
        this.graphics = { cords: ImageMapper.getFrogImageCords(!this.movingRight, this.isMoving, this.anim.phase)}
      //   app.c.fillRect(this.position.x ,this.position.y, this.width, this.height)
      app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

}

export default Frog