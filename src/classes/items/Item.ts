import { app, player, informationManager, gameObjects, spriteSheet } from "../../main"
import UUID from "../../helpers/uuid"
import BagStoneStack from "../bagItems/BagStoneStack"
import BagOxygen from "../bagItems/BagOxygen"
import ImageMapper from "../ImageMapper"
import BagDynamite from "../bagItems/BagDynamite"
import BagHat from "../bagItems/BagHat"
import BagShield from "../bagItems/BagShield"

export type itemType = "stone stack" | "cactus" | "oxygen" | "hat" | "shield" | "dynamite" | "extra life"

class Item {
    id: string
    position: { x: number, y: number }
    width: number
    height: number
    class: itemType
    type: "item"
    graphics: { cords: { x: number, y: number, width: number, height: number } }

    constructor(x: number, y: number, type: itemType) {
        this.class = type
        this.id = UUID.genId()
        this.position = { x, y }
        this.width = 50
        this.height = 50
        this.type = "item"
        this.graphics = { cords: ImageMapper.getItemImageCords(this.class) }

        if (this.class === "extra life") this.width = 25

        setTimeout(() => {
            this.remove()
        }, 10000)
    }

    draw() {
        // console.log(this.graphics.cords)
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    checkIfPlayerPicked() {
        if (this.position.x <= player.position.x + player.width && this.position.x + this.width >= player.position.x && this.position.y + this.height >= player.position.y && this.position.y <= player.position.y + player.height) {
            this.pick()
        }
    }

    private pick() {
        this.remove()

        let bagItem = null
        if (this.class === "stone stack") bagItem = new BagStoneStack()
        else if (this.class === "oxygen") bagItem = new BagOxygen()
        else if (this.class === "dynamite") bagItem = new BagDynamite()
        else if (this.class === "extra life") informationManager.updateLives(informationManager.lives.value + 1)
        else if (this.class === "hat") bagItem = new BagHat()
        else if (this.class === "shield") bagItem = new BagShield()

        informationManager.addScorePoints(30)
    }

    remove() {
        const myGameIndex = gameObjects.nonCollidable.findIndex(e => e.id === this.id)
        gameObjects.nonCollidable.splice(myGameIndex, 1)
    }
}


export default Item