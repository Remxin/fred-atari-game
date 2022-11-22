import UUID from "../helpers/uuid"
import { gameObjects, app, spriteSheet } from "../main"
import ImageMapper from "./ImageMapper"
const CONSTANTS = {
    animStep: 8,
    shrinkStep: 0.5,
    removeStep: 30
}

class DeathAnim {
    id: string
    type: "player" | "enemy"
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    width: number
    height: number
    graphics: { cords: { x: number, y: number, width: number, height: number } }
    anim: { phase: number, incrementer: number }

    constructor(x: number, y: number, type: "player" | "enemy") {
        this.id = UUID.genId()
        this.position = { x, y }
        this.startPos = { ...this.position }
        this.type = type
        this.anim = { phase: 0, incrementer: 0 }
        this.assignSize()
        // this.addToScene()

    }

    assignSize() {
        this.width = 50
        if (this.type === "player") {
            this.height = 90
        } else if (this.type === "enemy") {
            this.height = 50
        }
    }

    // addToScene() {
    //     // gameObjects.nonCollidable.push(this)
    //     console.log(gameObjects)
    // }

    draw() {
        this.graphics = { cords: ImageMapper.getDeathAnimImageCords(this.type, this.anim.phase) }
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
        this.anim.incrementer += 1
        if (this.anim.incrementer >= CONSTANTS.animStep) {
            this.anim.incrementer = 0
            this.anim.phase === 1 ? this.anim.phase -= 1 : this.anim.phase += 1
        }

        this.width -= CONSTANTS.shrinkStep
        this.height -= CONSTANTS.shrinkStep
        this.position.x += Math.round(CONSTANTS.shrinkStep / 2)
        this.position.y += Math.round(CONSTANTS.shrinkStep / 2)

        if (this.width <= CONSTANTS.removeStep) this.remove()
    }

    remove() {
        const myGameIndex = gameObjects.nonCollidable.findIndex(i => i.id === this.id)
        gameObjects.nonCollidable.splice(myGameIndex, 1)
    }

    checkIfPlayerPicked() {
        return
    }

}

export default DeathAnim