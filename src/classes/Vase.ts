import { canvasProps, app, spriteSheet, gameObjects, trackableObjects } from "../main"
import ImageMapper from "./ImageMapper"
import Item, { itemType } from "./items/Item"
import UUID from "../helpers/uuid"
import Cactus from "./Cactus"
// import StoneStack from "./items/StoneStack"


const CONSTANTS = {
    vaseCactusLifeSpan: 6 // in seconds
}

class Vase {
    id: string
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    graphics: { cords: { x: number, y: number, height: number, width: number } }
    width: number
    height: number
    itemInside: itemType
    type: "vase"
    visible: boolean

    constructor(x: number, y: number) {
        this.id = UUID.genId()
        this.graphics = { cords: ImageMapper.getVaseCords() }
        this.width = 50
        this.height = 50
        this.position = { x, y: canvasProps.height - y - this.height - 10 }
        this.startPos = { ...this.position }
        this.getRandomItem()
        this.type = "vase"
        this.visible = true
    }

    draw() {
        if (this.position.x + this.width <= 0 || this.position.x >= canvasProps.width) {
            if (this.visible) {
                console.log("track", this.id)
                this.visible = false
                this.track()
            }

            return
        }
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    getRandomItem() {
        const random = Math.round(Math.random() * 100)
        if (random < 25) this.itemInside = "stone stack"
        else if (random < 40) this.itemInside = "extra life"
        else if (random < 50) this.itemInside = "oxygen"
        else if (random < 70) this.itemInside = "cactus"
        else if (random < 80) this.itemInside = "hat"
        else if (random < 90) this.itemInside = "shield"
        else this.itemInside = "dynamite"

    }

    remove() {
        // delete from game
        const myGameIndex = gameObjects.nonCollidable.findIndex(e => e.id === this.id)
        gameObjects.nonCollidable.splice(myGameIndex, 1)

        this.replaceWithItem()
    }

    private replaceWithItem() {
        if (this.itemInside === "cactus") {
            let cactus = new Cactus(this.position.x, app.canvasProps.height - this.position.y - this.height - 10, "s", "")
            gameObjects.collidable.push(cactus)


            setTimeout(() => {
                const myGameIndex = gameObjects.collidable.findIndex((i) => i.id === cactus.id)
                gameObjects.collidable.splice(myGameIndex, 1)
            }, CONSTANTS.vaseCactusLifeSpan * 1000)

        } else {
            let gameItem = new Item(this.position.x, this.position.y, this.itemInside)
            gameObjects.nonCollidable.push(gameItem)
        }
        // place item on it's cords


    }

    track() {
        const myIndex = gameObjects.nonCollidable.findIndex(p => p.id === this.id)
        gameObjects.nonCollidable.splice(myIndex, 1)
        trackableObjects.push(this)
    }

    untrack() {
        gameObjects.nonCollidable.push(this)
        const trackableIndex = trackableObjects.findIndex(p => p.id === this.id)
        trackableObjects.splice(trackableIndex, 1)
    }

}

export default Vase