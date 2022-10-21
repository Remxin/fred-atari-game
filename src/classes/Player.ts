import { textChangeRangeIsUnchanged } from "../../node_modules/typescript/lib/typescript"
import { app, pressedKeys, gameObjects } from "../main"

// CONSTANTS 
const jumpHeight = 30
const velocity = { x: 5, y: 1}

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
    blocks: { right: boolean, left: boolean}

    
    constructor(x: number, y: number) {
        this.position = { x, y}
        this.velocity = velocity
        this.width = 30,
        this.height = 30
        this.jumpHeight = jumpHeight
        this.floating = true
        this.blocks = { right: false, left: false}
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
            for (let platform of gameObjects.platforms) {
                if (this.position.x + this.width + this.velocity.x > platform.position.x && this.position.x < platform.position.x + platform.width && this.position.y <= platform.position.y && this.position.y + this.height >= platform.position.y + platform.height) {
                    isCollision = true
                    this.position.x = platform.position.x - this.width
                }
            }
            // if no collision
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x += this.velocity.x
                if (this.position.x < 450) { // move player
                    this.position.x += this.velocity.x
                } else { // --- scroll view ---
                    for (let platfrom of gameObjects.platforms) {
                        platfrom.position.x -= this.velocity.x
                    }
                }
            }
        }

        // left
        if (pressedKeys.left) {
            
            let isCollision = false
            for (let platform of gameObjects.platforms) {
                if (this.position.x - this.velocity.x < platform.position.x + platform.width && this.position.x + this.width > platform.position.x && this.position.y <= platform.position.y && this.position.y + this.height >= platform.position.y + platform.height) {
                    this.position.x = platform.position.x + platform.width
                    isCollision = true
                } 
            }
            
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x -= this.velocity.x
                if (this.position.x > 100) {
                    this.position.x -= this.velocity.x
                } else {
                    for (let platform of gameObjects.platforms) {
                        platform.position.x += this.velocity.x
                    }
                }
            }
        }

        // jumping
        if (pressedKeys.up && !this.floating) {
            this.floating = true
           
            let isCollision = false
            for (let platform of gameObjects.platforms) {
                if (this.position.x + this.width >= platform.position.x && this.position.x <= platform.position.x + platform.width && this.position.y - (this.jumpHeight*app.gravity) <= platform.position.y + platform.height && this.position.y + this.height - this.jumpHeight >= platform.position.y) {
                    this.position.y = platform.position.y + platform.height
                    // this.velocity.y -= platform.position.y + platform.height
                    isCollision = true
                }
            }

            if (!isCollision) {
                this.velocity.y -=  this.jumpHeight
            }
            
        }

    }

    checkCollisions() {

        for (let platform of gameObjects.platforms) {
            // dropping down collision 
            if (this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.position.x + this.width > platform.position.x && this.position.x < platform.position.x + platform.width) {
                this.velocity.y = 0
                this.floating = false
                // this.position.y = platform.height + platform.position.y - this.height
            } 
            // bottom collision (implemented on jump)
      
    
            
        
            
           
        }
    }
}

export default Player