import { classicNameResolver, isThisTypeNode, textChangeRangeIsUnchanged } from "../../node_modules/typescript/lib/typescript"
import { app, pressedKeys, gameObjects, informationManager, renderer, spriteSheet, player, brightSpriteSheet, canvasProps } from "../main"
import BagHat from "./bagItems/BagHat"
import BagStoneStack from "./bagItems/BagStoneStack"
import DeathAnim from "./DeathAnim"
import Flame from "./Flame"
import ImageMapper from "./ImageMapper"
import Stone from "./Stone"
import BagOxygen from "./items/Item"


// CONSTANTS 
const jumpHeight = 30
const velocity = { x: 5, y: 1}
const startPos = { x: 100, y: 100}
const size = { w: 50, h: 90}
const weaponChangeTimeout = 500
const stoneDelayValue = 1000
let viewBreakPoints = { min: 400, max: 800}
const maxAnimValue = {
    move: 24, jump: 10000
}

const flameConsumptionDelay = 3

interface PlayerInterface {
    position: { x: number, y: number},
    velocity: { x: number, y: number}
    width: number,
    height: number,
    jumpHeight: number
    floating: { isfloating: boolean, direction: "" | "left" | "right", animPhase: number}
    turnDirection: "left" | "right"
    stoneThrown: boolean
    flame: { launched: boolean, obj: Flame, incrementer: number}
    lastPos: { x: number, y: number }
    // floatingDirection: "" | "left" | "right"
    weaponChosen: { timeout: number, type: "stones" | "fire", stoneDelay: number}
    animProps: { moving: boolean, animJumpPhase: number, animMovePhase: number}
    graphics: { cords: {x: number, y: number, height: number, width: number }}
    alpha: { in: boolean, anim: number}
    death: boolean

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
    animProps: { moving: boolean; animJumpPhase: number, animMovePhase: number, previousDirection: "left" | "right"}
    graphics: { cords: {x: number, y: number, height: number, width: number }}
    flame: { launched: boolean, obj: Flame, incrementer: number }
    alpha: { in: boolean, anim: number}
    death: boolean


    
    constructor(x: number, y: number, canvasW: number) {
        // startPos = { x, y}
        this.position = {...startPos}
        this.velocity = velocity
        this.width = size.w
        this.height = size.h
        this.jumpHeight = jumpHeight
        this.floating = { isfloating: false, direction: "", animPhase: 1}
        this.turnDirection = "right"
        this.stoneThrown = false
        this.flame = { launched: false, obj: null, incrementer: 0}
        this.lastPos = { x: 0, y: 0}
        this.weaponChosen = { timeout: 0, type: "stones", stoneDelay: 0}
        this.animProps = { moving: false, animJumpPhase: 0, animMovePhase: 0, previousDirection: "right"}
        this.alpha = { in: false, anim: 0}
        this.death = false
        viewBreakPoints.max = canvasW - 300

        
      
    }

    draw() {
        let currSprite

        if (this.alpha.in) currSprite = this.alpha.anim === 0 ? spriteSheet : brightSpriteSheet
        else currSprite = spriteSheet
        

        this.graphics = { cords: ImageMapper.getPlayerImageCords(this.animProps.moving, this.animProps.animJumpPhase, this.animProps.animMovePhase, this.floating.isfloating, this.turnDirection)}
        app.c.drawImage(currSprite, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.death) return
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

        // console.log(viewBreakPoints)
    }

    captureMovement() {
        this.manageWeaponUsage()
        this.blockOptions()
        // right
        if (pressedKeys.right && !this.floating.isfloating) {
            
            this.turnDirection = "right"
            if (!pressedKeys.left) this.animProps.moving = true // signalise that player is moving
            if (this.turnDirection !== this.animProps.previousDirection) this.animProps.animMovePhase = 0 // if changed direction start animation again
            else {
                if (this.animProps.animMovePhase >= maxAnimValue.move) this.animProps.animMovePhase = 0
                else this.animProps.animMovePhase += 1

            }


            this.animProps.previousDirection = "right"
            let isCollision = this.collisionChk("right")

            
         
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
            
            if (!pressedKeys.right) this.animProps.moving = true // signalise that player is moving
            if (this.turnDirection !== this.animProps.previousDirection) this.animProps.animMovePhase = 0 // if changed direction start animation again
            else {
                if (this.animProps.animMovePhase >= maxAnimValue.move) this.animProps.animMovePhase = 0
                else this.animProps.animMovePhase += 1

            }

            this.animProps.previousDirection = "left"
            let isCollision = this.collisionChk("left")
          
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
            const isCollision = this.collisionChk("left")

            if (!isCollision) {
                if (this.position.x < viewBreakPoints.min) {
                    this.paralaxMoveAll('left')
                } else { 
                    this.position.x -= this.velocity.x
                }
            }
            this.animProps.animJumpPhase += 1

        } else if (this.floating.isfloating && this.floating.direction === "right") {
            renderer.playerAbstractionPos.x += this.velocity.x
            const isCollision = this.collisionChk('right')
            if (!isCollision) {
                if (this.position.x > viewBreakPoints.max) {
                    this.paralaxMoveAll('right')
                } else { 
                    this.position.x += this.velocity.x
                }
            }

            this.animProps.animJumpPhase += 1
        } else {
            this.animProps.animJumpPhase += 1
        }

        if (!this.floating.isfloating) {
            this.floating.direction = ""
            this.animProps.animJumpPhase = 0
        }
        // -----------------
        
        if ((pressedKeys.left && pressedKeys.right) || (!pressedKeys.left && !pressedKeys.right)) this.animProps.moving = false
        

    }

    checkCollisions() {
        for (let gameObj of gameObjects.collidable) {
            // dropping down collision 
            if (this.position.y + this.height <= gameObj.position.y && this.position.y + this.height + this.velocity.y >= gameObj.position.y && this.position.x + this.width > gameObj.position.x && this.position.x < gameObj.position.x + gameObj.width) {
                if (gameObj.type === "platform") {
                    this.velocity.y = 0
                    this.position.y = gameObj.position.y - this.height
                    this.floating.isfloating = false
                    
                    if(gameObj.class === "fragile platform") {
                        gameObj.break()
                    }
                } else if (gameObj.type === "enemy") {
                    player.die()
                }
                // this.position.y = platform.height + platform.position.y - this.height
            } 
            // bottom collision 
            
            
            
            if (this.position.y + this.velocity.y < gameObj.position.y + gameObj.height && this.position.y + this.height > gameObj.position.y && this.position.x + this.width > gameObj.position.x && this.position.x < gameObj.position.x + gameObj.width) {
                if (gameObj.type === "platform") {
                    this.position.y = gameObj.position.y + gameObj.height
                    this.velocity.y = 1
                } else if (gameObj.type === "enemy") {
                    this.die()
                }
            }

           
        }
    }

    die() {
        if (this.alpha.in) return
        const hat = informationManager.bag.items.find(i => i.class === "bag hat") as BagHat
        if (hat) hat.use()

        if (this.alpha.in) return
        if (this.death) return

        // creating deatch animation
        const deathAnim = new DeathAnim(this.position.x, this.position.y, "player")
        gameObjects.nonCollidable.push(deathAnim)
        this.death = true

        setTimeout(() => {
            // descrolling view
            const descrollValue = renderer.playerAbstractionPos.x - this.position.x
            for (let collidableObj of gameObjects.collidable) {
                collidableObj.position.x += descrollValue
            }

            for (let nonCollidable of gameObjects.nonCollidable) {
                nonCollidable.position.x += descrollValue
            }
            renderer.playerAbstractionPos.x = startPos.x
            
    
            // reseting stats
            this.position = {...startPos}
            this.velocity.y = velocity.y
            this.floating.direction = ""
    
            // console.log(renderer.playerAbstractionPos.x, this.position.x) 
            informationManager.updateLives(informationManager.lives.value - 1)
            informationManager.resetRunScore()
            this.death = false
        }, 2000)
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
                    const stoneStack = informationManager.bag.items.find((i) => i.class === "bag stone stack") as BagStoneStack
                    if (stoneStack) {
                        stoneStack.use()
                    }
                }

                // preventing from spamming stones
                this.weaponChosen.stoneDelay = 1

                if (informationManager.stones.value === 0) this.weaponChosen.type = "fire"
                setTimeout(() => {
                    this.weaponChosen.stoneDelay = 0
                },  stoneDelayValue)
            } else if (this.weaponChosen.type === "fire") {
                if (informationManager.oxygen.value === 0) return

                if (!this.flame.launched) {
                    this.flame.obj = new Flame()
                    gameObjects.playerFriendly.push(this.flame.obj)
                    this.flame.launched = true
                } else {
                    this.flame.obj.update()
                }

                if (this.flame.incrementer === flameConsumptionDelay) {
                    informationManager.updateOxygen(informationManager.oxygen.value - 1)
                    if (informationManager.oxygen.value === 0) {
                        // this.weaponChosen.type = "stones"
                        //@ts-ignore
                        const oxygen = informationManager.bag.items.find((o) => o.class === "bag oxygen") as BagOxygen
                        //@ts-ignore
                        if (oxygen) oxygen.use()
                        else {
                            this.flame.obj.remove()
                            this.weaponChosen.type = "stones"
                        }
                    }
                    this.flame.incrementer = 0
                }


                this.flame.incrementer += 1
            }
        } else {
            if (this.weaponChosen.type === "fire" && this.flame.launched) {
                this.flame.obj.remove()
                this.flame.launched = false
            }
        }// TODO: delete flames from player friendly objects
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

            for (let nonCollidable of gameObjects.nonCollidable) {
                nonCollidable.position.x -= this.velocity.x
            }
        } else {
            for (let collidable of gameObjects.collidable) {
                collidable.position.x += this.velocity.x
            }
            for (let playerFriendlyObj of gameObjects.playerFriendly) {
                playerFriendlyObj.position.x += this.velocity.x
            }

            for (let nonCollidable of gameObjects.nonCollidable) {
                nonCollidable.position.x += this.velocity.x
            }
        }
    }

    collisionChk(direction: "left" | "right") {
        if (direction === "right") {
            for (let gameObj of gameObjects.collidable) {
                if (gameObj.type === "platform") { // ! BUG
                    if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width >= gameObj.position.x && this.position.y < gameObj.position.y + gameObj.height  && this.position.y + this.height > gameObj.position.y) {
                        return true
                        // this.position.x = gameObj.position.x - this.width               
                
                        // break
                    }
                }
    
                
            }
        } else {
            for (let gameObj of gameObjects.collidable) {
                if (gameObj.type === 'platform') { // ! BUG 
                    if (this.position.x <= gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y < gameObj.position.y + gameObj.height  && this.position.y + this.height > gameObj.position.y) {
                        return true
                        
                    } 
                }
                
            }
        }
    }
}

export default Player