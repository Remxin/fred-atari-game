import { textChangeRangeIsUnchanged } from "../../node_modules/typescript/lib/typescript"
import { app, pressedKeys, gameObjects, informationManager, renderer } from "../main"
import Stone from "./Stone"


// CONSTANTS 
const jumpHeight = 30
const velocity = { x: 5, y: 1}
let startPos = { x: 0, y: 0}
const size = { w: 30, h: 50}

interface PlayerInterface {
    position: { x: number, y: number},
    velocity: { x: number, y: number}
    width: number,
    height: number,
    jumpHeight: number
    floating: boolean
    turnDirection: "left" | "right"
    stoneThrown: boolean
    lastPos: { x: number, y: number }
    floatingDirection: "" | "left" | "right"
}
class Player implements PlayerInterface {
    position: { x: number, y: number }
    velocity: { x: number, y: number }
    height: number
    width: number
    jumpHeight: number
    floating: boolean
    turnDirection: "left" | "right"
    stoneThrown: boolean
    lastPos: { x: number, y: number }
    floatingDirection: "" | "left" | "right"

    
    constructor(x: number, y: number) {
        startPos = { x, y}
        this.position = { x, y}
        this.velocity = velocity
        this.width = size.w
        this.height = size.h
        this.jumpHeight = jumpHeight
        this.floating = true
        this.floatingDirection = ""
        this.turnDirection = "right"
        this.stoneThrown = false
        this.lastPos = { x: 0, y: 0}
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
        this.manageWeaponUsage()
        this.blockOptions()
        // right
        if (pressedKeys.right && !this.floating) {
            this.turnDirection = "right"
            let isCollision = false
            for (let gameObj of gameObjects.collidable) {
                if (gameObj.type === "platform") {

                    if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y >= gameObj.position.y && this.position.y + this.height <= gameObj.position.y + gameObj.height) {
                        isCollision = true
                        console.log('jest')
                
                        this.position.x = gameObj.position.x - this.width - 1
                        

                        
                     
                        break
                    }
                }

                
            }
            // if no collision
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x += this.velocity.x
                if (this.position.x < 450) { // move player
                    this.position.x += this.velocity.x
                } else { // --- scroll view ---
                    for (let collidable of gameObjects.collidable) {
                        collidable.position.x -= this.velocity.x
                    }
                    for (let playerFriendlyObj of gameObjects.playerFriendly) {
                        playerFriendlyObj.position.x -= this.velocity.x
                    }
                }
            }
        }
        // left
        if (pressedKeys.left && !this.floating) {
            this.turnDirection = "left"
            let isCollision = false
            for (let gameObj of gameObjects.collidable) {
                if (gameObj.type === 'platform') {
                    if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y >= gameObj.position.y && this.position.y + this.height <= gameObj.position.y + gameObj.height) {
                        isCollision = true
                        this.position.x = gameObj.position.x + gameObj.width + 1
                        break
                    } 
                }
                
            }
            
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x -= this.velocity.x
                if (this.position.x > 100) {
                    this.position.x -= this.velocity.x
                } else { // scroll view
                    for (let platform of gameObjects.collidable) {
                        platform.position.x += this.velocity.x
                    }

                    for (let playerFriendlyObj of gameObjects.playerFriendly) {
                        playerFriendlyObj.position.x += this.velocity.x
                    }
                }
            }
        }

        // --- jumping ---
        if (pressedKeys.up && !this.floating) {
            this.floating = true
            if (pressedKeys.left && !pressedKeys.right) this.floatingDirection = "left"
            else if (pressedKeys.right && !pressedKeys.left) this.floatingDirection = "right"
            else this.floatingDirection = ""
            this.velocity.y -=  this.jumpHeight       
        }

        if (this.floating && this.floatingDirection === "left") {
            this.position.x -= this.velocity.x
        } else if (this.floating && this.floatingDirection === "right") {
            this.position.x += this.velocity.x
        }

        if (!this.floating) {
            this.floatingDirection = ""
        }
        // -----------------
        

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
        this.velocity.y = velocity.y
        this.floatingDirection = ""

        // console.log(renderer.playerAbstractionPos.x, this.position.x) 
        informationManager.updateLives(informationManager.lives.value - 1)
    }

    manageWeaponUsage() {
        if (pressedKeys.f && !this.stoneThrown) {
            
            this.stoneThrown = true

            const stone = new Stone()
            // stone.draw()
            gameObjects.playerFriendly.push(stone)
            informationManager.updateStones(informationManager.stones.value - 1)
        }
    }

    blockOptions() {
        if (this.position.y > this.lastPos.y) {
            this.floating = true
        }
        this.lastPos.y = this.position.y
    }
}

export default Player