import { app, player, informationManager, gameObjects } from "../../main"
import UUID from "../../helpers/uuid"

export type itemType = "stone stack" | "cactus" | "oxygen" | "hat" | "shield" | "dynamite"

class Item {
    id: string
    position: { x: number, y: number}
    width: number
    height: number
    class: itemType
    type: "item"
    graphics: { cords: { x: number, y: number, width: number, height: number }}

    constructor (x: number, y: number, type: itemType) {
        this.class = type
        this.id = UUID.genId()
        this.position = { x, y}
        this.width = 50
        this.height = 50
        this.type = "item"
    }

    draw() {
        app.c.fillStyle = "green"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    checkIfPlayerPicked() {
        if (this.position.x <= player.position.x + player.width && this.position.x + this.width >= player.position.x && this.position.y + this.height >= player.position.y && this.position.y <= player.position.y + player.height) {
            this.pick()
        }
    }

    private pick() {
        this.remove()

        // const 

    }

    remove() {
        const myGameIndex = gameObjects.nonCollidable.findIndex(e => e.id === this.id)
        gameObjects.nonCollidable.splice(myGameIndex, 1)
    }
}


export default Item