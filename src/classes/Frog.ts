import Enemy from "./Enemy";
import { app } from "../main";

const CONSTANTS = {
    velocity: { x: 5, y: 1},
    stayTimeout: 40
}

interface FrogInterface {
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
}
class Frog extends Enemy implements FrogInterface{
    movementRange: { min: number; max: number; };
    stayTimeout: number
    velocity: { x: number, y: number }
    type: "enemy";
    class: "frog"
    isFloating: boolean
    abstractPos: {x: number, y: number}
    movingRight: boolean;

    constructor(x: number, y: number, movementMin: number, movementMax: number) {
        super(x, y)
        this.width = 20
        this.height = 20
        this.type = "enemy"
        this.class = "frog"
        this.velocity = CONSTANTS.velocity
        this.isFloating = true
        this.stayTimeout = CONSTANTS.stayTimeout
        this.movementRange = { min: movementMin, max: movementMax}
        this.abstractPos = { x: 0, y: 0}
        this.movingRight = true    
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
            this.movingRight = true
            this.stayTimeout = CONSTANTS.stayTimeout
         }

         // force frog to move left
         if (this.abstractPos.x >= this.movementRange.max && this.stayTimeout === 0) {
            this.movingRight = false
            this.stayTimeout = CONSTANTS.stayTimeout
         }

         if (this.stayTimeout > 0) {
            this.stayTimeout -= 1
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
        app.c.fillStyle = "orange"
        app.c.fillRect(this.position.x ,this.position.y, this.width, this.height)
    }

}

export default Frog