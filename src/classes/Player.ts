import { textChangeRangeIsUnchanged } from "../../node_modules/typescript/lib/typescript"
import { app, pressedKeys, gameObjects } from "../main"

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

    
    constructor() {
        this.position = { x: 100, y: 100}
        this.velocity = { x: 5, y : 1 }
        this.width = 30,
        this.height = 30
        this.jumpHeight = 20
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
            if (this.position.x < 450) { // move player
                this.position.x += this.velocity.x
            } else { // --- scroll view ---
                for (let platfrom of gameObjects.platforms) {
                    platfrom.position.x -= this.velocity.x
                }
            }
        }

        if (pressedKeys.left) {
            if (this.position.x > 100) {
                this.position.x -= this.velocity.x
            } else {
                for (let platform of gameObjects.platforms) {
                    platform.position.x += this.velocity.x
                }
            }
        }

        if (pressedKeys.up && !this.floating) {
            this.floating = true
            this.velocity.y -= this.jumpHeight
        }

    }

    checkCollisions() {

        for (let platform of gameObjects.platforms) {
            if (this.position.y + this.height <= platform.position.y && this.position.y + this.height + this.velocity.y >= platform.position.y && this.position.x + this.width > platform.position.x && this.position.x < platform.position.x + platform.width) {
                this.velocity.y = 0
                this.floating = false
                // this.position.y = platform.height + platform.position.y - this.height
            } 
        }
    }
}

export default Player