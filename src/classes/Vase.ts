import { canvasProps, app, spriteSheet, gameObjects } from "../main"
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
    graphics: { cords: { x: number, y: number, height: number, width: number} }
    width: number
    height: number
    itemInside: itemType
    type: "vase"

    constructor(x: number ,y: number) {
        this.id = UUID.genId()
        this.graphics = {cords: ImageMapper.getVaseCords()}
        this.width = 50
        this.height = 50
        this.position = { x, y: canvasProps.height - y - this.height - 10 }
        this.getRandomItem()
        this.type = "vase"
    }

    draw() {
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

}

export default Vase