import { isThisTypeNode, textChangeRangeIsUnchanged } from "../../node_modules/typescript/lib/typescript"
import { app, pressedKeys, gameObjects, informationManager, renderer, player } from "../main"
import Stone from "./Stone"


// CONSTANTS 
const jumpHeight = 30
const velocity = { x: 5, y: 1}
let startPos = { x: 0, y: 0}
const size = { w: 30, h: 50}
const weaponChangeTimeout = 500
const stoneDelayValue = 1000
const viewBreakPoints = { min: 400, max: 800}

interface PlayerInterface {
    position: { x: number, y: number},
    velocity: { x: number, y: number}
    width: number,
    height: number,
    jumpHeight: number
    floating: { isfloating: boolean, direction: "" | "left" | "right", animPhase: number}
    turnDirection: "left" | "right"
    stoneThrown: boolean
    lastPos: { x: number, y: number }
    // floatingDirection: "" | "left" | "right"
    weaponChosen: { timeout: number, type: "stones" | "fire", stoneDelay: number}
}
class Player implements PlayerInterface {
    position: { x: number, y: number }
    velocity: { x: number, y: number }
    height: number
    width: number
    jumpHeight: number
    floating: { isfloating: boolean, direction: "" | "left" | "right", animPhase: number}
    turnDirection: "left" | "right"
    stoneThrown: boolean
    lastPos: { x: number, y: number }
    weaponChosen: { timeout: number, type: "stones" | "fire", stoneDelay: number}

    
    constructor(x: number, y: number) {
        startPos = { x, y}
        this.position = { x, y}
        this.velocity = velocity
        this.width = size.w
        this.height = size.h
        this.jumpHeight = jumpHeight
        this.floating = { isfloating: false, direction: "", animPhase: 1}
        this.turnDirection = "right"
        this.stoneThrown = false
        this.lastPos = { x: 0, y: 0}
        this.weaponChosen = { timeout: 0, type: "stones", stoneDelay: 0}
    }

    draw() {
        app.c.fillStyle = "red"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.captureMovement()
        this.checkCollisions()
        
        if (this.position.y + this.height + this.velocity.y <= app.canvas.height) {
            this.position.y += this.velocity.y
            this.velocity.y += app.gravity
        } else {
            this.velocity.y = 0
            this.position.y = app.canvas.height - this.height
            this.floating.isfloating = false
        }
        this.draw()
    }

    captureMovement() {
        this.manageWeaponUsage()
        this.blockOptions()
        // right
        if (pressedKeys.right && !this.floating.isfloating) {
            this.turnDirection = "right"
            let isCollision = false
            for (let gameObj of gameObjects.collidable) {
                if (gameObj.type === "platform") {

                    if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y >= gameObj.position.y && this.position.y + this.height <= gameObj.position.y + gameObj.height) {
                        isCollision = true
                       
                
                        this.position.x = gameObj.position.x - this.width - 1
                        break
                    }
                }

                
            }
            // if no collision
            if (!isCollision) {
                app.renderer.playerAbstractionPos.x += this.velocity.x
                if (this.position.x < viewBreakPoints.max) { // move player
                    this.position.x += this.velocity.x
                } else { // --- scroll view ---
                    this.paralaxMoveAll('right')
                }
            }
        }
        // left
        if (pressedKeys.left && !this.floating.isfloating) {
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
                if (this.position.x > viewBreakPoints.min) {
                    this.position.x -= this.velocity.x
                } else { // scroll view
                    this.paralaxMoveAll("left")
                }
            }
        }

        // --- jumping ---
        if (pressedKeys.up && !this.floating.isfloating) {
            this.floating.isfloating = true
            if (pressedKeys.left && !pressedKeys.right) this.floating.direction = "left"
            else if (pressedKeys.right && !pressedKeys.left) this.floating.direction = "right"
            else this.floating.direction = ""


            this.velocity.y -=  this.jumpHeight       
        }

        if (this.floating.isfloating && this.floating.direction === "left") {
            renderer.playerAbstractionPos.x -= this.velocity.x

            if (this.position.x < viewBreakPoints.min) {
                this.paralaxMoveAll('left')
            } else { 
                this.position.x -= this.velocity.x
            }
        } else if (this.floating.isfloating && this.floating.direction === "right") {
            renderer.playerAbstractionPos.x += this.velocity.x

            if (this.position.x > viewBreakPoints.max) {
                this.paralaxMoveAll('right')
            } else { 
                this.position.x += this.velocity.x
            }
        }

        if (!this.floating.isfloating) {
            this.floating.direction = ""
        }
        // -----------------
        

    }

    checkCollisions() {
        for (let gameObj of gameObjects.collidable) {
            // dropping down collision 
            if (this.position.y + this.height <= gameObj.position.y && this.position.y + this.height + this.velocity.y >= gameObj.position.y && this.position.x + this.width > gameObj.position.x && this.position.x < gameObj.position.x + gameObj.width) {
                if (gameObj.type === "platform") {
                    this.velocity.y = 0
                    this.position.y = gameObj.position.y - this.height
                    this.floating.isfloating = false
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

        console.log(renderer.playerAbstractionPos.x, this.position.x)
        // descrolling view
        const descrollValue = renderer.playerAbstractionPos.x - this.position.x
        console.log(descrollValue)
        for (let collidableObj of gameObjects.collidable) {
            collidableObj.position.x -= descrollValue
        }
        renderer.playerAbstractionPos.x = startPos.x
        

        // reseting stats
        this.position.x = startPos.x
        this.position.y = startPos.y
        this.velocity.y = velocity.y
        this.floating.direction = ""



        // console.log(renderer.playerAbstractionPos.x, this.position.x) 
        informationManager.updateLives(informationManager.lives.value - 1)
    }

    manageWeaponUsage() {
        if (pressedKeys.e) {
            if (this.weaponChosen.timeout === 0) { // prevent fast weapon changing
                if (this.weaponChosen.type === "stones" && informationManager.oxygen.value > 0) this.weaponChosen.type = "fire"
                else if (this.weaponChosen.type === "fire" && informationManager.stones.value > 0) this.weaponChosen.type = "stones"
                this.weaponChosen.timeout = 1

                setTimeout(() => {
                    this.weaponChosen.timeout = 0
                }, weaponChangeTimeout)
            }
        }
        if (pressedKeys.f) {
            if (this.weaponChosen.type === "stones"  && !this.stoneThrown && this.weaponChosen.stoneDelay === 0) { // using stones
                if (informationManager.stones.value < 1) {
                    return
                }
    
                this.stoneThrown = true
                const stone = new Stone()
                gameObjects.playerFriendly.push(stone)
                informationManager.updateStones(informationManager.stones.value - 1)
    
                if (informationManager.stones.value === 0) {
                    const stoneStack = informationManager.bag.items.find((i) => i.class === "bag stone stack")
                    if (stoneStack) {
                        stoneStack.use()
                    }
                }

                // preventing from spamming stones
                this.weaponChosen.stoneDelay = 1
                setTimeout(() => {
                    this.weaponChosen.stoneDelay = 0
                },  stoneDelayValue)
            } else if (this.weaponChosen.type === "fire") {

            }
        }
    }

    blockOptions() {
        if (this.position.y > this.lastPos.y) {
            this.floating.isfloating = true
        }
        this.lastPos.y = this.position.y
    }

    paralaxMoveAll(direction: "left" | "right") {
        if (direction === "right") {
            for (let collidable of gameObjects.collidable) {
                collidable.position.x -= this.velocity.x
            }
            for (let playerFriendlyObj of gameObjects.playerFriendly) {
                playerFriendlyObj.position.x -= this.velocity.x
            }
        } else {
            for (let collidable of gameObjects.collidable) {
                collidable.position.x += this.velocity.x
            }
            for (let playerFriendlyObj of gameObjects.playerFriendly) {
                playerFriendlyObj.position.x += this.velocity.x
            }
        }
    }
}

export default Player