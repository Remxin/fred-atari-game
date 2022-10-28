import { textChangeRangeIsUnchanged } from "../../node_modules/typescript/lib/typescript"
import { app, pressedKeys, gameObjects, informationManager } from "../main"


// CONSTANTS 
const jumpHeight = 30
const velocity = { x: 5, y: 1}
let startPos = { x: 0, y: 0}

interface PlayerInterface {
    position: { x: number, y: number},
    velocity: { x: number, y: number}
    width: number,
    height: number,
    jumpHeight: number
    floating: boolean
}
class Player implements PlayerInterface {
    position: { x: number, y: number }
    velocity: { x: number, y: number }
    height: number
    width: number
    jumpHeight: number
    floating: boolean

    
    constructor(x: number, y: number) {
        startPos = { x, y}
        this.position = { x, y}
        this.velocity = velocity
        this.width = 30,
        this.height = 30
        this.jumpHeight = jumpHeight
        this.floating = true
    }

    draw() {
        app.c.fillStyle = "red"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.captureMovement()
        this.checkCollisions()
 
        if (this.position.y + this.height + this.velocity.y <= app.canvas.height) {
            this.position.y += this.velocity.y
            this.velocity.y += app.gravity
        } else {
            this.velocity.y = 0
            this.position.y = app.canvas.height - this.height
            this.floating = false
        }
    }

    captureMovement() {
        // right
        if (pressedKeys.right) {
            
            let isCollision = false
            for (let gameObj of gameObjects.collidable) {
                if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y >= gameObj.position.y && this.position.y + this.height <= gameObj.position.y + gameObj.height) {
                    isCollision = true
                    console.log('jest')
                    if (gameObj.type === "platform") {
                        this.position.x = gameObj.position.x - this.width - 1
                    
                    } else if (gameObj.type === "enemy") {
                        this.die()
                    }
                    break
                }
                
            }
            // if no collision
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x += this.velocity.x
                if (this.position.x < 450) { // move player
                    this.position.x += this.velocity.x
                } else { // --- scroll view ---
                    for (let platfrom of gameObjects.collidable) {
                        platfrom.position.x -= this.velocity.x
                    }
                }
            }
        }
        // left
        if (pressedKeys.left) {
            let isCollision = false
            for (let gameObj of gameObjects.collidable) {
                if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y >= gameObj.position.y && this.position.y + this.height <= gameObj.position.y + gameObj.height) {
                    console.log('wchodzi');
                    
                    isCollision = true
                        if (gameObj.type === "platform") {
                            this.position.x = gameObj.position.x + gameObj.width + 1
                        } else if (gameObj.type === "enemy") {
                            this.die()
                        }
                        break
                } 
                
            }
            
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x -= this.velocity.x
                if (this.position.x > 100) {
                    this.position.x -= this.velocity.x
                } else {
                    for (let platform of gameObjects.collidable) {
                        platform.position.x += this.velocity.x
                    }
                }
            }
        }

        // jumping
        if (pressedKeys.up && !this.floating) {
            this.floating = true
            this.velocity.y -=  this.jumpHeight       
        }
        

    }

    checkCollisions() {
        for (let gameObj of gameObjects.collidable) {
            // dropping down collision 
            if (this.position.y + this.height <= gameObj.position.y && this.position.y + this.height + this.velocity.y >= gameObj.position.y && this.position.x + this.width > gameObj.position.x && this.position.x < gameObj.position.x + gameObj.width) {
                if (gameObj.type === "platform") {
                    this.velocity.y = 0
                    this.floating = false
                } else if (gameObj.type === "enemy") {
                    this.die()
                }
                // this.position.y = platform.height + platform.position.y - this.height
            } 
            // bottom collision 
            
            
            
            if (this.position.y + this.velocity.y < gameObj.position.y + gameObj.height && this.position.y + this.height > gameObj.position.y && this.position.x + this.width > gameObj.position.x && this.position.x < gameObj.position.x + gameObj.width) {
                this.position.y = gameObj.position.y + gameObj.height
                this.velocity.y = 1
            }
            
        
            
           
        }
    }

    die() {
        this.position.x = startPos.x
        this.position.y = startPos.y

        informationManager.updateLives(informationManager.lives.value - 1)
    }
}

export default Player